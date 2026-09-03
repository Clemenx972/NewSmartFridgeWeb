import Image from 'next/image'
import { Bell, Mic, ScanBarcode, ChevronDown, Smartphone } from 'lucide-react'
import { CTAButton } from '@/components/ui/CTAButton'
import { ADEME_WASTE, APP_LIMITS, PLATFORM } from '@/lib/constants'

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero"
      aria-label="Présentation de SmartFridge"
    >
      {/* Ambient wash — one radial, no network request */}
      <div
        className="absolute -top-60 -right-40 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(10,124,212,0.18) 0%, rgba(11,34,51,0) 65%)',
        }}
        aria-hidden="true"
      />

      <div className="container-max section-padding pt-28 sm:pt-32 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Copy */}
          <div className="text-center lg:text-left">
            <p className="inline-flex items-center gap-2 border border-white/20 rounded-full px-4 py-1.5 mb-7 text-sm text-white/85">
              <Smartphone className="w-3.5 h-3.5" strokeWidth={1.8} aria-hidden="true" />
              Application {PLATFORM.name}
            </p>

            {/* Pas de <br> forcé : text-wrap: balance (globals.css) équilibre les
                lignes à toutes les largeurs, sans orpheliner le dernier mot. */}
            <h1 className="heading-xl text-white mb-6">
              Un foyer jette{' '}
              <span className="text-primary-300">{ADEME_WASTE.perHouseholdPerYear}</span>{' '}
              de nourriture par an.
            </h1>

            <p className="text-lg sm:text-xl text-white/75 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              SmartFridge suit ce que contient votre frigo, vous rappelle ce qui
              approche de sa date, et vous propose quoi cuisiner avec ce qui doit
              partir en premier.
            </p>

            {/* What the app actually does, in three verified points */}
            <ul className="flex flex-col gap-3 mb-9 text-left max-w-md mx-auto lg:mx-0">
              <li className="flex items-start gap-3 text-white/85">
                <Mic className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary-300" strokeWidth={1.6} aria-hidden="true" />
                <span className="text-[15px]">
                  Dictez «&nbsp;2 yaourts et 500&nbsp;g de jambon&nbsp;», l’app crée les articles
                </span>
              </li>
              <li className="flex items-start gap-3 text-white/85">
                <ScanBarcode className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary-300" strokeWidth={1.6} aria-hidden="true" />
                <span className="text-[15px]">
                  Scannez un code-barres : nom et photo pré-remplis
                </span>
              </li>
              <li className="flex items-start gap-3 text-white/85">
                <Bell className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary-300" strokeWidth={1.6} aria-hidden="true" />
                <span className="text-[15px]">
                  Un rappel {APP_LIMITS.expiryReminderDays} jours avant la date de péremption
                </span>
              </li>
            </ul>

            {/* Les deux destinations qui comptent : ce que fait l'app, et son prix. */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <CTAButton href="/features" size="lg" ariaLabel="Découvrir les fonctionnalités">
                Ce que fait l’application
              </CTAButton>
              <CTAButton href="/pricing" variant="outline-white" size="lg">
                Voir les tarifs
              </CTAButton>
            </div>

            <p className="text-white/40 text-xs mt-6">
              {ADEME_WASTE.perHouseholdPerYear} par foyer et par an —{' '}
              <a
                href={ADEME_WASTE.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-white/70 transition-colors"
              >
                {ADEME_WASTE.source}
              </a>
            </p>
          </div>

          {/* The real app, in a device frame */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative rounded-[2.4rem] bg-[#0B1A22] p-3 border border-white/10 shadow-device">
              <Image
                src="/screenshots/app-frigo.png"
                alt="Écran principal de SmartFridge : les onglets Frigo, Congélateur et Placard, avec quatre aliments et le nombre de jours avant péremption."
                width={1080}
                height={2400}
                priority
                sizes="(max-width: 1024px) 260px, 300px"
                className="w-[260px] sm:w-[300px] h-auto rounded-[1.9rem]"
              />
            </div>
            <p className="text-white/35 text-xs">Capture réelle de l’application</p>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce text-white/40"
        aria-hidden="true"
      >
        <span className="text-xs tracking-[0.15em] uppercase">Découvrir</span>
        <ChevronDown className="w-5 h-5" strokeWidth={2} />
      </div>
    </section>
  )
}
