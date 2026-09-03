# SmartFridge Web

Site vitrine de l'application SmartFridge — gestion de frigo, alertes d'expiration
et partage familial. Next.js 14 (App Router), TypeScript, Tailwind CSS.

---

## Démarrer

Prérequis : [bun](https://bun.sh) (le projet n'utilise pas npm).

```bash
bun install
cp .env.example .env.local   # puis renseigner RESEND_API_KEY si besoin
bun run dev
```

Le site tourne sur http://localhost:3000.

---

## Commandes

| Commande             | Effet |
|----------------------|-------|
| `bun run dev`        | Serveur de développement, rechargement à chaud |
| `bun run build`      | Build de production (typecheck + lint inclus) |
| `bun run start`      | Sert le build de production |
| `bun run lint`       | ESLint, règles Next + accessibilité |
| `bun run typecheck`  | TypeScript sans émission |
| `bun run test`       | Tests unitaires (Vitest) |
| `bun run test:smoke` | Test de bout en bout contre un serveur démarré |
| `bun run verify`     | Enchaîne typecheck → lint → test → build |

### Lancer le test de fumée

Il vérifie ce qu'un test unitaire ne peut pas voir : les en-têtes HTTP réels,
la CSP et les redirections. Dans deux terminaux :

```bash
bun run start
```

```bash
bun run test:smoke
```

---

## Structure

```
app/                    Routes (App Router)
  api/contact/route.ts  Endpoint POST du formulaire de contact
  layout.tsx            Layout racine — métadonnées, JSON-LD, Header/Footer
  sitemap.ts            Génère /sitemap.xml
  <route>/page.tsx      Une page par dossier
components/
  layout/               Header, Footer — présents sur toutes les pages
  sections/             Blocs composant la page d'accueil
  ui/                   Composants réutilisables (bouton CTA, préchargement, animations)
lib/
  constants.ts          Source de vérité : prix, URLs, chiffres publics
  placeholder.ts        Contenu provisoire à remplacer avant production
  cn.ts                 Fusion de classes Tailwind
tests/
  unit/                 Tests Vitest
  smoke.mjs             Test HTTP contre un serveur de production
public/                 Assets statiques
```

---

## Déploiement (Vercel)

1. Pousser le dépôt sur GitHub.
2. Sur [vercel.com](https://vercel.com) → **Add New Project** → importer le dépôt.
3. Vercel détecte Next.js automatiquement — ne rien changer aux réglages de build.
4. Dans **Settings → Environment Variables**, ajouter `RESEND_API_KEY`.
5. Déployer.

Chaque push sur `main` redéploie en production ; chaque pull request obtient
une URL de prévisualisation.

### Avant la première mise en ligne

- [ ] Remplir `INFOS_A_REMPLIR.md`, puis reporter dans `lib/constants.ts`
- [ ] Remplacer les données de `lib/placeholder.ts` par du contenu réel
- [ ] Ajouter `public/icon-192.png`, `public/icon-512.png`, `public/og-image.png` (1200×630)
- [ ] Remplacer `APP_STORE_URL` et `PLAY_STORE_URL` dans `lib/constants.ts`
- [ ] Renseigner `RESEND_API_KEY` côté Vercel
- [ ] Configurer le domaine et mettre à jour `SITE_URL`

---

## Conventions

- **Icônes** : uniquement [Lucide](https://lucide.dev) (`lucide-react`), en
  `currentColor`, fond transparent, sans aplat de couleur. Aucun emoji dans l'interface —
  leur rendu diffère selon le système d'exploitation.
- **Couleurs** : passer par les tokens Tailwind du projet, pas de hex en dur.
- **Gradients** : utiliser les classes `backgroundImage` de `tailwind.config.ts`
  (`bg-gradient-hero`). Les couleurs personnalisées ne génèrent pas d'utilitaires
  `from-*` / `to-*`.
- **Données** : tout chiffre affiché plus d'une fois vit dans `lib/constants.ts`.
