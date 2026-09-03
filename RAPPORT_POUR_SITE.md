# Rapport pour le site vitrine — état réel de l'application SmartFridge

Rédigé le 2 septembre 2026. Ce fichier résume tout ce qui a été fait pour aligner le site
sur l'application, et sert de point d'entrée pour une discussion dédiée au site. Les trois
fichiers de référence sont dans ce dossier :

| Fichier | Contenu |
|---|---|
| `INVENTAIRE_ECRANS.md` | Les 19 écrans réellement codés, ce qu'ils affichent, leur verdict (fonctionnel / partiel / injoignable) |
| `FONCTIONNALITES_PROMISES.md` | Chaque promesse du site cochée strictement, avec les chiffres faux corrigés |
| `design/captures/*.png` | 12 captures réelles prises sur l'émulateur Android (1080 × 2400), avec des données de démonstration |

---

## 1. L'application en une page

**SmartFridge** est une application mobile (Kotlin Multiplatform + Compose, Android
fonctionnel, iOS partiel) qui suit le contenu de la cuisine et évite le gaspillage.
Backend Supabase (PostgreSQL, Edge Functions Deno), paiement Stripe, IA via Gemini 2.5
Flash-Lite appelée uniquement côté serveur.

Quatre onglets :
1. **Stockage** — les rangements (Frigo, Congélateur, Placard, Table, …) en barre d'onglets,
   la liste des articles avec quantité, unité et jours restants, et un dock **Ajouter /
   Scanner un code-barres / IA**.
2. **Courses** — une liste unique qui se remplit automatiquement : articles à acheter, stock
   faible, péremption proche, regroupés par rangement.
3. **Recettes** — une recette « à cuisiner ce soir » choisie selon les péremptions, des idées
   de la semaine, les recettes personnelles, et des recettes générées par IA (Diamant).
4. **Paramètres** — profil, abonnement, foyer partagé (Diamant), préférences, langue FR/EN,
   suppression de compte.

Trois formules : **Standard** (gratuit), **Premium** (2,99 €/mois), **Diamant** (4,99 €/mois).

---

## 2. Les captures et ce qu'elles montrent

| Fichier | Écran | À utiliser pour |
|---|---|---|
| `ecran-chargement.png` | Écran de chargement, logo plein écran | Splash / branding |
| `ecran-frigo.png` | Onglet Stockage, rangement Frigo avec 4 articles et leurs jours restants | Écran principal du site |
| `ecran-placard.png` | Même onglet, rangement Placard (riz, tomate) | Multi-rangements |
| `ecran-saisie-avant.png` | Saisie en langage naturel, phrase tapée, avant analyse | Section IA (avant) |
| `ecran-saisie-apres.png` | Résultat : « 2 éléments reconnus », cartes éditables | Section IA (après) |
| `ecran-courses.png` | Liste de courses par rangement, pastilles et étiquettes douces | Section Courses |
| `ecran-recettes.png` | Recette du soir, idées de la semaine, suggestion IA | Section Recettes |
| `ecran-formulaire-article.png` | Formulaire d'ajout (photo, scan, quantité, péremption, unité) | Détail fonctionnel |
| `ecran-parametres.png` | Réglages avec profil, badge Diamant, préférences | Compte |
| `ecran-profil.png` | Informations personnelles (nom, personnes à la maison, régimes) | Compte |
| `ecran-abonnement.png` | Carte membre + avantages (cadenas sur ce qui n'est pas inclus) | Page Tarifs |
| `ecran-abonnement-choix.png` | Tableau comparatif des 3 formules avec prix et bouton Choisir | Page Tarifs |

Le compte de démonstration est en formule Diamant : tout est visible. Un compte Standard
ne verrait ni le bouton IA du dock, ni « Suggérer des recettes », ni « Gestion du foyer ».

---

## 3. Ce que le site peut affirmer (vérifié dans le code)

- Saisie en langage naturel « 2 yaourts et 500 g de jambon » → articles créés avec
  quantité, unité et date de péremption estimée. IA côté serveur, repli hors-ligne local.
- Scan de code-barres (sans permission caméra) avec fiche Open Food Facts pré-remplie.
- Rangements illimités en Premium et Diamant, renommables, icône au choix.
- Rappels de péremption sur Android (vérification quotidienne, horizon 3 jours).
- Liste de courses automatique : à acheter, stock faible (seuil selon le nombre de
  personnes à la maison), péremption proche.
- Recettes proposées selon ce qui va périmer ; « Démarrer » déduit les quantités du stock.
- Mode hors-ligne complet, synchronisation multi-appareils (formules payantes).
- Foyer partagé jusqu'à 4 personnes (Diamant), invitation par e-mail.
- Interface FR / EN, mode sombre, alertes allergènes selon la note personnelle.
- Compte : vérification d'e-mail, nom d'utilisateur choisi à l'inscription, suppression
  de compte en deux étapes depuis l'app, données locales effaçables.
- Paiement Stripe, résiliation depuis l'app, aucun engagement.

## 4. Ce que le site ne doit PAS affirmer

- Prix 3,99 € / 5,99 €, essais gratuits, remise annuelle, formule nommée « Elite ».
- 60+ icônes, délai d'alerte réglable 1/3/7 jours, onglets dans les courses, compteurs.
- Temps réel, latence < 500 ms, historique 30 jours, sauvegarde quotidienne.
- Membres illimités, permissions par membre, partage par rangement.
- Export JSON, sessions multi-appareils, timeout 30 min, 2FA obligatoire.
- Hébergement EU Francfort (le projet est en `us-west-2`), Resend, logs 90 jours,
  disponibilité 99,9 %, support 24/7.
- Téléchargements, note, avis : l'application n'est pas encore publiée.

Le détail ligne par ligne est dans `FONCTIONNALITES_PROMISES.md`, section 11 pour les
chiffres.

---

## 5. Ce qui a été modifié dans l'application pendant cette passe

- Page « Choisir une formule » : tableau comparatif avec bouton Choisir par colonne
  (montée en gamme → paiement Stripe, descente → portail de modification).
- Logo de l'application dans tous les en-têtes, nom de marque centralisé.
- Saisie libre : correction d'un bug qui empêchait toute création d'article quand la
  phrase ne nommait pas de rangement ; le rangement d'origine est désormais respecté
  quand il convient à l'aliment.
- Liste de courses : cartes neutres, pastille d'état, rouge réservé au périmé.
- Bouton IA du dock masqué hors formule Diamant.
- Cartes d'idées de recettes à taille fixe.
- Profil : « Taille du foyer » renommé « Personnes à la maison » (c'est le nombre de
  personnes nourries, utilisé pour le seuil de stock faible ; sans rapport avec le foyer
  partagé de la formule Diamant, d'où la valeur 1 par défaut).
- Inscription : champ « Nom d'utilisateur » obligatoire (2 à 50 caractères), transmis au
  serveur et enregistré dans le profil ; le nom n'est plus dérivé de l'adresse e-mail.
  Migration `20260902000001_signup_display_name.sql` appliquée, fonction Edge `auth`
  redéployée (v4).

## 5 bis. Ajouts du 3 septembre 2026 (à intégrer au site)

**Onglet Courses refondu** : deux vues, **Liste** (À ne pas oublier / Stock faible / Notés
par vous, bouton vert « Ajouter un article ») et **Panier** (rayons Carrefour numérotés
dans l'ordre du parcours, cases rondes, priorité puis compléments « +1 paquet »,
« Terminer les courses »). Captures : `ecran-courses.png` (Liste) et
`ecran-courses-panier.png` (Panier).

**Essai gratuit de 7 jours** (Stripe). Réponses aux questions du fichier
`PROMPT_ESSAI_GRATUIT.md` :
- *Durée réelle* : 7 jours, Premium comme Diamant.
- *Moyen de paiement* : Stripe (lien sortant vers Stripe Checkout, carte enregistrée à
  l'inscription, pas d'achat intégré Apple/Google pour l'instant).
- *Comportement à l'expiration* : débit automatique au 8e jour et l'accès continue sans
  rupture ; résiliation avant cette date depuis Réglages → Mon abonnement → Résilier (deux
  gestes, confirmation qui précise qu'aucun montant ne sera prélevé) ; retour en Standard
  sans perte de données. En cas d'échec de paiement, l'accès est suspendu et Stripe relance
  par e-mail.
- *Formulation retenue dans l'app* : « Essai gratuit de 7 jours, puis 2,99 € / mois. Votre
  carte est enregistrée aujourd'hui mais ne sera pas débitée pendant l'essai. Le
  [date en clair], votre abonnement démarrera automatiquement et votre carte sera débitée
  de 2,99 €, puis chaque mois. Vous pouvez résilier à tout moment avant cette date depuis
  Réglages → Abonnement. Aucun montant ne sera prélevé. » Case non pré-cochée : « Je
  demande l'accès immédiat au service et je reconnais perdre mon droit de rétractation de
  14 jours une fois l'essai commencé. » Bouton : « Commencer l'essai — puis 2,99 € / mois ».
- *Anti-abus* : un essai par personne, registre séparé des profils (empreinte SHA-256 de
  l'e-mail normalisé + sel serveur, et empreinte de carte Stripe), **conservation
  24 mois**, survit à la suppression du compte. À mentionner dans la politique de
  confidentialité (prévention de la fraude, intérêt légitime).
- *Rappel J-2* : e-mail « Trial ending » de Stripe (à activer dans le dashboard Stripe) ;
  l'app affiche la date du premier débit sur la carte membre.
- *Non fait* : notification push J-2 dans l'app, période de grâce après échec de débit.

**Facturation annuelle** : bascule Mensuel / Annuel dans le tableau des formules,
29,90 € et 49,90 € par an (« 2 mois offerts »). Active seulement une fois les prix annuels
créés dans Stripe.

**Widget d'écran d'accueil (Android)** : les 3 ou 5 aliments les plus critiques, par date
d'expiration ou par quantité, au choix à l'ajout du widget. Toutes les formules.

**Scan de ticket de caisse par l'IA (Diamant)** : bouton « Photo du ticket de caisse » dans
la saisie libre ; chaque ligne devient un article rangé selon sa nature (frais → frigo,
viande / poisson → congélateur, sec → placard), à valider avant confirmation.

**Nom d'utilisateur à l'inscription**, **bouton IA masqué hors Diamant**, **cartes de
recettes à taille fixe**, **« Personnes à la maison »** dans le profil.

Décision d'offre en suspens : `NewSmartFridge/ETUDE_OFFRE_PREMIUM.md` recommande de donner
à Premium un petit quota d'IA (20 saisies, 2 tickets, 5 recettes par mois) pour tirer
vers Diamant. Pas engagé : aujourd'hui l'IA reste Diamant seulement.

## 6. Points encore ouverts côté application

- Photo d'article envoyée mais jamais réaffichée.
- Bascule « Notifications » sans effet.
- Écran 2FA codé mais injoignable.
- Limite de 2 rangements en Standard déclarée mais non appliquée.
- CGU intégrées à l'app qui parlent de Play Store au lieu de Stripe.
- Seuil « stock faible » qui ignore l'unité (1 kg de riz est signalé comme stock faible).
- Repli local de la saisie libre limité au dictionnaire (« bananes » non reconnu, « oeufs »
  sans ligature non reconnu) ; l'IA serveur couvre ces cas une fois la clé configurée.
