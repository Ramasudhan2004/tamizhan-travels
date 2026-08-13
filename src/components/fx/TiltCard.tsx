'use client';
import { useRef, type ReactNode, type MouseEvent } from 'react';
import { cn } from '@/lib/utils';
import { useIsTouch } from '@/hooks/useMediaQuery';

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
  glare?: boolean;
  borderGradient?: boolean;
};

export default function TiltCard({ children, className, strength = 4.5, borderGradient = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || isTouch) return;
    const r = el.getBoundingClientRect();
    const rx = -((e.clientY - r.top) / r.height - 0.5) * strength * 2;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * strength * 2;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: 'transform 0.3s ease', willChange: 'auto' }}
      className={cn('relative group', borderGradient && 'border-gold-gradient', className)}
    >
      {children}
    </div>
  );
}
