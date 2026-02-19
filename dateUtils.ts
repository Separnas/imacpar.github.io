
import * as React from 'react'
import { cn } from '@/lib/cn'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'ghost'
  size?: 'default' | 'icon' | 'sm' | 'lg'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none rounded-md'
    const variants = { default: 'bg-primary text-primary-foreground hover:opacity-90', ghost: 'bg-transparent hover:bg-accent/40 text-foreground' }
    const sizes = { default: 'h-10 px-4 py-2', sm: 'h-8 px-3 text-sm', lg: 'h-11 px-6', icon: 'h-9 w-9' }
    return (
      <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props} />
    )
  }
)
Button.displayName = 'Button'
