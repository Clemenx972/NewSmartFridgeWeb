# SmartFridge Web — Récapitulatif des pages

## Structure du projet

```
smartfridge-web/
├── app/                            ← App Router Next.js 14
│   ├── layout.tsx                  ← Layout racine (Header + Footer + JSON-LD + Prefetcher + ScrollReveal)
│   ├── globals.css                 ← Tailwind + classes utilitaires + animations scroll reveal
│   ├── page.tsx                    ← Page d'accueil (/)
│   ├── not-found.tsx               ← Page 404 branded
│   ├── sitemap.ts                  ← Sitemap XML généré automatiquement
│   ├── features/page.tsx           ← Page Fonctionnalités (/features)
│   ├── pricing/page.tsx            ← Page Tarification (/pricing)
│   ├── security/page.tsx           ← Page Sécurité (/security)
│   ├── privacy/page.tsx            ← Politique de confidentialité (/privacy)
│   ├── terms/page.tsx              ← CGU (/terms)
│   ├── contact/
│   │   ├── layout.tsx              ← Metadata pour la page contact (Server Component)
│   │   └── page.tsx                ← Formulaire de contact (/contact) — "use client"
│   └── api/
│       └── contact/route.ts        ← API POST /api/contact (envoi email via Resend)
├── components/
│   ├── layout/
│   │   ├── Header.tsx              ← Navbar sticky responsive + menu mobile
│   │   └── Footer.tsx              ← Footer avec liens, store badges, mentions légales
│   ├── sections/                   ← Sections de la page d'accueil
│   │   ├── Hero.tsx                ← Section hero + mockup app + stats
│   │   ├── ValueProps.tsx          ← 3 piliers (gaspillage, IA, partage familial)
│   │   ├── FeaturesGrid.tsx        ← Grille des 6 fonctionnalités
│   │   ├── Testimonials.tsx        ← Témoignages (placeholder — voir lib/placeholder.ts)
│   │   ├── TrustBadges.tsx         ← Section sécurité dark (6 badges RGPD/crypto)
│   │   ├── FAQ.tsx                 ← Accordéon FAQ (8 questions/réponses)
│   │   └── CTABanner.tsx           ← Bandeau CTA final
│   └── ui/
│       ├── CTAButton.tsx           ← Bouton CTA réutilisable (smart iOS/Android detect)
│       ├── Prefetcher.tsx          ← Précharge toutes les pages en arrière-plan
│       └── ScrollReveal.tsx        ← Animations d'entrée au scroll (IntersectionObserver)
├── lib/
│   ├── cn.ts                       ← Utilitaire classname (clsx + tailwind-merge)
│   ├── constants.ts                ← URLs stores, plans tarifaires, social proof, nav links
│   └── placeholder.ts             ← ⚠️ CONTENU PROVISOIRE (témoignages, mockup app)
├── public/                         ← Assets statiques (favicon, og-image, etc. — à ajouter)
├── middleware.ts                   ← Headers sécurité OWASP + HTTPS redirect
├── .env.local                      ← Secrets (RESEND_API_KEY — jamais committé)
├── next.config.mjs                 ← Webpack polling HMR + optimisation images + cache
├── tailwind.config.ts              ← Palette custom + gradient-hero
├── INFOS_A_REMPLIR.md              ← Guide pour remplir les vraies données de l'app
└── PAGES_RECAP.md                  ← Ce fichier
```

---

## Pages en détail

### `/` — Accueil
**Fichier :** `app/page.tsx`
**Sections :** Hero → ValueProps → FeaturesGrid → Testimonials → TrustBadges → FAQ → CTABanner

### `/features` — Fonctionnalités
**Fichier :** `app/features/page.tsx`
**Contenu :** 6 piliers détaillés + tableau comparatif Standard / Premium / Elite

### `/pricing` — Tarification
**Fichier :** `app/pricing/page.tsx`
**Plans :** Standard (gratuit) · Premium (3,99 €/mois, essai 7j) · Elite (5,99 €/mois, essai 14j)

### `/security` — Sécurité & Confidentialité
**Fichier :** `app/security/page.tsx`
**Contenu :** OWASP Top 10 · Droits RGPD · Stack technique (Supabase EU, Vercel, Stripe)

### `/privacy` — Politique de confidentialité
**Fichier :** `app/privacy/page.tsx` · `robots: noindex`

### `/terms` — Conditions générales d'utilisation
**Fichier :** `app/terms/page.tsx` · `robots: noindex`

### `/contact` — Contact & Support
**Fichier :** `app/contact/page.tsx` (Client Component)
**API :** `POST /api/contact` — validation Zod + rate limiting + envoi Resend

---

## Design System

| Élément       | Valeur                              |
|---------------|-------------------------------------|
| Primaire      | `#10B981` (vert éco)                |
| Secondaire    | `#F59E0B` (orange alertes)          |
| Accent        | `#1E3A8A` (bleu confiance)          |
| Hero bg       | `linear-gradient(135deg, #0D3B4D, #0F5566)` |
| Font          | Inter (300–800)                     |
| Font mono     | JetBrains Mono                      |

---

## Commandes

```bash
bun run dev     # → http://localhost:3000
bun run build   # Build production
bun run start   # Lancer en production
bun run lint    # ESLint
```

---

## Checklist avant déploiement

- [ ] Renseigner `RESEND_API_KEY` dans les variables d'env Vercel
- [ ] Remplacer `APP_STORE_URL` et `PLAY_STORE_URL` dans `lib/constants.ts`
- [ ] Ajouter `public/favicon.ico`, `public/apple-touch-icon.png`, `public/og-image.png`
- [ ] Configurer le domaine custom sur Vercel
- [ ] Remplir `INFOS_A_REMPLIR.md` et mettre à jour `lib/constants.ts` + `lib/placeholder.ts`
- [ ] Remplacer les témoignages dans `lib/placeholder.ts` par de vrais avis utilisateurs
- [ ] Remplacer le mockup Hero par une vraie capture d'écran (`lib/placeholder.ts`)
