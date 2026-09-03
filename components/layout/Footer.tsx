import Link from 'next/link'
import Image from 'next/image'
import { SITE_NAME, INFRA } from '@/lib/constants'

const footerLinks = {
  Produit: [
    { href: '/features', label: 'Fonctionnalités' },
    { href: '/pricing',  label: 'Tarifs'          },
  ],
  Légal: [
    { href: '/privacy', label: 'Confidentialité' },
    { href: '/terms',   label: 'Conditions d’utilisation' },
  ],
  Contact: [
    { href: '/contact',  label: 'Nous écrire' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-ink text-white/70 border-t border-white/10">
      <div className="container-max section-padding py-14">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">

          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt=""
                width={512}
                height={512}
                loading="lazy"
                sizes="32px"
                className="w-8 h-8"
              />
              <span className="text-lg font-bold text-white">{SITE_NAME}</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Suivez votre frigo, cuisinez ce qui presse, jetez moins.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <nav key={category} aria-label={category}>
              <h2 className="text-white font-semibold text-sm mb-4">{category}</h2>
              <ul className="space-y-2.5 list-none p-0 m-0">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      prefetch
                      className="text-sm hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-sm">
            © {new Date().getFullYear()} {SITE_NAME}
          </p>
          <p className="text-xs text-white/45">
            Données hébergées aux {INFRA.regionShort} · Paiements {INFRA.payments}
          </p>
        </div>
      </div>
    </footer>
  )
}
