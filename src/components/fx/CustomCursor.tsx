'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const refGlow = useRef<HTMLDivElement | null>(null);
  const refDot = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Don't activate on touch
    const mql = window.matchMedia('(hover: none) and (pointer: coarse)');
    if (mql.matches) return;

    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let gx = x, gy = y;
    let dx = x, dy = y;
    let isInteractive = false;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const tgt = (e.target as HTMLElement | null);
      isInteractive = !!(tgt?.closest('a, button, [data-interactive], input, textarea, select, [role="button"]'));
      if (refDot.current) {
        refDot.current.style.width = isInteractive ? '22px' : '14px';
        refDot.current.style.height = isInteractive ? '22px' : '14px';
        refDot.current.style.backgroundColor = isInteractive ? 'rgba(212,175,55,1)' : 'rgba(212,175,55,0.9)';
      }
      if (refGlow.current) {
        refGlow.current.style.opacity = isInteractive ? '0.95' : '0.75';
      }
    };

    window.addEventListener('mousemove', onMove);

    let raf = 0;
    const loop = () => {
      dx = x; dy = y;
      gx += (dx - gx) * 0.14;
      gy += (dy - gy) * 0.14;
      if (refGlow.current) {
        refGlow.current.style.transform = `translate3d(${gx - 150}px, ${gy - 150}px, 0) ${isInteractive ? 'scale(1.4)' : 'scale(1)'}`;
      }
      if (refDot.current) {
        refDot.current.style.transform = `translate3d(${dx - 7}px, ${dy - 7}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={refGlow}
        aria-hidden
        className="custom-cursor pointer-events-none fixed left-0 top-0 h-[300px] w-[300px] z-[9998] rounded-full mix-blend-screen"
        style={{
          background:
            'radial-gradient(circle, rgba(212,175,55,0.38) 0%, rgba(212,175,55,0.12) 40%, rgba(0,0,0,0) 70%)',
          transition: 'opacity 200ms ease, width 200ms ease, height 200ms ease',
          opacity: 0.75,
          willChange: 'transform',
        }}
      />
      <div
        ref={refDot}
        aria-hidden
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
        style={{
          width: '14px',
          height: '14px',
          backgroundColor: 'rgba(212,175,55,0.9)',
          border: '2px solid #D4AF37',
          boxShadow: '0 0 10px rgba(212,175,55,0.8)',
          transition: 'width 180ms ease, height 180ms ease, background-color 180ms ease',
          willChange: 'transform',
        }}
      />
    </>
  );
}
