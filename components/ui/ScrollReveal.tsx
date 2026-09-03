'use client'

import { useEffect } from 'react'

/**
 * Attaches an IntersectionObserver to every <section> and [data-reveal] element
 * that is NOT already in the viewport on page load.
 *
 * Elements start hidden (opacity-0, slight translateY) and animate to visible
 * as they scroll into view. The Hero section is always in viewport on load so
 * it is never hidden — no flash, no broken first impression.
 */
export function ScrollReveal() {
  useEffect(() => {
    // Collect all sections + explicitly-marked elements
    const candidates = Array.from(
      document.querySelectorAll<HTMLElement>('section, [data-reveal]')
    )

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.classList.add('reveal-visible')
            el.classList.remove('reveal-hidden')
            observer.unobserve(el) // animate once, then stop watching
          }
        })
      },
      {
        threshold: 0.08, // trigger when 8% of element is visible
        rootMargin: '0px 0px -40px 0px', // slight bottom offset so it fires just before fully in view
      }
    )

    // Determine which elements are already visible (e.g. Hero)
    const viewportHeight = window.innerHeight

    candidates.forEach((el) => {
      const rect = el.getBoundingClientRect()
      const isAlreadyVisible = rect.top < viewportHeight && rect.bottom > 0

      if (!isAlreadyVisible) {
        el.classList.add('reveal-hidden')
        observer.observe(el)
      }
    })

    return () => observer.disconnect()
  }, [])

  return null
}
