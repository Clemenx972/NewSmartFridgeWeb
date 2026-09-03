import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact & Support — Réponse en 24h',
  description: 'Contactez l\'équipe SmartFridge pour du support technique, une question sur la facturation, la confidentialité ou un partenariat. Réponse garantie en moins de 24h ouvrées.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact SmartFridge — Support & questions',
    description: 'Notre équipe répond en moins de 24h. Support technique, facturation, RGPD, partenariats.',
    url: '/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
