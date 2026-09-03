'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { NAV_LINKS } from '@/lib/constants'

/**
 * Prefetches all navigation pages in the background after initial load.
 * This makes every page-switch instant from the first interaction.
 */
export function Prefetcher() {
  const router = useRouter()

  useEffect(() => {
    // Wait 500ms so the first paint isn't blocked by prefetch network requests
    const timer = setTimeout(() => {
      NAV_LINKS.forEach(({ href }) => {
        router.prefetch(href)
      })
    }, 500)
    return () => clearTimeout(timer)
  }, [router])

  return null
}
