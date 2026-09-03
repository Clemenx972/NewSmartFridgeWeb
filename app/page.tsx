import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { Approach } from '@/components/sections/Approach'
import { ValueProps } from '@/components/sections/ValueProps'
import { FeaturesGrid } from '@/components/sections/FeaturesGrid'
import { AppTour } from '@/components/sections/AppTour'
import { TrustBadges } from '@/components/sections/TrustBadges'
import { FAQ } from '@/components/sections/FAQ'
import { CTABanner } from '@/components/sections/CTABanner'

export const metadata: Metadata = {
  title: 'SmartFridge — Ne jetez plus ce que vous avez oublié',
  description:
    'Suivez ce que contient votre frigo, recevez un rappel avant que ça périme et cuisinez ce qui doit partir en premier. Saisie dictée, scan de code-barres, partage du foyer. Application Android.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'SmartFridge — Ne jetez plus ce que vous avez oublié',
    description:
      'Un foyer jette 465 € de nourriture par an. SmartFridge suit votre frigo, vous rappelle les dates et propose quoi cuisiner en premier.',
    url: '/',
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Approach />
      <ValueProps />
      <FeaturesGrid />
      <AppTour />
      <TrustBadges />
      <FAQ />
      <CTABanner />
    </>
  )
}
