import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Mic, ScanBarcode, Bell, ShoppingCart, ChefHat, Users, ArrowRight } from 'lucide-react'
import { Approach } from '@/components/sections/Approach'
import { APP_LIMITS, PLANS, INFRA, PLATFORM } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Fonctionnalités — Saisie dictée, scan, rappels et parcours magasin',
  description:
    'Ce que fait SmartFridge : scan de code-barres, saisie en langage naturel, rappels de péremption, liste de courses rangée par rayon, recettes à partir du stock et partage du foyer.',
  alternates: { canonical: '/features' },
  openGraph: {
    title: 'Fonctionnalités SmartFridge',
    description:
      'Scan de code-barres, rappels de péremption, liste de courses dans l’ordre des rayons, recettes à partir de ce qui reste.',
    url: '/features',
  },
}

const pillars = [
  {
    Icon: ScanBarcode,
    title: 'Scan de code-barres',
    lead: 'Un produit emballé, deux secondes.',
    body: 'Le lecteur intégré identifie le produit et récupère son nom et sa photo depuis Open Food Facts. Vous confirmez la quantité et la date, c’est tout. Gratuit et illimité sur toutes les formules — c’est ce qui rend l’application utilisable dès le premier jour.',
    points: [
      'Aucune permission caméra supplémentaire',
      'Nom et visuel pré-remplis',
      'Base Open Food Facts',
    ],
  },
  {
    Icon: Mic,
    title: 'Saisie en langage naturel',
    tier: PLANS.diamant.name,
    lead: 'Décrivez votre course, l’app la range.',
    body: `Écrivez ou dictez jusqu’à ${APP_LIMITS.freeInputChars} caractères. Le texte part vers notre serveur puis vers ${INFRA.aiProvider}, qui le découpe en articles avec un nom, une quantité, une unité et une durée de conservation estimée. Chaque champ reste modifiable avant enregistrement.`,
    points: [
      'Dictée vocale',
      'Unités reconnues : u, g, kg, ml, L',
      'Rangement suggéré (froid, congelé, ambiant)',
      'Repli hors-ligne sur un dictionnaire embarqué',
      'Scan de ticket de caisse : chaque ligne devient un article',
    ],
    screenshot: '/screenshots/app-saisie.png',
    screenshotAlt:
      'Écran de saisie : le texte « 2 yaourts nature, 500 g de jambon et 1 L de lait » est analysé et deux articles apparaissent avec leurs champs modifiables.',
  },
  {
    Icon: Bell,
    title: 'Rappels de péremption',
    lead: `Prévenu ${APP_LIMITS.expiryReminderDays} jours avant.`,
    body: `Une vérification quotidienne repère ce qui approche de sa date et envoie une notification ${APP_LIMITS.expiryReminderDays} jours avant. Le calcul se fait sur l’appareil : le rappel fonctionne sans connexion. Les articles concernés remontent en haut de la liste.`,
    points: [
      `Délai fixé à ${APP_LIMITS.expiryReminderDays} jours (non réglable pour l’instant)`,
      'Badge « Stock faible » adapté au nombre de personnes nourries',
      'Widget d’écran d’accueil : les 3 ou 5 aliments les plus critiques',
    ],
  },
  {
    Icon: ShoppingCart,
    title: 'Liste de courses et parcours magasin',
    lead: 'Votre liste dans l’ordre des rayons.',
    body: 'Deux vues. La vue Liste rassemble ce qui manque, ce qui s’épuise et ce qui va périmer. La vue Panier réorganise tout par rayon, dans l’ordre du parcours en magasin, de l’entrée aux caisses — vous cochez au fur et à mesure sans revenir sur vos pas.',
    points: [
      'Rayons numérotés dans l’ordre du magasin',
      'Compteur d’articles prioritaires et de compléments de stock',
      'Détection automatique de ce qui s’épuise',
      'Ajout manuel toujours possible',
    ],
    screenshot: '/screenshots/app-panier.png',
    screenshotAlt:
      'Écran Panier : la liste rangée par rayon numéroté — pâtes et féculents à l’entrée, puis crèmerie, charcuterie, et fruits et légumes près des caisses.',
  },
  {
    Icon: ChefHat,
    title: 'Recettes',
    lead: 'Quoi faire avec ce qui presse.',
    body: `La carte du haut propose un plat qui utilise l’aliment le plus proche de sa date. En dessous, des idées à partir de votre stock. « Démarrer la recette » déduit les quantités utilisées. La génération de recettes par IA est réservée à la formule ${PLANS.diamant.name}.`,
    points: [
      'Recette prioritaire selon les péremptions',
      'Idées de la semaine',
      'Vos propres recettes',
      'Déduction automatique du stock',
    ],
    screenshot: '/screenshots/app-recettes.png',
    screenshotAlt:
      'Écran Recettes : une carte « À cuisiner ce soir » propose un sandwich jambon fromage en 5 minutes, suivie des idées de la semaine.',
  },
  {
    Icon: Users,
    title: 'Partage du foyer',
    tier: PLANS.diamant.name,
    lead: `Jusqu’à ${APP_LIMITS.householdMembers + 1} personnes.`,
    body: 'Invitez les membres de votre foyer par email. Chacun voit le même stock et la même liste, tout en gardant son propre compte — donc ses régimes, ses allergies et ses recettes.',
    points: [
      `${APP_LIMITS.householdMembers} membres invités + le propriétaire`,
      'Stock et liste partagés',
      'Alertes allergènes propres à chacun',
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
          {pillars.map(({ Icon, title, tier, lead, body, points, screenshot, screenshotAlt }, index) => (
            <article
              key={title}
              className={screenshot ? 'grid lg:grid-cols-2 gap-12 lg:gap-16 items-center' : 'max-w-3xl'}
            >
              <div className={screenshot && index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="flex items-center gap-3 mb-5">
                  <Icon className="w-7 h-7 text-primary-600" strokeWidth={1.5} aria-hidden="true" />
                  {tier && (
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 border border-gray-300 rounded-full px-2.5 py-1">
                      Formule {tier}
                    </span>
                  )}
                </div>
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

      {/* Le raisonnement produit — déplacé ici depuis l'accueil */}
      <Approach />

      <section className="section-padding bg-canvas">
        <div className="container-max">
          <div className="max-w-2xl">
            <h2 className="heading-md text-ink mb-4">Ce qui n’existe pas encore</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Autant le dire ici plutôt que de vous laisser le découvrir : pas
              d’application sur montre, pas d’import automatique depuis un ticket
              hors formule {PLANS.diamant.name}. Le délai de rappel n’est pas
              réglable et la synchronisation n’est pas en temps réel.
              SmartFridge est une application {PLATFORM.name} — il n’y a pas de
              version iOS à ce stade.
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
