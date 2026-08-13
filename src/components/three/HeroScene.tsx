'use client';
import React, { useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

function MountainTerrain() {
  const meshRef = useRef<THREE.Mesh>(null);
  const noise2D = useMemo(() => createNoise2D(), []);
  const geom = useMemo(() => {
    const g = new THREE.PlaneGeometry(28, 14, 80, 40);
    const pos = g.attributes.position as THREE.BufferAttribute;
    const color = new Float32Array(pos.count * 3);
    const goldColor = new THREE.Color('#D4AF37');
    const deep = new THREE.Color('#080707');
    const mid = new THREE.Color('#14110d');
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const ridge = noise2D(x * 0.08, y * 0.08) * 1.6 + noise2D(x * 0.2, y * 0.2) * 0.6;
      const h = Math.max(0, ridge) * 2.6 - 0.3;
      pos.setZ(i, h);
      const t = THREE.MathUtils.clamp((h + 0.2) / 2.4, 0, 1);
      const c = deep.clone().lerp(mid, Math.pow(t, 0.7));
      if (h > 1.5) c.lerp(goldColor, Math.min(1, (h - 1.5) / 1.6) * 0.55);
      color[i * 3] = c.r; color[i * 3 + 1] = c.g; color[i * 3 + 2] = c.b;
    }
    g.setAttribute('color', new THREE.BufferAttribute(color, 3));
    g.computeVertexNormals();
    return g;
  }, [noise2D]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = -Math.PI / 2.15;
      meshRef.current.position.set(0, -2.2, -1.2);
    }
  });

  return (
    <mesh ref={meshRef} geometry={geom}>
      <meshStandardMaterial vertexColors roughness={1} metalness={0} flatShading />
    </mesh>
  );
}

function MountainSilhouetteLayers() {
  const refs = [useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null)];
  const speeds = [0.05, 0.07, 0.09];
  const offsets = [0, 0.4, 0.8];

  useFrame(({ clock }) => {
    refs.forEach((r, i) => {
      if (r.current) r.current.position.x = -Math.sin(clock.elapsedTime * speeds[i] + offsets[i]) * (0.2 + i * 0.15);
    });
  });

  const configs = useMemo(() => {
    const noise = createNoise2D();
    const createShape = (amp: number, freq: number) => {
      const shape = new THREE.Shape();
      shape.moveTo(-20, -2);
      for (let i = 0; i <= 40; i++) {
        const x = -20 + (i / 40) * 40;
        shape.lineTo(x, 1.6 + Math.abs(noise(x * freq, 0) * amp) + Math.sin(x * 0.45) * 0.3);
      }
      shape.lineTo(20, -2); shape.lineTo(-20, -2);
      return new THREE.ShapeGeometry(shape);
    };

    return [
      { geom: createShape(2.2, 0.05), z: -6.5, opacity: 0.55 },
      { geom: createShape(1.7, 0.12), z: -4,   opacity: 0.75 },
      { geom: createShape(1.1, 0.22), z: -2,   opacity: 0.95 },
    ];
  }, []);

  return (
    <group>
      {configs.map((c, i) => (
        <mesh key={i} ref={refs[i] as any} geometry={c.geom} position={[0, -1.6, c.z]}>
          <meshBasicMaterial color="#0a0a0a" transparent opacity={c.opacity} />
        </mesh>
      ))}
    </group>
  );
}

function GoldParticles() {
  const ref = useRef<THREE.Points>(null);
  const COUNT = 80;
  const data = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 5 + Math.random() * 5;
      const a = Math.random() * Math.PI * 2;
      pos[i * 3]     = Math.cos(a) * r * 0.6;
      pos[i * 3 + 1] = (Math.random() - 0.25) * 3;
      pos[i * 3 + 2] = Math.sin(a) * r - 1;
    }
    return pos;
  }, []);

  // Only update every 3rd frame
  const frame = useRef(0);
  useFrame(({ clock }) => {
    frame.current++;
    if (frame.current % 3 !== 0 || !ref.current) return;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const t = clock.elapsedTime;
    for (let i = 0; i < COUNT; i++) {
      pos.setX(i, data[i * 3]     + Math.sin(t * 0.25 + i * 0.11) * 0.15);
      pos.setY(i, data[i * 3 + 1] + Math.sin(t * 0.4  + i * 0.19) * 0.08);
      pos.setZ(i, data[i * 3 + 2] + Math.cos(t * 0.3  + i * 0.13) * 0.15);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={data} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#FFD58A" sizeAttenuation transparent opacity={0.6} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function Sun() {
  return (
    <mesh position={[5.2, 0.6, -8.4]}>
      <circleGeometry args={[1.25, 32]} />
      <meshBasicMaterial color="#FFB86B" transparent opacity={0.9} depthWrite={false} />
    </mesh>
  );
}

function CameraMotion() {
  const { camera } = useThree();
  const px = useRef(0);
  const py = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      px.current = (e.clientX / window.innerWidth  - 0.5) * 0.9;
      py.current = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(({ clock }) => {
    camera.position.x += (px.current - camera.position.x) * 0.03;
    camera.position.y += (1.25 + py.current - camera.position.y) * 0.03;
    camera.position.z += (6.3 + Math.sin(clock.elapsedTime * 0.22) * 0.2 - camera.position.z) * 0.02;
    camera.lookAt(0, -0.2, 1);
  });
  return null;
}

export default function HeroScene() {
  return (
    <>
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 4, 16]} />
      <ambientLight intensity={0.35} color="#52452C" />
      <directionalLight position={[6, 4.2, -6]} intensity={1.4} color="#FFD78A" />
      <pointLight position={[2, 1, 0.5]} color="#D4AF37" intensity={0.7} distance={10} decay={2} />
      <Sun />
      <MountainSilhouetteLayers />
      <MountainTerrain />
      <GoldParticles />
      <CameraMotion />
      <EffectComposer multisampling={0} enableNormalPass={false}>
        <Bloom intensity={0.7} luminanceThreshold={0.15} luminanceSmoothing={0.4} mipmapBlur radius={0.7} />
        <Vignette eskil={false} offset={0.3} darkness={0.8} />
      </EffectComposer>
    </>
  );
}

export { HeroScene };
export type HeroSceneProps = { count?: number };

export function HeroCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);

  // Pause rendering when hero is off-screen
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const canvas = el.querySelector('canvas');
    if (!canvas) return;
    const io = new IntersectionObserver(([entry]) => {
      // @ts-ignore
      const r3f = canvas.__r3f;
      if (r3f?.fiber) {
        r3f.fiber.setFrameloop(entry.isIntersecting ? 'always' : 'never');
      }
    }, { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={canvasRef} className="h-full w-full">
      <Canvas
        dpr={[1, 1.25]}
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
        camera={{ position: [0, 1.2, 6.3], fov: 55, near: 0.1, far: 40 }}
        frameloop="always"
      >
        <HeroScene />
      </Canvas>
    </div>
  );
}
