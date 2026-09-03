# Ce que le site promet — confronté à l'application

Chaque ligne ci-dessous est une affirmation **actuellement écrite sur le site**.
Rempli le 2 septembre 2026 à partir du code de l'application (voir `INVENTAIRE_ECRANS.md`)
et de la configuration réelle du projet Supabase. Rien n'est coché par optimisme : quand
un point est coché, le fichier et la ligne qui le prouvent existent.

**Règle simple :** une promesse non tenue sur une page de téléchargement
génère des avis 1 étoile. Mieux vaut retirer que promettre.

Légende — `[x]` existe · `[ ]` à développer · `[~]` partiel · `[✗]` à retirer du site

---

## 1. Saisie et IA

> Affiché sur : accueil (bento + ValueProps), page Fonctionnalités, FAQ

- [x] Saisie en langage naturel : « 2 yaourts et 500 g jambon » → articles créés
      *(écran « Décrivez votre achat », vérifié sur émulateur : 3 articles créés)*
- [x] Découpage automatique en article + quantité + unité
- [~] Reconnaissance des abréviations (« yaourt nat. », « jus d'o ») — l'IA (Gemini) le fait
      quand la clé est configurée ; le repli local (dictionnaire) ne reconnaît que les
      alias listés
- [ ] Reconnaissance des marques courantes
- [~] Correction des fautes de frappe — par l'IA uniquement, pas par le repli local
- [ ] Apprentissage des habitudes de l'utilisateur
- [~] Traitement en **moins de 5 secondes** — non mesuré. Le repli local est instantané ;
      l'appel IA dépend du réseau. **Retirer le chiffre « 4 s »** tant qu'il n'est pas mesuré
- [x] Fonctionne en français *(l'anglais est aussi pris en charge par l'IA ; l'interface
      existe en FR et EN)*

**Réponse à la question ouverte :** l'IA ne tourne **pas** en local. Le texte est envoyé à
une Edge Function Supabase (`parse-input`) qui appelle Gemini 2.5 Flash-Lite (repli
GPT-5-nano). Sans clé configurée, l'app bascule sur un dictionnaire local hors ligne.
La page Confidentialité doit dire : « vos saisies libres sont transmises à notre serveur
puis à un fournisseur d'IA pour analyse ; elles sont conservées 30 jours au maximum sur
l'appareil ». Les recettes IA et le scan photo IA sont réservés à la formule Diamant.

---

## 2. Inventaire et rangements

> Affiché sur : accueil, page Fonctionnalités, Tarifs, CGU

- [x] Plusieurs rangements (frigo, congélateur, placard, cave) — nombre libre, 3 types
      (froid / congelé / ambiant)
- [~] **Limite de 2 rangements en plan gratuit** — la limite est **déclarée** dans le modèle
      (`SubscriptionTier.maxContainers = 2`) et affichée dans le tableau des formules, mais
      **aucun code ne l'applique** : un compte Standard peut créer autant de rangements
      qu'il veut. Soit l'appliquer, soit ne pas l'écrire
- [x] Rangements illimités en Premium
- [~] Catégories personnalisables avec icônes — il n'y a pas de « catégories » : ce sont
      les rangements, nommables et renommables, avec une icône au choix
- [✗] **60+ icônes personnalisées** — **10 icônes** de rangement (`ContainerIcons.kt`).
      Remplacer par « icônes au choix » sans chiffre
- [~] Photos produits — la photo est **envoyée et stockée** (limite serveur 5 Mo), mais
      **jamais réaffichée** dans l'app (aucun chargeur d'image). Ne pas mettre en avant
      tant que l'affichage n'existe pas
- [x] Photos limitées à **5 Mo**, formats JPG / **PNG** / WebP *(`storage/index.ts` :
      `MAX_BYTES = 5 Mo`, `image/jpeg, image/png, image/webp`)* — ajouter PNG au site
- [x] Quantités avec unités (u, g, kg, ml, L)
- [ ] Notes et commentaires par article
- [ ] Historique des articles consommés
- [ ] Statistiques d'utilisation par espace *(annoncé en Premium)* — aucun écran de
      statistiques dans l'app

---

## 3. Alertes

> Affiché sur : accueil, page Fonctionnalités, FAQ

- [ ] Notifications push iOS — l'app iOS n'a pas de notifications (stubs)
- [~] Notifications push Android — ce sont des **notifications locales** (vérification
      quotidienne par WorkManager, `ExpirationCheckWorker`), pas du push serveur. Dire
      « rappels » plutôt que « push »
- [✗] Délai d'alerte configurable **1 / 3 / 7 jours** — délai **fixe à 3 jours**
      (`ExpirationCheckWorker.kt:40`), non réglable
- [~] Alertes de stock faible — affichées dans l'app (badge « Stock faible », onglet
      Courses), **pas de notification**
- [ ] Badge sur l'icône de l'app
- [ ] Email récapitulatif hebdomadaire — aucun envoi d'e-mail applicatif (seuls les
      e-mails d'authentification Supabase existent)

À noter : la bascule « Notifications » des Réglages n'a aujourd'hui **aucun effet**
(les rappels restent planifiés quoi qu'il arrive). À corriger avant de promettre un
réglage.

---

## 4. Listes de courses

> Affiché sur : accueil (bento), page Fonctionnalités

- [~] Onglet « À acheter » (saisie manuelle) — **refonte du 3 septembre 2026** : l'onglet
      Courses a deux vues, **Liste** et **Panier**. La Liste est en trois sections : « À ne
      pas oublier » (expire sous 7 jours), « Stock faible », « Notés par vous » (saisie
      manuelle). Pas d'onglet « À acheter » séparé
- [x] Onglet « Stock faible » (détection automatique) — section « Stock faible » de la
      Liste, seuil selon le nombre de personnes à la maison
- [x] Onglet « Urgent » (expirations imminentes) — section « À ne pas oublier », horizon
      7 jours
- [~] Compteurs par onglet — un compteur sur « Liste » (nombre d'articles) et une
      progression sur « Panier » (« 2/6 »), pas un compteur par section
- [x] *(nouveau)* **Mode Panier** : la même liste réorganisée pour le magasin, rayons
      nommés comme la signalétique Carrefour et numérotés dans l'ordre du parcours
      (entrée → caisses), cases rondes à cocher, priorité d'abord puis compléments « pour
      le stock » (+2, +1 paquet), « Terminer les courses » actif quand la priorité est dans
      le panier. **À mettre en avant sur le site**
- [ ] Export de la liste (partage, impression)

Reformuler : « Une liste de courses qui se remplit toute seule, puis un mode magasin qui
vous guide rayon par rayon. »

---

## 5. Synchronisation et hors-ligne

> Affiché sur : accueil, page Fonctionnalités, FAQ

- [x] Mode hors-ligne complet — base locale Room, toutes les écritures sont locales
      d'abord, file d'attente « dirty » rejouée à la prochaine synchronisation
- [~] Synchronisation automatique à la reconnexion — synchronisation **après chaque
      écriture, au démarrage et au retour au premier plan** ; pas d'écouteur réseau
      dédié (la reprise se fait au prochain déclencheur)
- [✗] Sync bidirectionnelle temps réel — **pas de temps réel** : push/pull à la demande
      (Supabase Realtime non branché)
- [✗] **Latence annoncée : < 500 ms** — non mesuré, et sans temps réel le chiffre n'a pas
      de sens. **Retirer**
- [~] Résolution automatique des conflits — « dernière écriture gagne » (upsert par
      identifiant), pas de fusion ni d'historique
- [ ] Backup automatique quotidien — dépend du plan Supabase (sauvegardes quotidiennes à
      partir du plan Pro) ; rien côté application
- [ ] Historique des modifications **30 jours** *(Premium)* — inexistant
- [x] Appareils illimités par compte — aucune limite de sessions dans le code
      *(réservé aux formules payantes : la sync cloud est un avantage Premium/Diamant)*

---

## 6. Partage familial

> Affiché sur : accueil, page Fonctionnalités, Tarifs, CGU

- [x] Invitation de membres par email *(écran Gestion du foyer, Edge Function `household`)*
- [✗] Membres illimités *(plan Elite)* — **3 membres maximum hors propriétaire**
      (`HouseholdScreen` : « Foyer complet — 3 membres maximum »). Écrire « jusqu'à
      4 personnes »
- [✗] Permissions différenciées par membre — deux rôles seulement : propriétaire / membre
- [✗] Partage par rangement *(annoncé en Elite)* — c'est **tout le foyer** qui est partagé,
      pas rangement par rangement
- [~] Synchronisation temps réel entre membres — synchronisation à chaque écriture et
      notification d'invitation, pas de temps réel

---

## 7. Abonnements et facturation

> Affiché sur : Tarifs, CGU, FAQ

- [x] Plan Standard gratuit, sans limite de durée
- [✗] Premium **3,99 €/mois** → l'app affiche **2,99 €/mois** (`PricingScreen.kt`,
      `tierPrice`). Aligner le site sur le prix Stripe réel
- [✗] Elite **5,99 €/mois** → l'app affiche **4,99 €/mois**. Idem. Le nom affiché dans
      l'app est **« Diamant »**, pas « Elite »
- [x] Essai Premium **7 jours** — **implémenté le 3 septembre 2026** (Stripe,
      `subscription_data.trial_period_days = 7`) : carte enregistrée à l'inscription, aucun
      débit pendant 7 jours, débit automatique au 8e jour ; un seul essai par personne
      (registre par empreinte d'e-mail + empreinte de carte, conservation 24 mois) ; écran
      d'information avec la date précise du premier débit et case de renonciation au droit
      de rétractation, non pré-cochée
- [~] Essai Elite **14 jours** — l'essai existe aussi pour Diamant, mais il dure **7 jours**,
      pas 14. Écrire « 7 jours » pour les deux formules
- [✗] Essai **sans carte bancaire** — la carte est demandée à l'inscription à l'essai (débit
      au 8e jour). Écrire « 7 jours gratuits, résiliable avant le premier débit »
- [✗] Annulation depuis App Store / Google Play — la facturation passe par **Stripe**,
      l'annulation se fait depuis l'app (bouton « Résilier ») via le portail Stripe. Les
      CGU intégrées à l'app disent encore « Play Store » : à corriger des deux côtés
- [~] Upgrade instantané au prorata — montée en gamme = nouvelle session Stripe Checkout ;
      le prorata dépend de la configuration Stripe (par défaut, Stripe prorate lors d'un
      changement via le portail). À confirmer dans le dashboard Stripe avant de l'écrire
- [~] Downgrade en fin de période, sans perte de données — descente via le portail Stripe ;
      l'app ne supprime jamais de données. Le comportement « fin de période » dépend du
      réglage du portail Stripe
- [~] **Remise annuelle ~20 %** — **facturation annuelle ajoutée le 3 septembre 2026**
      (bascule Mensuel / Annuel dans le tableau des formules, prix affichés 29,90 € et
      49,90 € par an, soit « 2 mois offerts » ≈ 17 %). Elle n'est active que si les Price
      IDs annuels sont créés dans Stripe (`STRIPE_PREMIUM_PRICE_YEARLY`,
      `STRIPE_ELITE_PRICE_YEARLY`) ; sinon l'app affiche « formule annuelle pas encore
      disponible ». Écrire « 2 mois offerts » plutôt que « ~20 % »
- [~] Badges de plan : Standard / Or / Diamant — les badges sont **Standard / Premium /
      Diamant** (« Or » n'apparaît nulle part)
- [ ] Rapport d'économies mensuel *(Elite)* — inexistant
- [ ] Accès anticipé aux nouveautés *(Elite)* — promesse marketing sans mécanisme dans l'app
- [✗] Support prioritaire 24/7 *(Elite)* — aucun canal de support dans l'app ni
      d'engagement possible. Retirer « 24/7 »

Ce que l'app fait et que le site pourrait dire : carte membre avec statut et échéance,
tableau comparatif des formules dans l'app, résiliation en deux touches avec confirmation.

---

## 8. Compte et RGPD

> Affiché sur : Confidentialité, Sécurité, FAQ

- [✗] Export des données en **JSON** depuis Paramètres → Mes données — **aucun export**
      dans l'app. Soit le développer, soit indiquer « sur demande par e-mail »
- [x] Suppression du compte **en 2 clics** — Réglages → zone de danger, liste des données
      effacées, puis saisie d'un mot de confirmation (2 étapes)
- [~] Effacement effectif sous **24 h** — la suppression est **immédiate** côté base et
      compte (`delete-account/index.ts` : `auth.admin.deleteUser`). Les sauvegardes Supabase
      suivent leur propre rétention. Écrire « immédiat » (ou « sous 24 h » reste vrai a
      fortiori)
- [x] Rectification des données depuis le profil *(nom d'affichage, taille du foyer,
      régimes, note personnelle)*
- [ ] Désinscription marketing en un clic — il n'y a **aucun e-mail marketing** ; retirer la
      mention ou la conditionner à l'existence d'une newsletter
- [x] Vérification d'email avant accès complet *(inscription → état « vérifiez votre
      boîte mail »)*
- [~] **2FA TOTP** *(annoncé « obligatoire » en Premium+)* — le code existe
      (`MfaSettingsScreen`, inscription TOTP par clé manuelle, sans QR code) mais l'écran
      est **injoignable** depuis la refonte du profil, et rien n'est obligatoire. Retirer
      « obligatoire » ; ne pas mentionner tant que l'entrée n'est pas rétablie
- [ ] Sessions multi-appareils visibles et révocables — inexistant
- [✗] Timeout de session après 30 min d'inactivité — pas de délai d'inactivité ; la session
      est persistée chiffrée et rafraîchie par jeton

---

## 9. Infrastructure — à confirmer, pas à développer

> Affiché sur : Sécurité, Confidentialité

- [✗] Supabase EU (Francfort) comme base de données — le projet `SmartFridgeV3` est
      hébergé en **`us-west-2` (Oregon, États-Unis)**. Soit migrer le projet vers
      `eu-central-1`, soit corriger la page (et la politique de confidentialité : transfert
      hors UE)
- [✗] Déploiement en région EU — idem, Edge Functions et base sont aux États-Unis
- [x] Stripe pour le paiement
- [✗] Resend pour les emails transactionnels — **Resend n'est pas utilisé** ; les e-mails
      (confirmation, réinitialisation) sont envoyés par Supabase Auth
- [x] Chiffrement AES-256 au repos — garanti par Supabase (volumes chiffrés) ; en plus,
      la session locale est chiffrée (EncryptedSharedPreferences / Keychain)
- [~] TLS 1.3 en transit — HTTPS partout (Supabase / Cloudflare négocient TLS 1.2 ou 1.3).
      Écrire « TLS » sans version
- [✗] Rétention des logs 90 jours — Supabase conserve les logs **1 jour** (plan gratuit) à
      **7 jours** (Pro). Retirer le chiffre
- [~] Suivi des erreurs et monitoring 24/7 — rapports de plantage auto-hébergés
      (`crash-report`), pas d'astreinte ni d'alerte automatique. Écrire « suivi des
      erreurs »
- [✗] Objectif de disponibilité **99,9 %** — aucun engagement contractuel possible sans
      SLA Supabase (réservé aux plans Entreprise). Retirer des CGU

---

## 10. Ce que le site ne dit pas encore

- [x] Scan de code-barres — lecteur Google (sans permission caméra) + Open Food Facts :
      nom et photo pré-remplis. **À mettre en avant**
- [x] Suggestions de recettes à partir de l'inventaire — carte « héros » (recette la plus
      urgente selon les péremptions), idées de la semaine, recettes personnelles,
      « Démarrer » déduit les quantités du stock. Recettes générées par IA en Diamant.
      **À mettre en avant**
- [x] Widget écran d'accueil — **ajouté le 3 septembre 2026 (Android)** : les 3 ou 5
      aliments les plus critiques, au choix par date d'expiration la plus proche ou par
      quantité la plus faible ; un tap ouvre l'app. Toutes les formules
- [ ] Apple Watch / Wear OS
- [x] Import depuis un ticket de caisse — **ajouté le 3 septembre 2026 (Diamant)** : photo
      du ticket dans l'écran de saisie libre, l'IA lit chaque ligne, propose quantité et
      unité, et range chaque article selon sa nature (frais → frigo, viande et poisson →
      congélateur, sec et conserves → placard). L'utilisateur corrige avant de confirmer
- [x] Mode sombre — bascule dans les Réglages
- [ ] Statistiques de gaspillage évité
- [x] *(non listé)* Alertes allergènes : un rangement contenant un aliment incompatible avec
      la note personnelle porte un avertissement
- [x] *(non listé)* Dictée vocale dans la saisie libre (Android)
- [x] *(non listé)* Interface en français et en anglais
- [x] *(non listé)* Suppression de compte depuis l'app, données locales effaçables

---

## 11. Chiffres publics — les seuls que je ne peux pas inventer

| Champ | Valeur affichée | Réel |
|---|---|---|
| Téléchargements | 10 000+ | **0** — l'application n'est pas encore publiée |
| Note moyenne | 4,7 | aucune |
| Nombre d'avis | 500+ | aucun |
| Économies annoncées | ~150 €/an | aucune mesure |
| Réduction du gaspillage | ~35 % | aucune mesure |

Tant que l'app n'est pas sur les stores : retirer la ligne « 10 000+ téléchargements »,
la note et les avis, et remplacer les économies par une formulation sans chiffre ou une
source externe citée (ex. ADEME : ~30 kg de nourriture gaspillée par personne et par an).

---

## Chiffres corrigés (résumé)

| Sur le site | Réalité dans l'app |
|---|---|
| Premium 3,99 €/mois | **2,99 €/mois** |
| Elite 5,99 €/mois | **4,99 €/mois**, nommé **Diamant** |
| Essais 7 / 14 jours sans carte | **aucun essai** |
| Remise annuelle ~20 % | **pas d'offre annuelle** |
| 60+ icônes | **10 icônes** |
| Délai d'alerte 1 / 3 / 7 jours | **3 jours, fixe** |
| Membres illimités (Elite) | **3 membres + propriétaire** |
| Latence sync < 500 ms | **pas de temps réel** |
| Photos 5 Mo JPG / WebP | **5 Mo JPG / PNG / WebP** |
| Limite 2 rangements en gratuit | déclarée, **non appliquée** |
| Supabase EU Francfort | **us-west-2 (États-Unis)** |
| Logs 90 jours | **1 à 7 jours** selon le plan Supabase |
| Effacement sous 24 h | **immédiat** |
| Badges Standard / Or / Diamant | **Standard / Premium / Diamant** |

---

*Fichier rempli. Les captures réelles sont dans `design/captures/`, l'inventaire des
écrans dans `INVENTAIRE_ECRANS.md`.*
