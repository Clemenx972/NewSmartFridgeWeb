import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PLANS, BILLING, APP_LIMITS, SITE_NAME, INFRA } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Conditions d’utilisation',
  description:
    'Conditions d’utilisation de SmartFridge : formules, facturation, résiliation, usage acceptable, responsabilité et droit applicable.',
  alternates: { canonical: '/terms' },
  robots: { index: false, follow: true },
}

const LAST_UPDATED = '2 septembre 2026'

export default function TermsPage() {
  return (
    <>
      <section className="bg-gradient-hero pt-32 pb-16 section-padding">
        <div className="container-max max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Conditions d’utilisation
          </h1>
          <p className="text-white/60 text-sm">Dernière mise à jour : {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max max-w-3xl flex flex-col gap-12">

          <div className="bg-canvas border border-primary-100 rounded-2xl p-6">
            <p className="text-gray-800 leading-relaxed">
              En utilisant {SITE_NAME}, vous acceptez ces conditions.
              Elles sont écrites pour être lisibles ; si un point vous semble
              ambigu, écrivez-nous et nous le clarifierons.
            </p>
          </div>

          <section aria-labelledby="t1">
            <h2 id="t1" className="heading-md text-ink mb-4">1. Objet</h2>
            <p className="text-gray-600 leading-relaxed">
              {SITE_NAME} est une application mobile de suivi des aliments d’un
              foyer, accompagnée de ce site. Ces conditions régissent leur
              utilisation et forment un contrat entre vous et l’éditeur de
              l’application.
            </p>
          </section>

          <section aria-labelledby="t2">
            <h2 id="t2" className="heading-md text-ink mb-4">2. Les formules</h2>
            <div className="flex flex-col gap-4">
              <div className="card p-6">
                <h3 className="font-semibold text-ink mb-2">
                  {PLANS.standard.name} — {PLANS.standard.priceLabel}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Suivi des aliments, rappels de péremption, saisie dictée, scan de
                  code-barres, liste de courses et recettes, sur un appareil.
                  Sans limite de durée et sans carte bancaire.
                </p>
              </div>

              <div className="card p-6">
                <h3 className="font-semibold text-ink mb-2">
                  {PLANS.premium.name} — {PLANS.premium.priceLabel}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Tout {PLANS.standard.name}, plus la synchronisation entre vos
                  appareils et une analyse IA étendue.
                </p>
              </div>

              <div className="card p-6">
                <h3 className="font-semibold text-ink mb-2">
                  {PLANS.diamant.name} — {PLANS.diamant.priceLabel}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Tout {PLANS.premium.name}, plus le partage du foyer
                  (jusqu’à {APP_LIMITS.householdMembers + 1} personnes),
                  les recettes générées par IA et le scan photo par IA.
                </p>
              </div>
            </div>

            <div className="text-gray-600 text-sm leading-relaxed mt-5 flex flex-col gap-3">
              <p className="m-0">
                <strong className="text-ink">Essai de {BILLING.trialDays} jours.</strong>{' '}
                Les formules {PLANS.premium.name} et {PLANS.diamant.name} peuvent être
                essayées gratuitement pendant {BILLING.trialDays} jours. Un moyen de
                paiement est enregistré au début de l’essai mais n’est débité qu’à son
                terme. La date exacte du premier prélèvement est affichée avant la
                souscription. L’essai est limité à un par personne.
              </p>
              <p className="m-0">
                À l’issue de l’essai, l’abonnement démarre automatiquement au tarif
                mensuel indiqué, sauf résiliation avant cette date. Une résiliation
                pendant l’essai n’entraîne <strong className="text-ink">aucun
                prélèvement</strong>.
              </p>
              <p className="m-0">
                Il n’existe <strong className="text-ink">aucune offre annuelle</strong>
                à ce jour.
              </p>
            </div>
          </section>

          <section aria-labelledby="t3">
            <h2 id="t3" className="heading-md text-ink mb-4">3. Facturation et résiliation</h2>
            <div className="text-gray-600 leading-relaxed flex flex-col gap-3">
              <p>
                Les abonnements sont mensuels, facturés par carte via{' '}
                {BILLING.provider}, et se renouvellent automatiquement jusqu’à
                résiliation. Les prix sont indiqués TTC. Un rappel est adressé par
                courriel avant la fin de la période d’essai.
              </p>
              <p>
                <strong className="text-ink">Droit de rétractation.</strong> En
                demandant l’accès immédiat au service lors de la souscription, vous
                reconnaissez renoncer à votre droit de rétractation de 14 jours,
                conformément à l’article L221-28 du Code de la consommation. Ce
                consentement vous est demandé explicitement, par une case à cocher
                distincte, avant tout engagement.
              </p>
              <p>
                La résiliation se fait depuis l’application ({BILLING.cancelPath}),
                qui ouvre le portail client {BILLING.provider}. Elle prend effet à la
                fin de la période en cours ; l’accès reste actif jusque-là.
                Aucun remboursement au prorata n’est effectué pour une période
                entamée, sauf disposition légale contraire.
              </p>
              <p>
                Un changement de formule crée un nouvel abonnement.
                Les modalités de proratisation sont celles appliquées par{' '}
                {BILLING.provider} lors du changement.
              </p>
            </div>
          </section>

          <section aria-labelledby="t4">
            <h2 id="t4" className="heading-md text-ink mb-4">4. Usage acceptable</h2>
            <p className="text-gray-600 leading-relaxed mb-3">Vous vous engagez à ne pas :</p>
            <ul className="text-gray-600 flex flex-col gap-2 list-none p-0 m-0">
              {[
                'Utiliser l’application à des fins illégales',
                'Tenter d’accéder aux données d’autres utilisateurs',
                'Décompiler ou désassembler l’application',
                'Automatiser des requêtes de manière à dégrader le service',
                'Contourner les mécanismes de paiement',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2.5 flex-shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              Un manquement peut entraîner la suspension ou la fermeture du compte.
            </p>
          </section>

          <section aria-labelledby="t5">
            <h2 id="t5" className="heading-md text-ink mb-4">5. Disponibilité et responsabilité</h2>
            <div className="text-gray-600 leading-relaxed flex flex-col gap-3">
              <p>
                Le service est fourni en l’état. Nous cherchons à le maintenir
                disponible en permanence mais{' '}
                <strong className="text-ink">nous ne prenons aucun engagement
                chiffré de disponibilité</strong> : notre hébergeur n’en offre pas
                sur les formules que nous utilisons, et promettre un taux que nous
                ne contrôlons pas n’aurait aucune valeur.
              </p>
              <p>
                Les dates de péremption sont des estimations, y compris celles
                proposées automatiquement. Elles ne remplacent pas la date imprimée
                sur l’emballage ni votre jugement. Nous ne sommes pas responsables
                d’une intoxication ou d’un aliment consommé à tort.
              </p>
              <p>
                Nous ne sommes pas responsables des dommages indirects, ni des pertes
                de données dues à une panne de votre appareil. Notre responsabilité
                est en tout état de cause limitée aux sommes que vous nous avez
                versées au cours des douze mois précédents.
              </p>
            </div>
          </section>

          <section aria-labelledby="t6">
            <h2 id="t6" className="heading-md text-ink mb-4">6. Données personnelles</h2>
            <p className="text-gray-600 leading-relaxed">
              Le traitement de vos données, y compris l’hébergement aux{' '}
              {INFRA.regionShort} et l’envoi de vos saisies libres à un fournisseur
              d’IA, est décrit dans notre{' '}
              <Link href="/privacy" prefetch className="text-primary-700 hover:underline">
                politique de confidentialité
              </Link>.
            </p>
          </section>

          <section aria-labelledby="t7">
            <h2 id="t7" className="heading-md text-ink mb-4">7. Modification des conditions</h2>
            <p className="text-gray-600 leading-relaxed">
              Ces conditions peuvent évoluer. Toute modification substantielle vous
              sera notifiée par email au moins 30 jours avant son entrée en vigueur.
              Poursuivre l’utilisation après cette date vaut acceptation.
            </p>
          </section>

          <section aria-labelledby="t8">
            <h2 id="t8" className="heading-md text-ink mb-4">8. Droit applicable</h2>
            <p className="text-gray-600 leading-relaxed">
              Ces conditions sont soumises au droit français. En cas de litige, nous
              cherchons d’abord une solution amiable. À défaut, les tribunaux
              français sont compétents. Les consommateurs de l’Union européenne
              peuvent aussi recourir à la{' '}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-700 hover:underline"
              >
                plateforme de règlement en ligne des litiges
              </a>.
            </p>
          </section>

          <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
            <Link href="/privacy" prefetch className="inline-flex items-center gap-2 text-primary-700 font-medium hover:underline">
              <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
              Politique de confidentialité
            </Link>
            <Link href="/contact" prefetch className="inline-flex items-center gap-2 text-primary-700 font-medium hover:underline">
              <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
              Une question ?
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
