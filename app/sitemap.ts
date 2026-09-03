import type { MetadataRoute } from 'next'
import { SITE_URL, NAV_LINKS } from '@/lib/constants'

/**
 * Sitemap dérivé de NAV_LINKS pour qu'une entrée de navigation retirée
 * disparaisse d'elle-même du sitemap. Les pages légales sont ajoutées
 * ensuite : elles ne sont pas dans la navigation mais restent indexables
 * comme structure.
 */
const PRIORITIES: Record<string, number> = {
  '/': 1.0,
  '/features': 0.9,
  '/pricing': 0.9,
  '/contact': 0.6,
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const pages: MetadataRoute.Sitemap = NAV_LINKS.map((link) => ({
    url: link.href === '/' ? SITE_URL : `${SITE_URL}${link.href}`,
    lastModified: now,
    changeFrequency: link.href === '/' ? ('weekly' as const) : ('monthly' as const),
    priority: PRIORITIES[link.href] ?? 0.5,
  }))

  // Pages légales : hors navigation, en robots noindex, mais listées pour que
  // les moteurs comprennent la structure du site.
  const legal: MetadataRoute.Sitemap = ['/privacy', '/terms'].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  }))

  return [...pages, ...legal]
}
