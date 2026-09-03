import Link from 'next/link'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'outline-white'
type Size = 'md' | 'lg'

interface CTAButtonProps {
  variant?: Variant
  size?: Size
  href: string
  external?: boolean
  className?: string
  children: React.ReactNode
  ariaLabel?: string
}

const variantClasses: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  'outline-white': 'btn-outline-white',
}

const sizeClasses: Record<Size, string> = {
  md: 'text-base px-6 py-3 min-h-[48px]',
  lg: 'text-lg px-7 py-4 min-h-[54px]',
}

/**
 * Single call-to-action component.
 *
 * The previous version guessed the visitor's platform and opened a store URL.
 * The app is not published yet (APP_IS_PUBLISHED in lib/constants.ts), so there
 * is no store to open — every CTA is an internal link until that changes.
 */
export function CTAButton({
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  className,
  children,
  ariaLabel,
}: CTAButtonProps) {
  const classes = cn(variantClasses[variant], sizeClasses[size], className)

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} prefetch className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  )
}
