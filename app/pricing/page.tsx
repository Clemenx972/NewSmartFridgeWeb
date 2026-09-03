import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, X, Info } from 'lucide-react'
import { CTAButton } from '@/components/ui/CTAButton'
import { PLANS, BILLING, APP_LIMITS, ADEME_WASTE } from '@/lib/constants'

// Prices come from PLANS so a price change in lib/constants.ts propagates here.
// Hardcoding them in the title would leave a stale price in Google's results.
export const metadata: Metadata = {
  title: `Tarifs — Gratuit, ${PLANS.premium.name} ${PLANS.premium.priceLabel} ou ${PLANS.diamant.name} ${PLANS.diamant.priceLabel}`,
  description:
    `SmartFridge est gratuit sans limite de durée. ${PLANS.premium.name} à ${PLANS.premium.priceLabel} pour la synchronisation, ${PLANS.diamant.name} à ${PLANS.diamant.priceLabel} pour le partage du foyer et les recettes générées. Sans engagement.`,
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: `Tarifs SmartFridge — Gratuit, ${PLANS.premium.priceLabel} ou ${PLANS.diamant.priceLabel}`,
    description:
      'La formule gratuite n’expire pas. Les formules payantes sont résiliables à tout moment, sans engagement.',
    url: '/pricing',
  },
}

type Row = { label: string; standard: boolean | string; premium: boolean | string; diamant: boolean | string }

const comparison: Row[] = [
  { label: 'Rangements (frigo, congélateur, placard)', standard: '2', premium: 'Illimités', diamant: 'Illimités' },
  { label: 'Scan de code-barres',                      standard: true,  premium: true,  diamant: true },
  { label: 'Rappels de péremption',                    standard: true,  premium: true,  diamant: true },
  { label: 'Liste de courses et parcours magasin',     standard: true,  premium: true,  diamant: true },
  { label: 'Recettes à partir du stock',               standard: true,  premium: true,  diamant: true },
  { label: 'Widget écran d’accueil',                   standard: true,  premium: true,  diamant: true },
  { label: 'Alertes allergènes',                       standard: true,  premium: true,  diamant: true },
  { label: 'Mode hors-ligne',                          standard: true,  premium: true,  diamant: true },
  { label: 'Synchronisation entre appareils',          standard: false, premium: true,  diamant: true },
  { label: 'Saisie dictée analysée par IA',            standard: false, premium: false, diamant: true },
  { label: 'Scan de ticket de caisse par IA',          standard: false, premium: false, diamant: true },
  { label: 'Recettes générées par IA',                 standard: false, premium: false, diamant: true },
  { label: `Partage du foyer (${APP_LIMITS.householdMembers + 1} personnes)`, standard: false, premium: false, diamant: true },
]

function Cell({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <>
        <Check className="inline w-5 h-5 text-primary-600" strokeWidth={2} aria-hidden="true" />
        <span className="sr-only">Inclus</span>
      </>
    )
  }
  if (value === false) {
    return (
      <>
        <X className="inline w-5 h-5 text-gray-300" strokeWidth={2} aria-hidden="true" />
        <span className="sr-only">Non inclus</span>
      </>
    )
  }
  return <span className="text-gray-700 text-sm font-medium">{value}</span>
}

const plans = [
  {
    ...PLANS.standard,
    highlight: false,
    cta: 'Commencer gratuitement',
    points: ['Sans carte bancaire, sans limite de durée', 'Scan, rappels, courses et recettes', 'Un seul appareil'],
  },
  {
    ...PLANS.premium,
    highlight: true,
    cta: `${BILLING.trialDays} jours d’essai`,
    points: ['Vos données sur tous vos appareils', 'Rangements illimités', 'Résiliable à tout moment'],
  },
  {
    ...PLANS.diamant,
    highlight: false,
    cta: `${BILLING.trialDays} jours d’essai`,
    points: ['Toute la partie IA de l’application', `Partage du foyer jusqu’à ${APP_LIMITS.householdMembers + 1} personnes`, 'Scan de ticket de caisse'],
  },
]

export default function PricingPage() {
  return (
    <>
      <section className="bg-gradient-hero pt-32 pb-20 section-padding" aria-labelledby="pricing-hero-heading">
        <div className="container-max">
          <h1 id="pricing-hero-heading" className="heading-xl text-white mb-5 max-w-3xl">
            Gratuit pour toujours. Payant si vous voulez plus.
          </h1>
          <p className="text-white/70 text-xl max-w-2xl leading-relaxed">
            La formule gratuite n’a pas de date limite et ne demande pas de carte.
            Les formules payantes s’essaient {BILLING.trialDays} jours.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white" aria-labelledby="plans-heading">
        <div className="container-max">
          <h2 id="plans-heading" className="sr-only">Les trois formules</h2>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={
                  plan.highlight
                    ? 'rounded-2xl p-8 bg-ink text-white relative'
                    : 'rounded-2xl p-8 bg-white border border-gray-200 shadow-card'
                }
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-8 bg-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-md">
                    Le plus complet pour une personne
                  </span>
                )}

                <h3 className={plan.highlight ? 'font-semibold mb-3' : 'font-semibold text-ink mb-3'}>
                  {plan.name}
                </h3>
                <p className="flex items-baseline gap-2 mb-3">
                  <span className={plan.highlight ? 'text-4xl font-bold' : 'text-4xl font-bold text-ink'}>
                    {plan.price === 0 ? '0 €' : `${String(plan.price).replace('.', ',')} €`}
                  </span>
                  <span className={plan.highlight ? 'text-white/60 text-sm' : 'text-gray-500 text-sm'}>
                    {plan.price === 0 ? 'pour toujours' : 'par mois'}
                  </span>
                </p>
                <p className={plan.highlight ? 'text-white/70 text-sm mb-7' : 'text-gray-600 text-sm mb-7'}>
                  {plan.tagline}
                </p>

                <CTAButton
                  href="/contact"
                  variant={plan.highlight ? 'primary' : 'secondary'}
                  className={plan.highlight ? 'w-full justify-center bg-white !text-ink hover:bg-white/90' : 'w-full justify-center'}
                  ariaLabel={`${plan.cta} — formule ${plan.name}`}
                >
                  {plan.cta}
                </CTAButton>

                <ul className="mt-7 space-y-3 list-none p-0">
                  {plan.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <Check
                        className={plan.highlight ? 'w-4 h-4 mt-1 flex-shrink-0 text-primary-300' : 'w-4 h-4 mt-1 flex-shrink-0 text-primary-600'}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      <span className={plan.highlight ? 'text-white/85 text-sm' : 'text-gray-700 text-sm'}>
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Ce que les concurrents écrivent en tout petit */}
          <div className="mt-8 flex items-start gap-3 p-5 bg-canvas rounded-xl border border-primary-100 max-w-3xl">
            <Info className="w-5 h-5 text-primary-700 flex-shrink-0 mt-0.5" strokeWidth={1.8} aria-hidden="true" />
            <div className="text-gray-700 text-sm leading-relaxed">
              <p className="m-0">
                <strong className="text-ink">
                  L’essai de {BILLING.trialDays} jours demande une carte bancaire.
                </strong>{' '}
                Elle n’est pas débitée pendant l’essai. Au 8<sup>e</sup> jour,
                l’abonnement démarre automatiquement — la date exacte du premier
                débit vous est affichée avant que vous ne commenciez.
              </p>
              <p className="mt-2 mb-0">
                Résiliation à tout moment avant cette date depuis {BILLING.cancelPath} :
                aucun montant ne sera prélevé. Un seul essai par personne.
                Facturation mensuelle par {BILLING.provider}, sans engagement de durée,
                pas d’offre annuelle pour le moment.
              </p>
              <p className="mt-2 mb-0">
                Si vous préférez ne pas donner de carte, la formule{' '}
                {PLANS.standard.name} reste gratuite sans limite de durée.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-canvas" aria-labelledby="comparison-heading">
        <div className="container-max">
          <h2 id="comparison-heading" className="heading-md text-ink mb-8">
            Le détail, formule par formule
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-sm min-w-[640px]">
              <caption className="sr-only">
                Comparaison des fonctionnalités entre les formules Standard, Premium et Diamant
              </caption>
              <thead>
                <tr className="bg-ink text-white">
                  <th scope="col" className="text-left p-4 font-semibold">Fonctionnalité</th>
                  <th scope="col" className="text-center p-4 font-semibold">{PLANS.standard.name}</th>
                  <th scope="col" className="text-center p-4 font-semibold">{PLANS.premium.name}</th>
                  <th scope="col" className="text-center p-4 font-semibold">{PLANS.diamant.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comparison.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 1 ? 'bg-gray-50/60' : ''}>
                    <th scope="row" className="p-4 font-medium text-ink text-left">{row.label}</th>
                    <td className="p-4 text-center"><Cell value={row.standard} /></td>
                    <td className="p-4 text-center bg-primary-50/40"><Cell value={row.premium} /></td>
                    <td className="p-4 text-center"><Cell value={row.diamant} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-gray-500 text-sm mt-5 max-w-2xl">
            Prix TTC. Paiement par carte via {BILLING.provider}.
            Pour situer : un foyer jette en moyenne {ADEME_WASTE.perHouseholdPerYear} de
            nourriture par an ({ADEME_WASTE.source}).{' '}
            <Link href="/security" prefetch className="text-primary-700 hover:underline">
              Comment vos données sont traitées
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
