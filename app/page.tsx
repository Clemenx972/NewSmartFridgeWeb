import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { ValueProps } from '@/components/sections/ValueProps'
import { AppTour } from '@/components/sections/AppTour'
import { CTABanner } from '@/components/sections/CTABanner'

export const metadata: Metadata = {
  title: 'SmartFridge — Ne jetez plus ce que vous avez oublié',
  description:
    'Suivez ce que contient votre frigo, recevez un rappel avant que ça périme et cuisinez ce qui doit partir en premier. Application Android.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'SmartFridge — Ne jetez plus ce que vous avez oublié',
    description:
      'Un foyer jette 465 € de nourriture par an. SmartFridge suit votre frigo, vous rappelle les dates et propose quoi cuisiner en premier.',
    url: '/',
  },
}

/**
 * Page d'accueil — volontairement courte.
 *
 * Son seul travail : donner envie d'aller voir /features ou /pricing.
 * Le détail des fonctionnalités vit sur /features, la confidentialité sur
 * /privacy. Tout ce qui a été retiré d'ici n'a pas été supprimé, seulement
 * déplacé là où un visiteur le cherche vraiment.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <AppTour />
      <CTABanner />
    </>
  )
}
