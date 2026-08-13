'use client';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'link';
  strength?: number; // magnetic radius 60-140
  asChild?: boolean;
};

const MagneticButton = forwardRef<HTMLButtonElement, Props>(function MagneticButton(
  { className, children, variant = 'primary', strength = 90, onClick, ...rest },
  ref,
) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number; size: number }[]>([]);
  const isTouch = useMedia('(hover: none) and (pointer: coarse)');

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      if (isTouch) return;
      const el = btnRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = e.clientX - rect.left - rect.width / 2;
      const py = e.clientY - rect.top - rect.height / 2;
      const dist = Math.hypot(px, py);
      const maxDist = strength;
      const eased = Math.min(1, Math.max(0, 1 - dist / (maxDist * 1.4)));
      setTx(px * eased * 0.35);
      setTy(py * eased * 0.35);
    },
    [isTouch, strength],
  );

  const handleLeave = useCallback(() => {
    setTx(0);
    setTy(0);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = btnRef.current;
    if (el) {
      const r = el.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 1.6;
      const id = Date.now() + Math.random();
      const nx = e.clientX - r.left - size / 2;
      const ny = e.clientY - r.top - size / 2;
      setRipples((prev) => [...prev, { x: nx, y: ny, id, size }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((p) => p.id !== id));
      }, 700);
    }
    onClick?.(e);
  };

  const cls =
    variant === 'primary'
      ? 'btn-primary'
      : variant === 'ghost'
      ? 'btn-ghost'
      : 'inline-flex items-center gap-2 text-white/90 hover:text-gold transition-colors';

  return (
    <button
      ref={(el) => {
        btnRef.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) (ref as any).current = el;
      }}
      data-interactive
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      className={cn(
        cls,
        'relative overflow-hidden select-none',
        className,
      )}
      style={{
        transform: `translate3d(${tx}px, ${ty}px, 0)`,
        transition: isTouch ? 'transform 150ms ease' : 'transform 220ms cubic-bezier(.2,.7,.2,1)',
      }}
      {...rest}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden
          className="pointer-events-none absolute rounded-full"
          style={{
            left: r.x,
            top: r.y,
            width: r.size,
            height: r.size,
            background:
              variant === 'primary'
                ? 'radial-gradient(circle, rgba(255,255,255,0.55), rgba(255,255,255,0) 60%)'
                : 'radial-gradient(circle, rgba(212,175,55,0.55), rgba(212,175,55,0) 60%)',
            animation: 'ripple 650ms ease-out forwards',
          }}
        />
      ))}
      <span className="relative z-10 inline-flex items-center justify-center gap-2 w-full">
        {children}
      </span>
      <style>{`@keyframes ripple { from { opacity: 0.8; transform: scale(0.2); } to { opacity: 0; transform: scale(1.1); } }`}</style>
    </button>
  );
});

export default MagneticButton;

function useMedia(q: string) {
  const [m, setM] = useState(false);
  useEffect(() => {
    const x = window.matchMedia(q);
    setM(x.matches);
    const h = (e: MediaQueryListEvent) => setM(e.matches);
    x.addEventListener?.('change', h);
    return () => x.removeEventListener?.('change', h);
  }, [q]);
  return m;
}
