import { ADEME_WASTE, APP_LIMITS } from '@/lib/constants'

/**
 * Le raisonnement produit, en trois temps.
 *
 * Cette section existe pour une présentation : elle explique le besoin,
 * l'impasse dans laquelle tombent les applications concurrentes, et la
 * contrainte de conception qui en découle. C'est le seul endroit du site
 * qui raconte *pourquoi* l'application est faite comme elle est faite.
 */

const steps = [
  {
    n: '01',
    label: 'Le constat',
    title: 'On ne jette pas par négligence. On jette parce qu’on oublie.',
    body: `Un foyer français jette ${ADEME_WASTE.perHouseholdPerYear} de nourriture par an, environ ${ADEME_WASTE.perPersonPerYear} par personne. L’essentiel ne part pas à la poubelle par gaspillage volontaire : il part parce que personne ne sait ce qu’il y a au fond du frigo, ni depuis quand.`,
    aside: `${ADEME_WASTE.source}`,
  },
  {
    n: '02',
    label: 'L’impasse',
    title: 'Une application d’inventaire meurt de sa propre saisie.',
    body: 'C’est le point de rupture de toute cette catégorie de produits. Une application qui demande de saisir chaque achat à la main fonctionne une semaine. À la troisième course non saisie, l’inventaire ne correspond plus au frigo réel — il affiche ce qui a été mangé, ignore ce qui vient d’être acheté. À ce moment précis, l’utilisateur désinstalle.',
    aside: 'Le vrai concurrent n’est pas une autre application : c’est le fait de ne rien noter du tout.',
  },
  {
    n: '03',
    label: 'La contrainte',
    title: 'Rendre l’ajout plus rapide que le fait de ne rien faire.',
    body: 'Toute la conception découle d’une seule règle : si enregistrer une course demande plus de quelques secondes, personne ne le fera. Ce n’est pas une préférence esthétique, c’est la condition de survie du produit. Chaque décision d’interface a été prise contre cette contrainte.',
    aside: null,
  },
]

const answers = [
  {
    q: 'Comment enregistrer dix articles en une fois ?',
    a: 'On dicte la phrase telle qu’on la dirait : « 2 yaourts nature, 500 g de jambon et 1 L de lait ». Le texte est découpé en articles, avec quantité, unité et durée de conservation estimée. Chaque champ reste corrigeable.',
  },
  {
    q: 'Comment enregistrer un produit emballé sans rien taper ?',
    a: 'Le code-barres suffit. Le nom et la photo sont récupérés automatiquement, il ne reste qu’à confirmer. C’est gratuit et illimité, parce que c’est ce qui rend l’application utilisable dès le premier jour.',
  },
  {
    q: 'Comment éviter de ressaisir la date de péremption ?',
    a: 'Elle est proposée d’après le type d’aliment, et modifiable. Une durée approximative que l’on corrige vaut mieux qu’un champ vide que l’on saute.',
  },
  {
    q: 'Savoir ce qu’on a suffit-il à ne plus jeter ?',
    a: `Non — et c’est la deuxième moitié du problème. Un inventaire à jour ne sert à rien si personne ne le consulte. L’application prévient donc ${APP_LIMITS.expiryReminderDays} jours avant la date, et propose une recette qui utilise précisément l’aliment le plus urgent. Le rappel dit quoi faire, pas seulement quoi regretter.`,
  },
]

export function Approach() {
  return (
    <section className="section-padding bg-white" aria-labelledby="approach-heading">
      <div className="container-max">

        <div className="max-w-2xl mb-14">
          <span className="section-label">La démarche</span>
          <h2 id="approach-heading" className="heading-lg text-ink mt-3 mb-5">
            Pourquoi l’application est faite comme ça.
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Le problème n’était pas de construire un inventaire. C’était de faire
            en sorte que quelqu’un le tienne à jour.
          </p>
        </div>

        {/* Le raisonnement, en trois temps */}
        <ol className="grid md:grid-cols-3 gap-5 list-none p-0 m-0 mb-16">
          {steps.map((step) => (
            <li
              key={step.n}
              className="border border-gray-200 rounded-2xl p-7 flex flex-col gap-4 bg-canvas"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-primary-300 tabular-nums" aria-hidden="true">
                  {step.n}
                </span>
                <span className="text-xs font-semibold tracking-[0.08em] uppercase text-primary-700">
                  {step.label}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-ink leading-snug">{step.title}</h3>
              <p className="text-gray-600 text-[15px] leading-relaxed flex-grow">{step.body}</p>
              {step.aside && (
                <p className="text-gray-500 text-xs leading-relaxed pt-3 border-t border-gray-200">
                  {step.aside}
                </p>
              )}
            </li>
          ))}
        </ol>

        {/* Les décisions qui en découlent */}
        <div className="max-w-3xl">
          <h3 className="section-label mb-7">
            Les quatre questions qu’il a fallu résoudre
          </h3>

          <dl className="flex flex-col border-t border-gray-200">
            {answers.map((item) => (
              <div key={item.q} className="py-7 border-b border-gray-200">
                <dt className="text-ink font-semibold mb-3 text-lg leading-snug">{item.q}</dt>
                <dd className="text-gray-600 leading-relaxed m-0">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
