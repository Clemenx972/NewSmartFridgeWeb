'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import { cn } from '@/lib/cn'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  // The homepage opens on a dark hero; every other page starts light.
  const isOverDarkHero = pathname === '/' && !isScrolled

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isMenuOpen) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKey)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = previousOverflow
    }
  }, [isMenuOpen])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm'
          : isOverDarkHero
            ? 'bg-transparent'
            : 'bg-white border-b border-gray-200'
      )}
    >
      <div className="container-max section-padding py-0">
        <div className="flex items-center justify-between h-16 sm:h-20">

          <Link href="/" className="flex items-center gap-2" aria-label="SmartFridge — Accueil">
            {/* App logo — same asset the application ships (splash_logo.png) */}
            <Image
              src="/logo.png"
              alt=""
              width={512}
              height={512}
              priority
              sizes="40px"
              className="w-9 h-9 sm:w-10 sm:h-10"
            />
            <span
              className={cn(
                'text-xl font-bold tracking-tight transition-colors',
                isOverDarkHero ? 'text-white' : 'text-ink'
              )}
            >
              SmartFridge
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                    isOverDarkHero
                      ? 'text-white/80 hover:text-white hover:bg-white/10'
                      : 'text-gray-600 hover:text-ink hover:bg-gray-100',
                    isActive && (isOverDarkHero ? 'text-white' : 'text-ink font-semibold')
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className={cn(
                        'absolute bottom-1 left-4 right-4 h-0.5 rounded-full',
                        isOverDarkHero ? 'bg-white' : 'bg-primary-600'
                      )}
                      aria-hidden="true"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          <Link
            href="/contact"
            prefetch
            className={cn(
              'hidden lg:inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200 min-h-[44px]',
              isOverDarkHero
                ? 'bg-white text-ink hover:bg-white/90'
                : 'bg-primary-600 text-white hover:bg-primary-700'
            )}
          >
            Être prévenu
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            className={cn(
              'lg:hidden p-2 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center',
              isOverDarkHero ? 'text-white hover:bg-white/10' : 'text-ink hover:bg-gray-100'
            )}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen
              ? <X className="w-6 h-6" strokeWidth={2} aria-hidden="true" />
              : <Menu className="w-6 h-6" strokeWidth={2} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!isMenuOpen}
        className="lg:hidden bg-white border-t border-gray-200 shadow-xl"
      >
        <nav className="container-max px-4 py-4 flex flex-col gap-1" aria-label="Navigation mobile">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch
              aria-current={pathname === link.href ? 'page' : undefined}
              className={cn(
                'px-4 py-3 rounded-xl font-medium transition-colors min-h-[48px] flex items-center',
                pathname === link.href
                  ? 'bg-primary-50 text-primary-800 font-semibold'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-ink'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            prefetch
            className="btn-primary w-full justify-center mt-3"
          >
            Être prévenu du lancement
          </Link>
        </nav>
      </div>
    </header>
  )
}
