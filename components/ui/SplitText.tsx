import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface SplitTextProps extends HTMLAttributes<HTMLSpanElement> {
  text: string
  className?: string
  charClassName?: string
  dataAttr?: string
}

export function SplitText({
  text,
  className,
  charClassName,
  dataAttr,
  ...props
}: SplitTextProps) {
  return (
    <span className={cn('inline-block', className)} data-text={dataAttr || text} {...props}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className={cn('inline-block', charClassName)}
          aria-hidden="true"
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  )
}
