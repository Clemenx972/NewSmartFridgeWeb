# Inventaire des écrans réellement codés — SmartFridge (application)

Relevé du 2 septembre 2026, à partir du code de `NewSmartFridge/composeApp/src/commonMain/kotlin/org/smartfridge/`.
Chaque écran a été ouvert et lu ; les verdicts s'appuient sur ce que le code fait vraiment
(repositories, Room, Supabase, Edge Functions), pas sur les intentions des commentaires.

Légende — **FONCTIONNEL** : branché sur de vraies données et des actions réelles ·
**PARTIEL** : fonctionne, mais une partie annoncée manque · **MAQUETTE VIDE** : dessiné, non branché.

## 0. Architecture de navigation

- `App.kt` — aiguillage racine : pas de session → authentification ; onboarding non fait →
  Onboarding ; données non préchargées → écran de chargement ; sinon la coque à onglets.
- `app/nav/RootDestinations.kt` — 4 onglets (Stockage, Courses, Recettes, Paramètres) + 7
  destinations empilables : `ParseInput`, `EditProfile`, `MfaSettings`, `Pricing`,
  `ManageSubscription`, `HouseholdManagement`, `Legal`.
- `app/nav/RootNavGraph.kt` — pile de navigation maison, gestion du bouton retour, lien
  profond `smartfridge://containers/{id}`, dialogue d'invitation au foyer par-dessus tout écran.
- `app/nav/MainScreen.kt` — barre de navigation 4 onglets + bannière d'état de synchronisation.
- `ui/branding/SmartFridgeTopBar.kt` — en-tête unique (logo + nom `SmartFridgeBrand.NAME`)
  réutilisé par tous les onglets et pages.

---

## 1. Écran de chargement — `ui/SplashLoadingScreen.kt` — FONCTIONNEL
Affiché après connexion pendant le préchargement (foyer → synchronisation → données locales).
Logo plein écran animé, nom de l'app, indicateur de progression, libellé de l'étape en cours.
Piloté par `StartupPreloader` (étapes réelles). Textes i18n.

## 2. Onboarding — `feature/onboarding/OnboardingScreen.kt` — FONCTIONNEL
3 pages (pager), indicateurs, « Passer » / « Suivant » / « Commencer ». Écrit réellement la
préférence « onboarding terminé ». Textes i18n.

## 3–6. Authentification — `feature/auth/ui/` — FONCTIONNEL (textes français en dur)
Routeur `AuthFlow.kt`.
- **Connexion** `LoginScreen.kt` : logo, e-mail, mot de passe, erreur inline, bouton avec
  spinner, liens « Mot de passe oublié ? » / « Pas de compte ? ». → Edge Function `auth`.
- **Inscription** `SignUpScreen.kt` : **nom d'utilisateur** (2 à 50 caractères, affiché dans
  l'app, enregistré dans le profil), e-mail, mot de passe, confirmation ; validation locale
  (≥ 12 caractères, chiffre, lettre, caractère spécial) ; état « vérifiez votre boîte mail ».
- **Mot de passe oublié** `ForgotPasswordScreen.kt` : e-mail, message neutre anti-énumération.
- **Nouveau mot de passe** `ResetPasswordConfirmScreen.kt` : via lien de récupération.
  Défaut : ne vérifie pas le caractère spécial, contrairement à l'inscription.
Tous les textes viennent de `AuthStrings` (français uniquement, pas d'anglais).

## 7. Stockage (frigo) — `feature/frigo/ui/FrigoScreen.kt` — FONCTIONNEL
Onglet 1. Barre d'onglets segmentés des rangements (appui = sélection, appui long =
renommer / supprimer, « + » = créer ; défilement au-delà de 3), bannière ambrée « expire
sous 3 jours », liste d'articles triée par péremption (nom, quantité + unité, badge de
jours restants, glisser pour supprimer si activé), dock bas **Ajouter / Scanner un
code-barres / IA** (le bouton IA n'est affiché qu'en formule Diamant), états chargement
(squelettes), aucun rangement, rangement vide.
Fichiers associés : `ContainerSelector.kt`, `FrigoActionDock.kt`, `FrigoItemCard.kt`,
`ContainerDialogs.kt`, `ContainerIcons.kt` (16 icônes de rangement).
Données : Room via `ContainerRepository` / `ItemRepository`, synchronisation après chaque
écriture. Scan : lecteur Google (sans permission caméra) → Open Food Facts → nom + photo
pré-remplis. Quelques textes encore en français dur (dialogue de suppression, descriptions
d'accessibilité).

## 8. Formulaire d'article — `feature/inventory/ui/ItemFormDialog.kt` — PARTIEL
Ouvert par Ajouter, Scan ou modification. Pastille photo (choix + envoi), champ Nom avec
icône de scan intégrée (statuts chargement / non reconnu / erreur), stepper de quantité,
date de péremption (sélecteur de date) avec rappel « expire dans N jours », unités en
sélecteur segmenté, Annuler / Enregistrer.
Données : réelles (envoi photo via Edge Function `storage/upload-image`, Open Food Facts).
**Manque** : la photo envoyée n'est jamais réaffichée (aucun chargeur d'image dans le
projet, `FrigoItemCard` ignore `imageUrl`). Aucune garde de formule côté client sur le
bouton photo. Textes `InventoryStrings` (français dur).

## 9. Saisie en langage naturel — `feature/inventory/ui/ParseInputScreen.kt` — FONCTIONNEL
Depuis le bouton IA du dock. Intro + 3 exemples cliquables, zone de texte 500 caractères
avec micro (dictée système), bouton « Analyser », prévisualisation éditable (badge
d'opération Ajout / À acheter / Retrait / Mise à jour, badge « confiance faible », nom,
quantité, péremption, unité, suppression d'une ligne), puce « IA » ou « analyse locale »,
« Confirmer », puis bilan (créés / mis à jour / retirés / ignorés).
Données : Edge Function `parse-input` (Gemini 2.5 Flash-Lite) avec repli sur un
dictionnaire local ; écriture réelle des 4 opérations dans le stock.
**Défaut** : l'identifiant du rangement de départ n'est pas transmis à l'écran ; le
rangement est choisi par correspondance floue (l'article peut atterrir ailleurs).

## 10. Liste de courses — `feature/inventory/ui/ShoppingListScreen.kt` — FONCTIONNEL
Onglet 2. **Pas d'onglets internes** : une liste unique regroupée **par rangement**, cartes
neutres avec une pastille d'état et des étiquettes « À acheter », « Stock faible » ou
« Expire dans N j » (ambre) ; le rouge est réservé au périmé. Modifier /
supprimer / marquer acheté, ajout manuel (nom, quantité, unité, rangement). État vide
illustré. Données : combinaison réelle de la liste manuelle, du stock faible (seuil selon
la taille du foyer) et des péremptions à 30 jours.

## 11. Recettes — `feature/recettes/ui/RecettesScreen.kt` — FONCTIONNEL
Onglet 3. Carte « héros » (recette la plus urgente selon les péremptions, bouton Démarrer),
rangée « Idées de la semaine », section « Mes recettes », création manuelle (nom, durée,
ingrédients, étapes), feuille de détail, suppression, **« Suggestion IA » réservée à
Diamant**. « Démarrer » déduit réellement les quantités du stock et bascule en courses
sous le seuil. Les idées non-IA viennent d'un catalogue local de gabarits
(`RecipeTemplates`), pas du serveur ; les recettes IA passent par l'Edge Function
`generate-recipes`.

## 12. Paramètres — `feature/settings/ui/SettingsScreen.kt` — PARTIEL
Onglet 4. En-tête profil (initiale, nom coloré selon la formule, badge Standard / Premium /
Diamant, e-mail, « membre depuis » et « jours d'activité »), navigation vers Informations
personnelles, Gérer l'abonnement, Gestion du foyer (Diamant seulement), bannière d'upsell
(Standard), préférences (Notifications, Mode sombre, Glisser pour supprimer, Couleur du
pseudo, Langue FR/EN en menu déroulant), Déconnexion, **suppression de compte en 2 étapes**
(liste des données effacées puis mot de confirmation), Mentions légales, version.
**Manque** : la bascule « Notifications » n'a aucun effet (la planification des rappels ne
la lit pas et n'est jamais annulée). Aucun export de données. Quelques textes en dur.

## 13. Informations personnelles — `feature/auth/ui/EditProfileScreen.kt` — FONCTIONNEL
Avatar / nom / e-mail, Identité (nom d'affichage → serveur ; taille du foyer 1…8+),
Alimentation (régimes en puces, note personnelle privée, utilisée par les alertes
allergènes et le seuil de stock faible), Données (effacer les données locales). Aucune
entrée Sécurité / 2FA (retirée lors de la refonte).

## 14. Mon abonnement — `feature/subscription/ui/ManageSubscriptionScreen.kt` — FONCTIONNEL
Carte membre (formule, nom, statut, échéance, bouton « Modifier mon abonnement »), 4 tuiles
d'avantages dérivées du modèle (cadenas + « Débloquer » si non inclus), « Résilier » avec
confirmation → portail Stripe, puis interrogation du serveur jusqu'à 2 min pour refléter le
webhook.

## 15. Choisir une formule — `feature/subscription/ui/PricingScreen.kt` — FONCTIONNEL
Accessible **uniquement** depuis la carte membre ou un « Débloquer ». Tableau comparatif
3 colonnes (Standard / Premium / Diamant), colonne actuelle surlignée, lignes Rangements,
Sync, Photos, Partage du foyer, Assistant IA, ligne **Prix / mois** (0 € / 2,99 € / 4,99 €)
et un bouton **Choisir** par colonne : montée en gamme → page de paiement Stripe ;
descente → portail de modification. Prix codés dans l'app (à garder alignés avec Stripe).

## 16. Gestion du foyer — `feature/household/ui/HouseholdScreen.kt` — FONCTIONNEL
Diamant seulement. Nom du foyer, liste des membres (propriétaire, Actif / En attente /
Refusé, retrait), invitation par e-mail **limitée à 3 membres hors propriétaire**,
Dissoudre / Quitter avec confirmation, acceptation d'invitation par dialogue global.
Edge Functions réelles. Textes 100 % français en dur.

## 17. Mentions légales — `feature/legal/LegalScreen.kt` — FONCTIONNEL
Deux onglets (Confidentialité / CGU), texte intégral FR/EN, ouverture dans le navigateur.
**Incohérence** : les CGU parlent d'une facturation Play Store alors que l'app facture par
Stripe ; textes datés de mai 2025.

## 18. Authentification à deux facteurs — `feature/auth/ui/MfaSettingsScreen.kt` — INJOIGNABLE, PARTIEL
Écran complet (inscription TOTP, clé manuelle, code à 6 chiffres, désactivation) branché
sur le repository, mais **aucune navigation n'y mène** depuis la refonte du profil, et
aucun QR code n'est rendu (clé manuelle seulement).

---

## Fonctionnalités absentes du code (à ne pas promettre)
- Aucun écran de statistiques (seuls « membre depuis » et « jours d'activité »).
- Aucun export de données (JSON ou autre).
- Aucun écran de notifications ; bascule sans effet. Les rappels Android existent
  (vérification quotidienne des péremptions, alertes foyer) mais pas de délai configurable.
- Aucune reconnaissance d'image / OCR : seulement l'ajout d'une photo et le scan de
  code-barres. Sur iOS, scan et dictée sont des stubs.
- Pas d'onglets « À acheter / Stock faible / Urgent » dans les courses : une liste unique
  avec badges.
- Pas de widget, pas de montre, pas d'import de ticket de caisse, pas d'historique de
  consommation, pas de notes par article, pas d'onglet catégories personnalisables.

## Tableau récapitulatif

| Écran | Fichier | Verdict |
|---|---|---|
| Chargement | `ui/SplashLoadingScreen.kt` | FONCTIONNEL |
| Onboarding | `feature/onboarding/OnboardingScreen.kt` | FONCTIONNEL |
| Connexion | `feature/auth/ui/LoginScreen.kt` | FONCTIONNEL (FR dur) |
| Inscription | `feature/auth/ui/SignUpScreen.kt` | FONCTIONNEL (FR dur) |
| Mot de passe oublié | `feature/auth/ui/ForgotPasswordScreen.kt` | FONCTIONNEL (FR dur) |
| Nouveau mot de passe | `feature/auth/ui/ResetPasswordConfirmScreen.kt` | FONCTIONNEL (validation plus faible) |
| Coque à onglets | `app/nav/MainScreen.kt` | FONCTIONNEL |
| Stockage | `feature/frigo/ui/FrigoScreen.kt` | FONCTIONNEL |
| Formulaire d'article | `feature/inventory/ui/ItemFormDialog.kt` | PARTIEL (photo non réaffichée) |
| Saisie langage naturel | `feature/inventory/ui/ParseInputScreen.kt` | FONCTIONNEL (rangement de départ ignoré) |
| Courses | `feature/inventory/ui/ShoppingListScreen.kt` | FONCTIONNEL (pas d'onglets) |
| Recettes | `feature/recettes/ui/RecettesScreen.kt` | FONCTIONNEL (idées = gabarits locaux) |
| Paramètres | `feature/settings/ui/SettingsScreen.kt` | PARTIEL (Notifications sans effet) |
| Informations personnelles | `feature/auth/ui/EditProfileScreen.kt` | FONCTIONNEL |
| Mon abonnement | `feature/subscription/ui/ManageSubscriptionScreen.kt` | FONCTIONNEL |
| Choisir une formule | `feature/subscription/ui/PricingScreen.kt` | FONCTIONNEL |
| Gestion du foyer | `feature/household/ui/HouseholdScreen.kt` | FONCTIONNEL (FR dur) |
| Mentions légales | `feature/legal/LegalScreen.kt` | FONCTIONNEL (CGU à corriger) |
| 2FA | `feature/auth/ui/MfaSettingsScreen.kt` | INJOIGNABLE + PARTIEL |

Aucune « maquette vide » au sens strict : pas de bouton sans action, pas de `TODO()`, pas
de liste factice dans les écrans. Les seuls contenus qui ne viennent pas de données sont
les gabarits de recettes, les textes légaux et les prix d'abonnement.
