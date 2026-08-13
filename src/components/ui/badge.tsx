import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wider uppercase transition-colors',
  {
    variants: {
      variant: {
        default: 'border-gold/40 bg-gold/10 text-gold-200',
        secondary: 'border-white/10 bg-white/5 text-soft',
        outline: 'border-gold/30 text-gold-200 bg-transparent',
        success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
