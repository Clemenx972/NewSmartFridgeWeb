/**
 * Source de vérité du site.
 *
 * Chaque valeur ici a été vérifiée contre le code de l'application
 * (voir FONCTIONNALITES_PROMISES.md, rempli le 2 septembre 2026).
 * Ne rien ajouter ici qui ne soit pas vrai dans l'app.
 */

// ─── Stores ──────────────────────────────────────────────────────────────────
// L'application n'est pas encore publiée. Tant que ces URLs ne sont pas
// réelles, les boutons de téléchargement doivent renvoyer vers la liste
// d'attente, pas vers une page de store inexistante.
export const APP_IS_PUBLISHED = false
export const APP_STORE_URL = ''
export const PLAY_STORE_URL = ''

export const SITE_NAME = 'SmartFridge'
export const SITE_URL = 'https://smartfridge.app'
export const SITE_DESCRIPTION =
  'Suivez ce que contient votre frigo, recevez un rappel avant que ça périme et cuisinez ce qui doit partir en premier. Application Android.'

// L'application est développée et testée sur Android. iOS n'est pas au programme
// de cette version : ne rien promettre que l'application ne tienne.
export const PLATFORM = {
  name: 'Android',
  requirement: 'Android 8 et versions ultérieures',
} as const

// ─── Repère externe ──────────────────────────────────────────────────────────
// Le seul chiffre affichable aujourd'hui : il vient d'une source publique,
// pas de nos propres mesures.
export const ADEME_WASTE = {
  perHouseholdPerYear: '465 €',
  perPersonPerYear: '30 kg',
  source: 'ADEME, 2023',
  sourceUrl: 'https://www.ademe.fr',
} as const

// ─── Formules ────────────────────────────────────────────────────────────────
// Prix et noms alignés sur PricingScreen.kt et la configuration Stripe.
// Aucune période d'essai n'existe : ne pas en promettre.
export const PLANS = {
  standard: {
    name: 'Standard',
    price: 0,
    priceLabel: 'Gratuit',
    tagline: 'Pour commencer, sans limite de durée.',
  },
  premium: {
    name: 'Premium',
    price: 2.99,
    priceLabel: '2,99 €/mois',
    tagline: 'Synchronisation entre appareils et IA étendue.',
  },
  diamant: {
    name: 'Diamant',
    price: 4.99,
    priceLabel: '4,99 €/mois',
    tagline: 'Partage du foyer, recettes et scan photo par IA.',
  },
} as const

export const BILLING = {
  provider: 'Stripe',
  cancelPath: 'Réglages → Mon abonnement → Résilier',

  // Essai livré le 3 septembre 2026 : 7 jours sur Premium comme Diamant.
  // La carte est enregistrée à l'inscription et débitée au 8e jour.
  hasFreeTrial: true,
  trialDays: 7,
  trialRequiresCard: true,

  // Les tarifs annuels (29,90 € et 49,90 €) existent dans l'application mais
  // ne sont PAS actifs tant que les prix ne sont pas créés dans Stripe.
  // Ne rien annoncer sur le site avant confirmation.
  hasAnnualPlan: false,
} as const

// ─── Limites réelles de l'application ────────────────────────────────────────
export const APP_LIMITS = {
  householdMembers: 3, // + le propriétaire
  expiryReminderDays: 3, // fixe, non réglable
  photoMaxMb: 5,
  photoFormats: 'JPG, PNG, WebP',
  freeInputChars: 500,
} as const

// ─── Infrastructure (à afficher tel quel sur /security et /privacy) ──────────
export const INFRA = {
  database: 'Supabase',
  region: 'États-Unis (Oregon)',
  regionShort: 'États-Unis',
  aiProvider: 'Google Gemini',
  aiNote: "Les saisies libres sont envoyées à notre serveur puis à un fournisseur d'IA pour analyse.",
  payments: 'Stripe',
  authEmails: 'Supabase Auth',
} as const

export const NAV_LINKS = [
  { href: '/',          label: 'Accueil'         },
  { href: '/features',  label: 'Fonctionnalités' },
  { href: '/pricing',   label: 'Tarifs'          },
  { href: '/security',  label: 'Confidentialité' },
  { href: '/contact',   label: 'Contact'         },
] as const
