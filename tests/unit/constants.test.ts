import { describe, it, expect } from 'vitest'
import {
  PLANS, NAV_LINKS, SITE_URL, BILLING, APP_LIMITS, INFRA, ADEME_WASTE,
  APP_IS_PUBLISHED, PLATFORM, SITE_DESCRIPTION,
} from '@/lib/constants'
import { faqs } from '@/lib/faq'

/**
 * These tests lock the site to what the application actually does.
 * Every value below was verified against the app's source in
 * FONCTIONNALITES_PROMISES.md. If a test fails, either the app changed
 * (update both) or someone reintroduced a claim we cannot back.
 */

describe('PLANS — prices match the app, not the old marketing page', () => {
  it('prices Premium at 2,99 € and Diamant at 4,99 €', () => {
    expect(PLANS.standard.price).toBe(0)
    expect(PLANS.premium.price).toBe(2.99)
    expect(PLANS.diamant.price).toBe(4.99)
  })

  it('never reintroduces the old 3,99 / 5,99 prices', () => {
    const prices = Object.values(PLANS).map((p) => p.price)
    expect(prices).not.toContain(3.99)
    expect(prices).not.toContain(5.99)
  })

  it('names the top tier Diamant, as the app does', () => {
    expect(PLANS.diamant.name).toBe('Diamant')
    expect(Object.values(PLANS).map((p) => p.name)).not.toContain('Elite')
  })

  it('writes prices in French format', () => {
    expect(PLANS.premium.priceLabel).toContain(',')
    expect(PLANS.diamant.priceLabel).toContain(',')
  })
})

describe('BILLING — essai de 7 jours, pas d’offre annuelle', () => {
  it('propose un essai de 7 jours', () => {
    expect(BILLING.hasFreeTrial).toBe(true)
    expect(BILLING.trialDays).toBe(7)
  })

  it('indique que la carte est requise', () => {
    // L'essai demande une carte : le site doit le dire, jamais le taire.
    expect(BILLING.trialRequiresCard).toBe(true)
  })

  it('n’annonce pas d’offre annuelle tant qu’elle n’existe pas dans Stripe', () => {
    expect(BILLING.hasAnnualPlan).toBe(false)
  })

  it('facture via Stripe', () => {
    expect(BILLING.provider).toBe('Stripe')
  })
})

describe('APP_LIMITS — real limits, not aspirational ones', () => {
  it('caps a household at 3 invited members', () => {
    expect(APP_LIMITS.householdMembers).toBe(3)
  })

  it('fixes the expiry reminder at 3 days', () => {
    expect(APP_LIMITS.expiryReminderDays).toBe(3)
  })
})

describe('INFRA — hosting is disclosed honestly', () => {
  it('states United States hosting, not EU', () => {
    expect(INFRA.region).toMatch(/États-Unis/)
    expect(INFRA.region).not.toMatch(/Francfort|Frankfurt/)
  })

  it('names the AI provider that receives free-text input', () => {
    expect(INFRA.aiProvider).toBeTruthy()
  })
})

describe('Social proof — nothing is claimed before launch', () => {
  it('marks the app as unpublished', () => {
    expect(APP_IS_PUBLISHED).toBe(false)
  })

  it('exposes no download count, rating or review count', async () => {
    const constants = await import('@/lib/constants')
    for (const key of ['SOCIAL_PROOF', 'DOWNLOADS', 'RATING', 'REVIEWS']) {
      expect(constants).not.toHaveProperty(key)
    }
  })

  it('sources the only public figure it shows', () => {
    expect(ADEME_WASTE.source).toMatch(/ADEME/)
    expect(ADEME_WASTE.sourceUrl.startsWith('https://')).toBe(true)
  })
})

describe('PLATFORM — Android uniquement, aucune promesse iOS', () => {
  it('cible Android', () => {
    expect(PLATFORM.name).toBe('Android')
  })

  it('ne promet iOS nulle part dans la description du site', () => {
    // Annoncer une plateforme qui n'arrive pas génère de la déception et des
    // avis négatifs. Tant qu'iOS n'existe pas, le site n'en parle pas.
    expect(SITE_DESCRIPTION).not.toMatch(/iOS|iPhone|App Store/i)
  })

  it('ne promet iOS nulle part dans la FAQ', () => {
    const all = faqs.map((f) => `${f.question} ${f.answer}`).join(' ')
    // « pas de version iOS » est une formulation honnête et autorisée ;
    // ce qui est interdit, c'est de l'annoncer comme disponible ou à venir.
    expect(all).not.toMatch(/bientôt sur iOS|disponible sur iOS|iOS et Android/i)
  })
})

describe('NAV_LINKS', () => {
  it('uses internal absolute paths', () => {
    for (const link of NAV_LINKS) {
      expect(link.href.startsWith('/')).toBe(true)
      expect(link.label).toBeTruthy()
    }
  })

  it('has no duplicate destinations', () => {
    const hrefs = NAV_LINKS.map((l) => l.href)
    expect(new Set(hrefs).size).toBe(hrefs.length)
  })
})

describe('SITE_URL', () => {
  it('is https and has no trailing slash', () => {
    expect(SITE_URL.startsWith('https://')).toBe(true)
    expect(SITE_URL.endsWith('/')).toBe(false)
  })
})

describe('FAQ — feeds both the accordion and the FAQPage markup', () => {
  it('has a question and an answer for every entry', () => {
    expect(faqs.length).toBeGreaterThan(0)
    for (const faq of faqs) {
      expect(faq.question.trim().length).toBeGreaterThan(5)
      expect(faq.answer.trim().length).toBeGreaterThan(20)
    }
  })

  it('has no duplicate questions', () => {
    const questions = faqs.map((f) => f.question)
    expect(new Set(questions).size).toBe(questions.length)
  })

  it('dit que l’essai demande une carte bancaire', () => {
    // Un essai « gratuit » qui débite au 8e jour sans l'avoir annoncé est le
    // premier motif de litige. La FAQ doit mentionner la carte explicitement.
    const all = faqs.map((f) => f.answer).join(' ').toLowerCase()
    expect(all).toMatch(/carte/)
  })

  it('n’annonce pas d’offre annuelle', () => {
    const all = faqs.map((f) => f.answer).join(' ').toLowerCase()
    expect(all).not.toMatch(/par an|annuel/)
  })

  it('discloses where data is hosted', () => {
    const all = faqs.map((f) => f.answer).join(' ')
    expect(all).toMatch(/États-Unis/)
  })
})
