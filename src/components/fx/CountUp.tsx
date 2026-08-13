'use client';
import { useEffect, useRef, useState } from 'react';
import { useCountUp } from '@/hooks/useCountUp';
import { cn } from '@/lib/utils';

type Props = {
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  as?: React.ElementType;
  margin?: string;
};

export default function CountUp({
  end,
  duration = 2200,
  decimals = 0,
  suffix = '',
  prefix = '',
  className,
  as: Tag = 'span',
  margin = '-15% 0px',
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setStart(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: margin, threshold: 0.3 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [margin]);

  const value = useCountUp({ end, duration, decimals, trigger: start });

  const display =
    (decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString('en-IN')) + suffix;

  return (
    <Tag className={cn('tabular-nums', className)} ref={ref}>
      {prefix}
      {display}
    </Tag>
  );
}
