import type { Metadata } from 'next'
import Link from 'next/link'
import { Lock, Server, Sparkles, Trash2, KeyRound, ShieldOff, ArrowRight } from 'lucide-react'
import { INFRA, SITE_NAME, CONTACT_EMAIL, BILLING } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Confidentialité et données personnelles',
  description:
    'Où sont hébergées vos données, ce que voit notre fournisseur d’IA, combien de temps tout est conservé, et comment exercer vos droits. Les limites actuelles sont indiquées telles quelles.',
  alternates: { canonical: '/privacy' },
  robots: { index: false, follow: true },
}

const LAST_UPDATED = '3 septembre 2026'

const facts = [
  {
    Icon: Server,
    title: 'Où vivent vos données',
    body: `Sur ${INFRA.database}, dans la région ${INFRA.region}. C’est un transfert hors Union européenne, encadré par les clauses contractuelles types de la Commission européenne. Une migration vers un hébergement européen est prévue ; tant qu’elle n’est pas faite, c’est écrit ici.`,
  },
  {
    Icon: Sparkles,
    title: 'Ce que voit le fournisseur d’IA',
    body: `Quand vous utilisez la saisie libre, le texte que vous écrivez ou dictez est envoyé à notre serveur puis à ${INFRA.aiProvider} pour être découpé en articles. Rien d’autre ne part : ni votre inventaire complet, ni vos recettes, ni votre profil. Sans connexion, un dictionnaire embarqué prend le relais et rien ne sort de l’appareil.`,
  },
  {
    Icon: Lock,
    title: 'Chiffrement',
    body: 'Les données sont chiffrées au repos côté serveur (AES-256, assuré par notre hébergeur) et transitent en HTTPS. Sur votre téléphone, la session est stockée dans le coffre chiffré du système Android.',
  },
  {
    Icon: Trash2,
    title: 'Suppression du compte',
    body: 'Réglages, puis « Supprimer mon compte ». L’application liste ce qui va être effacé et demande une confirmation écrite. La suppression est immédiate en base et sur le compte d’authentification. Seules les sauvegardes de l’hébergeur suivent leur propre cycle de rotation.',
  },
  {
    Icon: KeyRound,
    title: 'Authentification',
    body: 'Compte par email et mot de passe, avec vérification de l’adresse avant l’accès complet. Les mots de passe ne transitent jamais en clair et ne sont jamais stockés par nous : l’authentification est déléguée à notre hébergeur.',
  },
  {
    Icon: ShieldOff,
    title: 'Aucune revente, aucune publicité',
    body: 'Vos courses ne sont vendues à personne, il n’y a pas de publicité dans l’application et aucun profilage publicitaire. Nous n’envoyons aucun email marketing : les seuls emails que vous recevez sont ceux liés à votre compte.',
  },
]

const collected: Array<[string, string, string, string]> = [
  ['Compte',       'Email, mot de passe (haché par l’hébergeur)', 'Créer et sécuriser votre compte', 'Contrat'],
  ['Profil',       'Nom d’affichage, personnes à la maison, régimes et intolérances', 'Adapter les seuils de stock et les alertes allergènes', 'Contrat'],
  ['Inventaire',   'Aliments, quantités, dates, photos', 'Faire fonctionner l’application', 'Contrat'],
  ['Saisie libre', 'Le texte que vous écrivez ou dictez', 'Découper votre phrase en articles', 'Contrat'],
  ['Paiement',     `Géré par ${BILLING.provider} — nous ne voyons aucune donnée bancaire`, 'Facturer les abonnements', 'Contrat'],
  ['Anti-fraude',  'Empreinte irréversible de l’email et du moyen de paiement', 'Limiter l’essai gratuit à un par personne', 'Intérêt légitime'],
  ['Journaux',     'Adresse IP, type d’appareil, erreurs', 'Sécurité et correction de bugs', 'Intérêt légitime'],
  ['Contact',      'Nom, email, message', 'Répondre à votre demande', 'Consentement'],
]

const retention: Array<[string, string]> = [
  ['Données de compte et inventaire', 'Jusqu’à la suppression du compte'],
  ['Saisies libres envoyées à l’IA',  'Non conservées par nous après analyse'],
  ['Empreintes anti-fraude',          '24 mois'],
  ['Journaux serveur',                '1 à 7 jours selon le plan de notre hébergeur'],
  ['Données de facturation',          `10 ans (obligation comptable), conservées par ${BILLING.provider}`],
  ['Messages envoyés via le formulaire', '2 ans'],
]

const limits = [
  'Les journaux serveur sont conservés entre 1 et 7 jours selon le plan de notre hébergeur — pas 90.',
  'Il n’y a pas d’engagement contractuel de disponibilité. Nous visons la continuité, nous ne la garantissons pas.',
  'La double authentification existe dans le code mais son écran n’est pas accessible depuis l’application. Elle n’est donc pas utilisable aujourd’hui.',
  'Il n’y a pas encore d’export automatisé de vos données depuis l’application. Écrivez-nous et nous vous l’envoyons.',
  'Il n’existe pas d’écran listant vos sessions actives ni permettant de les révoquer.',
]

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-gradient-hero pt-32 pb-16 section-padding">
        <div className="container-max max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Confidentialité et données personnelles
          </h1>
          <p className="text-white/60 text-sm">Dernière mise à jour : {LAST_UPDATED}</p>
        </div>
      </section>

      {/* En clair d'abord, le formalisme ensuite */}
      <section className="section-padding bg-white" aria-labelledby="facts-heading">
        <div className="container-max max-w-4xl">
          <div className="bg-canvas border border-primary-100 rounded-2xl p-6 mb-12">
            <p className="text-gray-800 leading-relaxed m-0">
              <strong className="text-ink">En résumé.</strong> Nous collectons ce qui est
              nécessaire au fonctionnement de l’application. Vos données ne sont ni vendues
              ni utilisées à des fins publicitaires. Elles sont hébergées aux{' '}
              {INFRA.regionShort}, ce qui constitue un transfert hors Union européenne.
              Le texte que vous soumettez à l’analyse est transmis à un fournisseur d’IA.
              Vous pouvez tout supprimer depuis l’application.
            </p>
          </div>

          <h2 id="facts-heading" className="heading-md text-ink mb-8">
            Les six points qui comptent
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            {facts.map(({ Icon, title, body }) => (
              <article key={title} className="card p-6">
                <Icon className="w-6 h-6 text-primary-600 mb-3" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="heading-sm text-ink mb-2">{title}</h3>
                <p className="text-gray-600 text-[15px] leading-relaxed">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* La section que personne n'écrit */}
      <section className="section-padding bg-canvas" aria-labelledby="limits-heading">
        <div className="container-max max-w-3xl">
          <h2 id="limits-heading" className="heading-md text-ink mb-4">
            Ce qu’on ne fait pas encore
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            Ces points sont des limites réelles de la version actuelle. Ils disparaîtront
            de cette liste quand ils seront corrigés, pas avant.
          </p>
          <ul className="flex flex-col gap-4 list-none p-0 m-0">
            {limits.map((limit) => (
              <li key={limit} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-warn-500 mt-2.5 flex-shrink-0" aria-hidden="true" />
                <span>{limit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Le détail formel */}
      <section className="section-padding bg-white">
        <div className="container-max max-w-3xl flex flex-col gap-12">

          <section aria-labelledby="p1">
            <h2 id="p1" className="heading-md text-ink mb-4">1. Qui traite vos données</h2>
            <p className="text-gray-600 leading-relaxed">
              {SITE_NAME} est responsable du traitement des données décrites ici.
              Pour toute question ou demande, écrivez à{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary-700 hover:underline">
                {CONTACT_EMAIL}
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
            <h2 id="p3" className="heading-md text-ink mb-4">3. Transferts hors Union européenne</h2>
            <div className="text-gray-600 leading-relaxed flex flex-col gap-3">
              <p>
                Nos données sont hébergées par {INFRA.database} dans la région{' '}
                <strong className="text-ink">{INFRA.region}</strong>. Il s’agit d’un
                transfert de données personnelles hors de l’Union européenne, encadré par
                les clauses contractuelles types adoptées par la Commission européenne.
              </p>
              <p>
                La saisie en langage naturel envoie le texte que vous soumettez à{' '}
                <strong className="text-ink">{INFRA.aiProvider}</strong> pour analyse, hors
                Union européenne également. Seul ce texte est transmis.
              </p>
              <p>
                Les paiements sont traités par {INFRA.payments}, qui reçoit directement vos
                coordonnées bancaires — nous n’y avons jamais accès. Les emails liés à votre
                compte sont envoyés par {INFRA.authEmails}.
              </p>
            </div>
          </section>

          <section aria-labelledby="p4">
            <h2 id="p4" className="heading-md text-ink mb-4">4. Combien de temps</h2>
            <div className="flex flex-col gap-3">
              {retention.map(([what, howLong]) => (
                <div
                  key={what}
                  className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 border-b border-gray-100 pb-3"
                >
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
                Vous disposez d’un droit d’accès, de rectification, d’effacement, de
                portabilité, d’opposition et de limitation sur vos données.
              </p>
              <p>
                <strong className="text-ink">Directement dans l’application :</strong>{' '}
                corriger votre profil, et supprimer définitivement votre compte
                (Réglages → Supprimer mon compte). La suppression est immédiate.
              </p>
              <p>
                <strong className="text-ink">Sur demande :</strong> l’export de vos données
                n’est pas encore automatisé. Écrivez-nous et nous vous l’envoyons.
                Nous répondons sous 30 jours au plus.
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
            <Link
              href="/terms"
              prefetch
              className="inline-flex items-center gap-2 text-primary-700 font-medium hover:underline"
            >
              <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
              Conditions d’utilisation
            </Link>
            <Link
              href="/contact"
              prefetch
              className="inline-flex items-center gap-2 text-primary-700 font-medium hover:underline"
            >
              <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
              Nous écrire
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
