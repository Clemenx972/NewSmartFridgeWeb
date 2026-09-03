import type { Metadata } from 'next'
import Link from 'next/link'
import { Lock, Server, Sparkles, Trash2, KeyRound, TriangleAlert, ArrowRight } from 'lucide-react'
import { INFRA, APP_LIMITS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Confidentialité — Ce qu’on fait de vos données',
  description:
    'Où sont hébergées vos données, ce que voit notre fournisseur d’IA, comment supprimer votre compte. Les limites actuelles sont indiquées telles quelles.',
  alternates: { canonical: '/security' },
  openGraph: {
    title: 'Confidentialité SmartFridge',
    description:
      'Hébergement, traitement par IA, suppression de compte : ce qu’on fait de vos données, sans enrobage.',
    url: '/security',
  },
}

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
    Icon: TriangleAlert,
    title: 'Aucune revente, aucune publicité',
    body: 'Vos courses ne sont vendues à personne, il n’y a pas de publicité dans l’application et aucun profilage publicitaire. Nous n’envoyons aucun email marketing : les seuls emails que vous recevez sont ceux liés à votre compte.',
  },
]

const limits = [
  'Les journaux serveur sont conservés entre 1 et 7 jours selon le plan de notre hébergeur — pas 90.',
  'Il n’y a pas d’engagement contractuel de disponibilité. Nous visons la continuité, nous ne la garantissons pas.',
  `La double authentification (TOTP) existe dans le code mais son écran n’est pas accessible depuis l’application. Elle n’est donc pas utilisable aujourd’hui, et n’est obligatoire nulle part.`,
  'Il n’y a pas encore d’export de vos données depuis l’application. Écrivez-nous et nous vous l’envoyons.',
  'Il n’existe pas d’écran listant vos sessions actives ni permettant de les révoquer.',
  'Il n’y a pas de délai d’expiration de session par inactivité.',
]

export default function SecurityPage() {
  return (
    <>
      <section className="bg-gradient-hero pt-32 pb-20 section-padding" aria-labelledby="security-hero-heading">
        <div className="container-max">
          <h1 id="security-hero-heading" className="heading-xl text-white mb-5 max-w-3xl">
            Ce qu’on fait de vos données, sans enrobage.
          </h1>
          <p className="text-white/70 text-xl max-w-2xl leading-relaxed">
            Cette page dit aussi ce qui ne marche pas encore. C’est plus utile
            qu’une liste de certifications.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white" aria-labelledby="facts-heading">
        <div className="container-max">
          <h2 id="facts-heading" className="heading-md text-ink mb-10">
            Les six points qui comptent
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {facts.map(({ Icon, title, body }) => (
              <article key={title} className="card p-7">
                <Icon className="w-6 h-6 text-primary-600 mb-4" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="heading-sm text-ink mb-3">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The section nobody writes */}
      <section className="section-padding bg-canvas" aria-labelledby="limits-heading">
        <div className="container-max">
          <div className="max-w-3xl">
            <h2 id="limits-heading" className="heading-md text-ink mb-4">
              Ce qu’on ne fait pas encore
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Ces points sont des limites réelles de la version actuelle.
              Ils disparaîtront de cette liste quand ils seront corrigés,
              pas avant.
            </p>

            <ul className="flex flex-col gap-4 list-none p-0 m-0">
              {limits.map((limit) => (
                <li key={limit} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-warn-500 mt-2.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>{limit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="max-w-3xl">
            <h2 className="heading-md text-ink mb-4">Vos droits</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Vous pouvez consulter et corriger vos informations depuis votre
              profil, et supprimer votre compte à tout moment depuis les réglages.
              Pour un export de vos données, une opposition à un traitement ou
              toute autre demande, écrivez-nous : nous répondons sous 30 jours,
              comme l’exige le RGPD.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              La taille de foyer maximale est de {APP_LIMITS.householdMembers + 1} personnes ;
              les membres d’un même foyer voient le stock partagé, pas les
              informations personnelles des autres comptes.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact" prefetch className="btn-primary">
                Nous écrire
                <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
              </Link>
              <Link href="/privacy" prefetch className="btn-secondary">
                Politique de confidentialité complète
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
