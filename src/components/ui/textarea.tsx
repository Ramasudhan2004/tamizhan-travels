import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...p }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        'input-field min-h-[120px] resize-y font-sans text-[15px] leading-relaxed',
        className,
      )}
      {...p}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
