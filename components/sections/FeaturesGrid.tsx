import Link from 'next/link'
import { Mic, Bell, ScanBarcode, ChefHat, Users, TriangleAlert, Store, ArrowRight } from 'lucide-react'
import { APP_LIMITS, PLANS } from '@/lib/constants'

export function FeaturesGrid() {
  return (
    <section id="features" className="section-padding bg-white" aria-labelledby="features-heading">
      <div className="container-max">
        <div className="mb-12 max-w-2xl">
          <span className="section-label">Ce que fait l’app</span>
          <h2 id="features-heading" className="heading-lg text-ink mt-3">
            Six choses, faites correctement.
          </h2>
        </div>

        {/* Bento — CSS grid only, no JavaScript.
            Rows have a floor, not a fixed height: 236px keeps the tiles aligned,
            but a card with more content than that (the store route and its four
            aisles) must grow instead of spilling past its own border. */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[minmax(236px,auto)]">

          {/* Lead tile: the differentiator gets the space */}
          <article className="md:col-span-2 md:row-span-2 bg-ink rounded-2xl p-8 flex flex-col justify-between text-white">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <Mic className="w-6 h-6 text-primary-300" strokeWidth={1.5} aria-hidden="true" />
                <span className="text-[11px] font-semibold uppercase tracking-wide text-white/60 border border-white/20 rounded-full px-2.5 py-1">
                  Formule {PLANS.diamant.name}
                </span>
              </div>
              <h3 className="text-2xl font-semibold mb-3">Dictez, ne saisissez pas</h3>
              <p className="text-white/70 leading-relaxed max-w-sm">
                Écrivez ou dictez votre course comme vous la diriez. L’app découpe,
                quantifie et propose un rangement pour chaque article.
              </p>
            </div>

            {/* Show the mechanism */}
            <div className="mt-8">
              <p className="bg-white/[0.07] border border-white/10 rounded-xl px-4 py-3 text-sm text-white/90">
                2 yaourts nature, 500 g de jambon et 1 L de lait
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="bg-primary-500/15 text-primary-200 text-xs font-medium px-3 py-1.5 rounded-lg border border-primary-400/20">
                  Yaourt · 2 u · 21 j
                </span>
                <span className="bg-primary-500/15 text-primary-200 text-xs font-medium px-3 py-1.5 rounded-lg border border-primary-400/20">
                  Jambon · 500 g · 5 j
                </span>
                <span className="bg-primary-500/15 text-primary-200 text-xs font-medium px-3 py-1.5 rounded-lg border border-primary-400/20">
                  Lait · 1 L
                </span>
              </div>
            </div>
          </article>

          {/* Recipes */}
          <article className="md:col-span-2 card card-hover p-8 flex flex-col justify-between">
            <div>
              <ChefHat className="w-6 h-6 text-ink mb-4" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="heading-sm text-ink mb-2">Cuisinez ce qui part en premier</h3>
              <p className="text-gray-600 text-[15px] leading-relaxed max-w-sm">
                L’app regarde ce qui approche de sa date et propose une recette qui
                l’utilise. « Démarrer » déduit les quantités de votre stock.
              </p>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <span className="badge bg-warn-50 text-warn-700 text-xs border border-warn-100">
                À cuisiner ce soir
              </span>
              <span className="text-gray-500 text-sm">Sandwich jambon fromage · 5 min</span>
            </div>
          </article>

          {/* Barcode */}
          <article className="card card-hover p-7 flex flex-col">
            <ScanBarcode className="w-6 h-6 text-ink mb-4" strokeWidth={1.5} aria-hidden="true" />
            <h3 className="font-semibold text-ink mb-2">Scan de code-barres</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Nom et photo pré-remplis depuis Open Food Facts.
            </p>
          </article>

          {/* Alerts */}
          <article className="card card-hover p-7 flex flex-col">
            <Bell className="w-6 h-6 text-ink mb-4" strokeWidth={1.5} aria-hidden="true" />
            <h3 className="font-semibold text-ink mb-2">Rappel avant la date</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Une notification {APP_LIMITS.expiryReminderDays} jours avant péremption.
              Une seule, pas dix.
            </p>
          </article>

          {/* Store route — le différenciateur de la liste de courses */}
          <article className="md:col-span-2 card card-hover p-8 flex flex-col justify-between">
            <div>
              <Store className="w-6 h-6 text-ink mb-4" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="heading-sm text-ink mb-2">Votre liste dans l’ordre du magasin</h3>
              <p className="text-gray-600 text-[15px] leading-relaxed max-w-sm">
                La vue Panier range vos articles par rayon, de l’entrée aux caisses.
                Vous ne revenez plus sur vos pas.
              </p>
            </div>
            <ol className="flex flex-col gap-2 mt-6 list-none p-0 m-0">
              {[
                { n: 1, rayon: 'Pâtes, riz & féculents', note: 'entrée' },
                { n: 2, rayon: 'Crèmerie', note: null },
                { n: 3, rayon: 'Charcuterie & traiteur', note: null },
                { n: 4, rayon: 'Fruits & légumes', note: 'caisses' },
              ].map((r) => (
                <li key={r.n} className="flex items-center gap-3 text-sm">
                  <span className="w-5 h-5 rounded-full bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 tabular-nums">
                    {r.n}
                  </span>
                  <span className="text-gray-700 flex-grow">{r.rayon}</span>
                  {r.note && <span className="text-gray-400 text-xs">{r.note}</span>}
                </li>
              ))}
            </ol>
          </article>

          {/* Household */}
          <article className="card card-hover p-7 flex flex-col">
            <Users className="w-6 h-6 text-ink mb-4" strokeWidth={1.5} aria-hidden="true" />
            <h3 className="font-semibold text-ink mb-2">Jusqu’à {APP_LIMITS.householdMembers + 1} personnes</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Le foyer partage le même stock et la même liste, chacun avec son compte.
            </p>
          </article>

          {/* Allergens */}
          <article className="card card-hover p-7 flex flex-col">
            <TriangleAlert className="w-6 h-6 text-ink mb-4" strokeWidth={1.5} aria-hidden="true" />
            <h3 className="font-semibold text-ink mb-2">Alerte allergènes</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Un rangement qui contient un aliment incompatible avec vos régimes porte
              un avertissement.
            </p>
          </article>
        </div>

        <div className="mt-10">
          <Link
            href="/features"
            prefetch
            className="inline-flex items-center gap-2 text-primary-700 font-semibold hover:text-primary-800 transition-colors"
          >
            Tout ce que fait l’application
            <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
