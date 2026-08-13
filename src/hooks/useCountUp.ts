'use client';
import { useEffect, useRef, useState } from 'react';

type Props = {
  end: number;
  duration?: number;
  start?: number;
  decimals?: number;
  trigger?: boolean;
};

export function useCountUp({ end, duration = 2000, start = 0, decimals = 0, trigger = true }: Props) {
  const [value, setValue] = useState(start);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;
    const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
    const tick = (now: number) => {
      if (startRef.current == null) startRef.current = now;
      const p = Math.min(1, (now - startRef.current) / duration);
      const eased = easeOutExpo(p);
      const v = start + (end - start) * eased;
      setValue(parseFloat(v.toFixed(decimals)));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
    };
  }, [end, duration, start, decimals, trigger]);
  return value;
}
