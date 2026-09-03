import { ADEME_WASTE } from '@/lib/constants'

const steps = [
  {
    n: '01',
    title: 'Vous remplissez le frigo',
    text: 'Dictez votre course, scannez un code-barres ou saisissez à la main. Chaque article reçoit une date estimée que vous pouvez corriger.',
  },
  {
    n: '02',
    title: 'L’app surveille les dates',
    text: 'Un rappel arrive trois jours avant péremption. Les articles proches de leur date remontent en haut de la liste.',
  },
  {
    n: '03',
    title: 'Vous cuisinez ce qui presse',
    text: 'L’onglet Recettes propose un plat qui utilise l’aliment le plus urgent. Ce que vous cuisinez sort du stock.',
  },
]

export function ValueProps() {
  return (
    <section className="section-padding bg-canvas" aria-labelledby="how-heading">
      <div className="container-max">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 items-start">

          <div className="lg:sticky lg:top-28">
            <span className="section-label">Comment ça marche</span>
            <h2 id="how-heading" className="heading-lg text-ink mt-3 mb-5">
              Trois gestes, et le gaspillage baisse.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Un foyer français jette en moyenne{' '}
              <strong className="text-ink font-semibold">{ADEME_WASTE.perHouseholdPerYear}</strong>{' '}
              de nourriture par an, soit environ {ADEME_WASTE.perPersonPerYear} par personne.
              L’essentiel part parce qu’on oublie ce qu’on a.
            </p>
          </div>

          <ol className="flex flex-col gap-0 list-none p-0 m-0">
            {steps.map((step, i) => (
              <li
                key={step.n}
                className={`flex gap-6 py-8 ${i !== steps.length - 1 ? 'border-b border-gray-200' : ''}`}
              >
                <span
                  className="text-4xl font-bold text-gray-200 leading-none flex-shrink-0 tabular-nums"
                  aria-hidden="true"
                >
                  {step.n}
                </span>
                <div>
                  <h3 className="heading-sm text-ink mb-2">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
