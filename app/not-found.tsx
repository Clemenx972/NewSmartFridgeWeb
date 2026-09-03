import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page introuvable — 404',
  description: 'Cette page n\'existe pas.',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-9xl font-black text-white/10 leading-none mb-2" aria-hidden="true">404</div>
        <h1 className="heading-lg text-white mb-4">Page introuvable</h1>
        <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
          Oops ! Cette page n&apos;existe pas ou a été déplacée.
          Revenez à l&apos;accueil pour continuer.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary bg-white !text-primary-600 hover:bg-white/90">
            Retour à l&apos;accueil
          </Link>
          <Link href="/contact" className="btn-outline-white">
            Contacter le support
          </Link>
        </div>
      </div>
    </div>
  )
}
