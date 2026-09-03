import Image from 'next/image'

const screens = [
  {
    src: '/screenshots/app-saisie.png',
    alt: "Écran de saisie de SmartFridge : le texte « 2 yaourts nature, 500 g de jambon et 1 L de lait » a été analysé et deux articles apparaissent avec nom, quantité, unité et jours avant péremption modifiables.",
    title: 'Vous décrivez, l’app remplit',
    text: 'Le texte est découpé en articles. Nom, quantité, unité et date sont pré-remplis et restent modifiables avant d’enregistrer.',
  },
  {
    src: '/screenshots/app-recettes.png',
    alt: "Écran Recettes de SmartFridge : une carte « À cuisiner ce soir » propose un sandwich jambon fromage en 5 minutes utilisant un ingrédient du frigo, suivie d'idées de la semaine.",
    title: 'Une recette pour ce qui presse',
    text: 'La carte du haut utilise l’aliment le plus proche de sa date. En dessous, des idées à partir de ce que vous avez déjà.',
  },
  {
    src: '/screenshots/app-panier.png',
    alt: 'Écran Panier de SmartFridge : la liste de courses rangée par rayon numéroté — pâtes et féculents à l’entrée, puis crèmerie, charcuterie, et fruits et légumes près des caisses.',
    title: 'Et dans l’ordre du magasin',
    text: 'La vue Panier trie vos articles par rayon, de l’entrée aux caisses. Vous cochez au fur et à mesure, sans revenir sur vos pas.',
  },
]

export function AppTour() {
  return (
    <section className="section-padding bg-canvas" aria-labelledby="app-tour-heading">
      <div className="container-max">
        <div className="mb-12 max-w-2xl">
          <span className="section-label">L’application</span>
          <h2 id="app-tour-heading" className="heading-lg text-ink mt-3">
            Trois écrans, rien de caché.
          </h2>
          <p className="mt-4 text-gray-600 text-lg leading-relaxed">
            Ce sont des captures réelles, pas des maquettes.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 list-none p-0 m-0">
          {screens.map((screen) => (
            <li key={screen.src} className="flex flex-col">
              <div className="rounded-[1.9rem] bg-ink p-2.5 border border-gray-800 shadow-device self-center">
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  width={1080}
                  height={2400}
                  loading="lazy"
                  sizes="(max-width: 768px) 240px, (max-width: 1024px) 200px, 260px"
                  className="w-[240px] lg:w-[260px] h-auto rounded-[1.45rem]"
                />
              </div>
              <h3 className="heading-sm text-ink mt-7 mb-2">{screen.title}</h3>
              <p className="text-gray-600 leading-relaxed">{screen.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
