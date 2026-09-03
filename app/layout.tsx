import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Prefetcher } from '@/components/ui/Prefetcher'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, PLANS } from '@/lib/constants'
import { faqs } from '@/lib/faq'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Ne jetez plus ce que vous avez oublié`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'gaspillage alimentaire',
    'application anti-gaspi',
    'gestion frigo',
    'date de péremption',
    'liste de courses automatique',
    'recette avec ce qu’il reste',
    'inventaire cuisine',
    'scan code-barres alimentaire',
    'application Android anti-gaspillage',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'Food & Drink',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Ne jetez plus ce que vous avez oublié`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SmartFridge — application de suivi du frigo et de lutte contre le gaspillage alimentaire',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Ne jetez plus ce que vous avez oublié`,
    description: SITE_DESCRIPTION,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: '/icon.svg',
  },
  manifest: '/manifest.json',
  alternates: { canonical: SITE_URL },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0A7CD4' },
    { media: '(prefers-color-scheme: dark)', color: '#0B2233' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

/**
 * Structured data.
 *
 * No aggregateRating and no review markup: the app has no ratings yet, and
 * fabricated review markup is a manual-action risk with Google. Add it back
 * only when real App Store reviews exist.
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon.svg` },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'support@smartfridge.app',
        contactType: 'customer support',
        availableLanguage: ['French', 'English'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'fr-FR',
    },
    {
      '@type': 'MobileApplication',
      '@id': `${SITE_URL}/#app`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      operatingSystem: 'Android 8.0+',
      applicationCategory: 'LifestyleApplication',
      inLanguage: ['fr', 'en'],
      offers: [
        {
          '@type': 'Offer',
          name: PLANS.standard.name,
          price: '0',
          priceCurrency: 'EUR',
          description: PLANS.standard.tagline,
        },
        {
          '@type': 'Offer',
          name: PLANS.premium.name,
          price: String(PLANS.premium.price),
          priceCurrency: 'EUR',
          description: PLANS.premium.tagline,
        },
        {
          '@type': 'Offer',
          name: PLANS.diamant.name,
          price: String(PLANS.diamant.price),
          priceCurrency: 'EUR',
          description: PLANS.diamant.tagline,
        },
      ],
    },
    {
      // Feeds Google's FAQ rich result — same source as the on-page accordion.
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-ink focus:rounded-lg focus:shadow-lg focus:ring-2 focus:ring-primary-600"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <Prefetcher />
        <ScrollReveal />
      </body>
    </html>
  )
}
