import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { INFRA, SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    'Données collectées par SmartFridge, finalités, base légale, durées de conservation, transferts hors UE et exercice de vos droits RGPD.',
  alternates: { canonical: '/privacy' },
  robots: { index: false, follow: true },
}

const LAST_UPDATED = '2 septembre 2026'

const collected: Array<[string, string, string, string]> = [
  ['Compte',        'Email, mot de passe (haché par l’hébergeur)', 'Créer et sécuriser votre compte', 'Exécution du contrat'],
  ['Profil',        'Nom d’affichage, taille du foyer, régimes et intolérances', 'Adapter les seuils de stock et les alertes allergènes', 'Exécution du contrat'],
  ['Inventaire',    'Aliments, quantités, dates, photos', 'Faire fonctionner l’application', 'Exécution du contrat'],
  ['Saisie libre',  'Le texte que vous écrivez ou dictez', 'Découper votre phrase en articles', 'Exécution du contrat'],
  ['Paiement',      'Géré par Stripe — nous ne voyons aucune donnée bancaire', 'Facturer les abonnements', 'Exécution du contrat'],
  ['Journaux',      'Adresse IP, type d’appareil, erreurs', 'Sécurité et correction de bugs', 'Intérêt légitime'],
  ['Contact',       'Nom, email, message', 'Répondre à votre demande', 'Consentement'],
]

const retention: Array<[string, string]> = [
  ['Données de compte et inventaire', 'Jusqu’à la suppression du compte'],
  ['Saisies libres envoyées à l’IA',  'Non conservées par nous après analyse'],
  ['Journaux serveur',                '1 à 7 jours selon le plan de notre hébergeur'],
  ['Données de facturation',          '10 ans (obligation comptable), conservées par Stripe'],
  ['Messages envoyés via le formulaire', '2 ans'],
]

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-gradient-hero pt-32 pb-16 section-padding">
        <div className="container-max max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Politique de confidentialité
          </h1>
          <p className="text-white/60 text-sm">Dernière mise à jour : {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max max-w-3xl flex flex-col gap-12">

          <div className="bg-canvas border border-primary-100 rounded-2xl p-6">
            <p className="text-gray-800 leading-relaxed">
              <strong className="text-ink">En résumé.</strong> Nous collectons ce
              qui est nécessaire au fonctionnement de l’application. Vos données
              ne sont ni vendues ni utilisées à des fins publicitaires. Elles sont
              hébergées aux {INFRA.regionShort}, ce qui constitue un transfert hors
              Union européenne. Le texte que vous soumettez à l’analyse est
              transmis à un fournisseur d’IA. Vous pouvez tout supprimer depuis
              l’application.
            </p>
          </div>

          <section aria-labelledby="p1">
            <h2 id="p1" className="heading-md text-ink mb-4">1. Qui traite vos données</h2>
            <p className="text-gray-600 leading-relaxed">
              {SITE_NAME} est responsable du traitement des données décrites ici.
              Pour toute question ou demande relative à vos données, écrivez à{' '}
              <a href="mailto:privacy@smartfridge.app" className="text-primary-700 hover:underline">
                privacy@smartfridge.app
              </a>.
            </p>
          </section>

          <section aria-labelledby="p2">
            <h2 id="p2" className="heading-md text-ink mb-4">2. Ce que nous collectons</h2>
            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full text-sm min-w-[560px]">
                <caption className="sr-only">Données collectées, finalités et bases légales</caption>
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th scope="col" className="text-left p-4 font-semibold text-ink">Catégorie</th>
                    <th scope="col" className="text-left p-4 font-semibold text-ink">Données</th>
                    <th scope="col" className="text-left p-4 font-semibold text-ink">Pourquoi</th>
                    <th scope="col" className="text-left p-4 font-semibold text-ink">Base légale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {collected.map(([cat, data, why, basis]) => (
                    <tr key={cat}>
                      <th scope="row" className="p-4 font-medium text-ink text-left">{cat}</th>
                      <td className="p-4 text-gray-600">{data}</td>
                      <td className="p-4 text-gray-600">{why}</td>
                      <td className="p-4 text-gray-500 text-xs">{basis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="p3">
            <h2 id="p3" className="heading-md text-ink mb-4">3. Hébergement et transferts hors UE</h2>
            <div className="text-gray-600 leading-relaxed flex flex-col gap-3">
              <p>
                Nos données sont hébergées par {INFRA.database} dans la région{' '}
                <strong className="text-ink">{INFRA.region}</strong>. Il s’agit d’un
                transfert de données personnelles hors de l’Union européenne, encadré
                par les clauses contractuelles types adoptées par la Commission
                européenne.
              </p>
              <p>
                La saisie en langage naturel envoie le texte que vous soumettez à{' '}
                <strong className="text-ink">{INFRA.aiProvider}</strong> pour analyse.
                Ce traitement a lieu également hors Union européenne. Seul ce texte
                est transmis : ni votre inventaire, ni votre profil, ni vos recettes.
              </p>
              <p>
                Les paiements sont traités par {INFRA.payments}, qui reçoit
                directement vos coordonnées bancaires — nous n’y avons jamais accès.
                Les emails liés à votre compte sont envoyés par {INFRA.authEmails}.
              </p>
              <p>
                Une migration vers un hébergement européen est envisagée. Cette page
                sera mise à jour le jour où elle sera effective, pas avant.
              </p>
            </div>
          </section>

          <section aria-labelledby="p4">
            <h2 id="p4" className="heading-md text-ink mb-4">4. Combien de temps</h2>
            <div className="flex flex-col gap-3">
              {retention.map(([what, howLong]) => (
                <div key={what} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 border-b border-gray-100 pb-3">
                  <span className="text-ink font-medium text-sm">{what}</span>
                  <span className="text-gray-500 text-sm">{howLong}</span>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="p5">
            <h2 id="p5" className="heading-md text-ink mb-4">5. Vos droits</h2>
            <div className="text-gray-600 leading-relaxed flex flex-col gap-3">
              <p>
                Vous disposez d’un droit d’accès, de rectification, d’effacement,
                de portabilité, d’opposition et de limitation sur vos données.
              </p>
              <p>
                <strong className="text-ink">Directement dans l’application :</strong>{' '}
                corriger votre profil, et supprimer définitivement votre compte
                (Réglages → Supprimer mon compte). La suppression est immédiate.
              </p>
              <p>
                <strong className="text-ink">Sur demande :</strong> l’export de vos
                données n’est pas encore automatisé dans l’application. Écrivez-nous
                et nous vous l’envoyons. Nous répondons sous 30 jours au plus.
              </p>
              <p>
                En cas de désaccord, vous pouvez saisir la{' '}
                <a
                  href="https://www.cnil.fr/fr/plaintes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-700 hover:underline"
                >
                  CNIL
                </a>.
              </p>
            </div>
          </section>

          <section aria-labelledby="p6">
            <h2 id="p6" className="heading-md text-ink mb-4">6. Cookies</h2>
            <p className="text-gray-600 leading-relaxed">
              Ce site n’utilise aucun cookie publicitaire ni traceur d’audience.
              Aucun bandeau de consentement n’est nécessaire.
            </p>
          </section>

          <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
            <Link href="/security" prefetch className="inline-flex items-center gap-2 text-primary-700 font-medium hover:underline">
              <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
              Confidentialité, en clair
            </Link>
            <Link href="/terms" prefetch className="inline-flex items-center gap-2 text-primary-700 font-medium hover:underline">
              <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
              Conditions d’utilisation
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
