import Link from 'next/link'
import { Lock, Trash2, Sparkles, Server, ArrowRight } from 'lucide-react'
import { INFRA } from '@/lib/constants'

const facts = [
  {
    Icon: Lock,
    title: 'Chiffré au repos et en transit',
    text: 'Les données sont chiffrées côté serveur (AES-256) et transitent en HTTPS. Votre session est stockée chiffrée sur l’appareil.',
  },
  {
    Icon: Trash2,
    title: 'Suppression immédiate',
    text: 'Réglages → Supprimer mon compte. La base et le compte sont effacés tout de suite, pas « sous 30 jours ».',
  },
  {
    Icon: Sparkles,
    title: 'Ce que voit l’IA',
    text: 'Seul le texte que vous dictez part vers notre serveur puis vers Google Gemini pour être analysé. Le reste de votre inventaire ne sort pas.',
  },
  {
    Icon: Server,
    title: `Serveurs aux ${INFRA.regionShort}`,
    text: 'Notre base est hébergée en Oregon. C’est un transfert hors Union européenne, encadré par les clauses contractuelles types.',
  },
]

export function TrustBadges() {
  return (
    <section className="section-padding bg-ink text-white" aria-labelledby="trust-heading">
      <div className="container-max">
        <div className="mb-12 max-w-2xl">
          <span className="text-xs font-semibold tracking-[0.1em] uppercase text-primary-300">
            Confidentialité
          </span>
          <h2 id="trust-heading" className="heading-lg text-white mt-3 mb-5">
            Ce qu’on fait de vos données, sans enrobage.
          </h2>
          <p className="text-white/70 text-lg leading-relaxed">
            Vos courses ne sont revendues à personne et il n’y a aucune publicité
            dans l’application. Voici les quatre points qui méritent d’être dits
            noir sur blanc.
          </p>
        </div>

        <ul className="grid sm:grid-cols-2 gap-4 list-none p-0 m-0">
          {facts.map(({ Icon, title, text }) => (
            <li
              key={title}
              className="flex items-start gap-4 p-6 bg-white/[0.04] rounded-2xl border border-white/10"
            >
              <Icon className="w-6 h-6 text-white flex-shrink-0 mt-0.5" strokeWidth={1.5} aria-hidden="true" />
              <div>
                <h3 className="font-semibold text-white mb-1.5">{title}</h3>
                <p className="text-white/65 text-[15px] leading-relaxed">{text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link
            href="/security"
            prefetch
            className="inline-flex items-center gap-2 text-primary-300 font-semibold hover:text-primary-200 transition-colors"
          >
            Le détail complet
            <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
