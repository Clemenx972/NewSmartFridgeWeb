import { CTAButton } from '@/components/ui/CTAButton'
import { ADEME_WASTE, PLATFORM } from '@/lib/constants'

export function CTABanner() {
  return (
    <section className="section-padding bg-white" aria-labelledby="cta-heading">
      <div className="container-max">
        <div className="bg-gradient-hero rounded-3xl px-8 py-14 sm:px-14 sm:py-20 text-center">
          <h2 id="cta-heading" className="heading-lg text-white mb-5 max-w-2xl mx-auto">
            {ADEME_WASTE.perHouseholdPerYear} par an, ça se récupère.
          </h2>
          <p className="text-white/70 text-lg mb-9 max-w-xl mx-auto leading-relaxed">
            SmartFridge sort bientôt sur {PLATFORM.name}. Laissez votre email,
            on vous prévient le jour du lancement — rien d’autre.
          </p>
          <CTAButton
            href="/contact"
            size="lg"
            className="bg-white !text-ink hover:bg-white/90"
            ariaLabel="Être prévenu du lancement de SmartFridge"
          >
            Être prévenu du lancement
          </CTAButton>
          <p className="text-white/40 text-sm mt-5">
            Un seul email, à la sortie. Pas de newsletter.
          </p>
        </div>
      </div>
    </section>
  )
}
