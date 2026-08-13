'use client';
import { useRef, useEffect, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  as?: 'div' | 'section' | 'article' | 'li';
};

export default function Reveal({ children, className, delay = 0, as = 'div' }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animationDelay = `${delay}s`;
          el.setAttribute('data-visible', '');
          io.disconnect();
        }
      },
      { rootMargin: '-6% 0px', threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const Tag = as as any;
  return (
    <Tag ref={ref} className={cn('reveal-item', className)}>
      {children}
    </Tag>
  );
}
