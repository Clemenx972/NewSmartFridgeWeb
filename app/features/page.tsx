import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Mic, ScanBarcode, Bell, ShoppingCart, ChefHat, Users, ArrowRight } from 'lucide-react'
import { APP_LIMITS, PLANS, INFRA, PLATFORM } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Fonctionnalités — Saisie dictée, scan, rappels et recettes',
  description:
    'Ce que fait SmartFridge : saisie en langage naturel, scan de code-barres, rappels de péremption, liste de courses automatique, recettes à partir du stock et partage du foyer.',
  alternates: { canonical: '/features' },
  openGraph: {
    title: 'Fonctionnalités SmartFridge',
    description:
      'Saisie dictée, scan de code-barres, rappels de péremption, recettes à partir de ce qui reste.',
    url: '/features',
  },
}

const pillars = [
  {
    Icon: Mic,
    title: 'Saisie en langage naturel',
    lead: 'Décrivez votre course, l’app la range.',
    body: `Écrivez ou dictez jusqu’à ${APP_LIMITS.freeInputChars} caractères. Le texte part vers notre serveur puis vers ${INFRA.aiProvider}, qui le découpe en articles avec un nom, une quantité, une unité et une durée de conservation estimée. Chaque champ reste modifiable avant enregistrement.`,
    points: [
      'Dictée vocale sur Android',
      'Unités reconnues : u, g, kg, ml, L',
      'Durée de conservation proposée automatiquement',
      'Rangement suggéré (froid, congelé, ambiant)',
      'Repli hors-ligne sur un dictionnaire embarqué',
    ],
    screenshot: '/screenshots/app-saisie.png',
    screenshotAlt:
      'Écran de saisie : le texte « 2 yaourts nature, 500 g de jambon et 1 L de lait » est analysé et deux articles apparaissent avec leurs champs modifiables.',
  },
  {
    Icon: ScanBarcode,
    title: 'Scan de code-barres',
    lead: 'Un produit emballé, deux secondes.',
    body: 'Le lecteur intégré identifie le produit et récupère son nom et sa photo depuis Open Food Facts. Vous n’avez plus qu’à confirmer la quantité et la date.',
    points: [
      'Aucune permission caméra supplémentaire requise',
      'Nom et visuel pré-remplis',
      'Base Open Food Facts',
    ],
  },
  {
    Icon: Bell,
    title: 'Rappels de péremption',
    lead: `Prévenu ${APP_LIMITS.expiryReminderDays} jours avant.`,
    body: `Une vérification quotidienne repère ce qui approche de sa date et envoie une notification locale ${APP_LIMITS.expiryReminderDays} jours avant. Les articles concernés remontent aussi en haut de la liste, avec un badge.`,
    points: [
      `Délai fixé à ${APP_LIMITS.expiryReminderDays} jours (non réglable pour l’instant)`,
      'Notification calculée sur l’appareil, sans connexion requise',
      'Badge « Stock faible » dans la liste',
      'Les articles concernés remontent en haut',
    ],
  },
  {
    Icon: ShoppingCart,
    title: 'Liste de courses',
    lead: 'Elle se remplit sans vous.',
    body: 'Ce qui manque, ce qui est presque fini et ce qui va périmer se retrouvent au même endroit, regroupés par rangement. Vous pouvez aussi ajouter des articles à la main.',
    points: [
      'Regroupement par rangement',
      'Badges « À acheter », « Stock faible », « Périme dans N j »',
      'Seuil de stock faible adapté à la taille du foyer',
      'Ajout manuel possible',
    ],
    screenshot: '/screenshots/app-courses.png',
    screenshotAlt:
      'Écran Courses : la liste regroupée par rangement, avec des badges indiquant ce qui est à acheter et ce qui est en stock faible.',
  },
  {
    Icon: ChefHat,
    title: 'Recettes',
    lead: 'Quoi faire avec ce qui presse.',
    body: `La carte du haut propose un plat qui utilise l’aliment le plus proche de sa date. En dessous, des idées à partir de votre stock. « Démarrer la recette » déduit les quantités utilisées. Les recettes générées par IA sont réservées à la formule ${PLANS.diamant.name}.`,
    points: [
      'Recette prioritaire selon les péremptions',
      'Idées de la semaine',
      'Vos propres recettes',
      'Déduction automatique du stock',
      `Génération par IA en ${PLANS.diamant.name}`,
    ],
    screenshot: '/screenshots/app-recettes.png',
    screenshotAlt:
      'Écran Recettes : une carte « À cuisiner ce soir » propose un sandwich jambon fromage en 5 minutes, suivie des idées de la semaine.',
  },
  {
    Icon: Users,
    title: 'Partage du foyer',
    lead: `Jusqu’à ${APP_LIMITS.householdMembers + 1} personnes.`,
    body: `Invitez les membres de votre foyer par email. Chacun voit le même stock et la même liste. Deux rôles existent : propriétaire et membre. Disponible en formule ${PLANS.diamant.name}.`,
    points: [
      `${APP_LIMITS.householdMembers} membres invités + le propriétaire`,
      'Invitation par email',
      'Stock et liste partagés',
      'Synchronisation à chaque modification',
    ],
  },
]

export default function FeaturesPage() {
  return (
    <>
      <section className="bg-gradient-hero pt-32 pb-20 section-padding" aria-labelledby="features-hero-heading">
        <div className="container-max">
          <h1 id="features-hero-heading" className="heading-xl text-white mb-5 max-w-3xl">
            Ce que fait l’application, précisément.
          </h1>
          <p className="text-white/70 text-xl max-w-2xl leading-relaxed">
            Six fonctions, décrites telles qu’elles existent aujourd’hui —
            limites comprises.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white" aria-label="Détail des fonctionnalités">
        <div className="container-max flex flex-col gap-20 lg:gap-28">
          {pillars.map(({ Icon, title, lead, body, points, screenshot, screenshotAlt }, index) => (
            <article
              key={title}
              className={
                screenshot
                  ? 'grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'
                  : 'max-w-3xl'
              }
            >
              <div className={screenshot && index % 2 === 1 ? 'lg:order-2' : ''}>
                <Icon className="w-7 h-7 text-primary-600 mb-5" strokeWidth={1.5} aria-hidden="true" />
                <h2 className="heading-md text-ink mb-2">{title}</h2>
                <p className="text-primary-700 font-medium mb-4">{lead}</p>
                <p className="text-gray-600 leading-relaxed mb-6">{body}</p>
                <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-gray-700">
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {screenshot && (
                <div className={`flex justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="rounded-[1.9rem] bg-ink p-2.5 border border-gray-800 shadow-device">
                    <Image
                      src={screenshot}
                      alt={screenshotAlt ?? ''}
                      width={1080}
                      height={2400}
                      loading="lazy"
                      sizes="(max-width: 768px) 250px, 280px"
                      className="w-[250px] sm:w-[280px] h-auto rounded-[1.45rem]"
                    />
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="section-padding bg-canvas">
        <div className="container-max">
          <div className="max-w-2xl">
            <h2 className="heading-md text-ink mb-4">Ce qui n’existe pas encore</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Autant le dire ici plutôt que de vous laisser le découvrir :
              il n’y a pas encore de widget, pas d’application sur montre,
              pas d’import depuis un ticket de caisse. Le délai de rappel
              n’est pas réglable et la synchronisation n’est pas en temps réel.
              SmartFridge est une application {PLATFORM.name} — il n’y a pas
              de version iOS à ce stade.
            </p>
            <Link
              href="/pricing"
              prefetch
              className="inline-flex items-center gap-2 text-primary-700 font-semibold hover:text-primary-800 transition-colors"
            >
              Voir les tarifs
              <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
