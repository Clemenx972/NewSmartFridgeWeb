# SmartFridge — Dossier de présentation

> À passer à une IA générant une présentation (PowerPoint, Keynote, Google Slides).
> Toutes les informations de ce fichier ont été vérifiées contre le code de
> l'application. Rien n'y est inventé.
> Mis à jour le 3 septembre 2026.

---

## INSTRUCTIONS POUR L'IA QUI GÉNÈRE LA PRÉSENTATION

Génère une présentation de **12 à 15 diapositives** à partir des informations ci-dessous.

### Garde-fous — impératifs

1. **N'invente aucun chiffre.** Les seuls chiffres autorisés sont ceux de ce document.
   Aucun nombre d'utilisateurs, aucune note, aucun avis, aucun taux de croissance :
   l'application n'est pas encore publiée et n'en a aucun.
2. **N'ajoute aucune fonctionnalité** qui ne figure pas en section 4. Si une slide semble
   vide, réduis le nombre de slides plutôt que de combler.
3. **Ne promets pas iOS.** SmartFridge est une application Android. C'est un choix assumé,
   à présenter comme tel.
4. **Ne mets aucun logo de marque tierce** (Carrefour, Google, Stripe, Supabase) sur les
   slides publiques : ce sont des dépendances techniques, pas des partenariats.
5. **Sobriété visuelle.** Palette imposée en section 8. Pas de dégradé criard, pas
   d'emoji, pas d'image générée d'IA représentant un frigo. Les seules images sont les
   captures d'écran réelles listées en section 7.
6. **Le prix est 2,99 € et 4,99 €.** Jamais 3,99 € ni 5,99 € — ce sont d'anciennes valeurs.

### Ton

Factuel, direct, sans superlatif. Le produit se défend par la précision, pas par
l'enthousiasme. Éviter « révolutionnaire », « unique au monde », « incroyable ».
Préférer les phrases courtes et les chiffres sourcés.

### Structure suggérée

| # | Slide | Contenu |
|---|---|---|
| 1 | Titre | Nom, accroche, plateforme |
| 2 | Le problème | Section 1 |
| 3 | Pourquoi les autres échouent | Section 2 |
| 4 | La contrainte de conception | Section 3 |
| 5 | Ce que fait l'application | Section 4, vue d'ensemble |
| 6 | Remplir sans effort | Section 4.1 + capture saisie |
| 7 | Être prévenu à temps | Section 4.2 |
| 8 | Le parcours magasin | Section 4.3 + capture panier — **slide clé** |
| 9 | Cuisiner ce qui presse | Section 4.4 + capture recettes |
| 10 | Le foyer | Section 4.5 |
| 11 | Confidentialité | Section 5 |
| 12 | Les formules | Section 6 |
| 13 | Ce qui n'existe pas encore | Section 9 — **ne pas supprimer cette slide** |
| 14 | La suite | Section 10 |

La slide 8 est celle qui différencie le produit : lui donner le plus d'espace visuel.
La slide 13 crédibilise tout le reste : une présentation qui n'admet aucune limite
n'est pas crue.

---

## 1. LE PROBLÈME

- Un foyer français jette en moyenne **465 € de nourriture par an**, soit environ
  **30 kg par personne**. Source : **ADEME, 2023**.
- Ce gaspillage n'est pas volontaire. Il vient d'un oubli : personne ne sait ce qu'il y a
  au fond du réfrigérateur, ni depuis quand.
- En Martinique, où l'alimentation coûte environ **12 % plus cher** qu'en France
  hexagonale, le même volume gaspillé représente une perte supérieure.

**Formulation possible pour la slide :** « On ne jette pas par négligence. On jette parce
qu'on oublie. »

---

## 2. POURQUOI LES APPLICATIONS D'INVENTAIRE ÉCHOUENT

C'est le point de rupture de toute cette catégorie de produits, et l'argument central de
la présentation.

- Une application qui demande de saisir chaque achat à la main fonctionne une semaine.
- À la troisième course non saisie, l'inventaire ne correspond plus au réfrigérateur
  réel : il affiche ce qui a été mangé et ignore ce qui vient d'être acheté.
- À ce moment précis, l'utilisateur désinstalle.

**Le vrai concurrent n'est pas une autre application : c'est le fait de ne rien noter du
tout.**

---

## 3. LA CONTRAINTE DE CONCEPTION

Une seule règle a guidé toutes les décisions :

> Si enregistrer une course prend plus de quelques secondes, personne ne le fera.

Ce n'est pas une préférence esthétique, c'est la condition de survie du produit.
Chaque fonctionnalité de la section 4 est une réponse à cette contrainte.

---

## 4. CE QUE FAIT L'APPLICATION

### 4.1 Remplir l'inventaire sans effort

**Scan de code-barres** — gratuit et illimité, sur toutes les formules.
Le lecteur identifie le produit et récupère son nom et sa photo depuis la base
Open Food Facts. Il ne reste qu'à confirmer la quantité et la date.
Aucune permission caméra supplémentaire n'est demandée.

**Saisie en langage naturel** *(formule Diamant)*.
On écrit ou on dicte la phrase telle qu'on la dirait : « 2 yaourts nature, 500 g de
jambon et 1 L de lait ». Le texte est découpé en articles distincts, avec pour chacun un
nom, une quantité, une unité et une durée de conservation estimée. Tous les champs
restent modifiables avant enregistrement. Limite : 500 caractères par saisie.
Dictée vocale disponible.

**Scan de ticket de caisse** *(formule Diamant)*.
Une photo du ticket suffit : chaque ligne devient un article, rangé automatiquement selon
sa nature — frais au réfrigérateur, viande et poisson au congélateur, sec au placard.
À valider avant confirmation.

**Saisie manuelle** — illimitée sur toutes les formules, avec quantité, unité
(u, g, kg, ml, L), date et photo.

### 4.2 Être prévenu avant qu'il ne soit trop tard

- Notification **3 jours avant** la date de péremption.
- Le calcul se fait sur l'appareil : le rappel fonctionne sans connexion.
- Les articles concernés remontent en haut de la liste, avec un badge.
- Un badge « Stock faible » signale ce qui s'épuise, avec un seuil adapté au nombre de
  personnes nourries dans le foyer.
- Le délai de 3 jours n'est pas encore réglable.

### 4.3 Le parcours magasin — LA FONCTIONNALITÉ DIFFÉRENCIANTE

L'onglet Courses propose deux vues.

**Vue Liste** — ce qu'il faut acheter, regroupé par rangement : à ne pas oublier,
stock faible, et les articles notés manuellement.

**Vue Panier** — la même liste, mais **réorganisée par rayon, dans l'ordre du parcours en
magasin**, de l'entrée aux caisses. Les rayons sont numérotés (1. Pâtes, riz & féculents
— 2. Crèmerie — 3. Charcuterie & traiteur — 4. Fruits & légumes). On coche au fur et à
mesure, sans revenir sur ses pas. Un compteur distingue les articles prioritaires des
compléments de stock (« +1 paquet », « +2 »).

**Aucune des applications concurrentes analysées ne propose cela.** C'est le point à
mettre en avant.

### 4.4 Cuisiner ce qui doit partir en premier

- Une carte **« À cuisiner ce soir »** propose un plat qui utilise l'aliment le plus
  proche de sa date.
- En dessous, des idées de la semaine à partir du stock disponible.
- L'utilisateur peut enregistrer ses propres recettes.
- « Démarrer la recette » **déduit automatiquement les quantités utilisées** du stock.
- Génération de recettes par IA à partir de l'inventaire *(formule Diamant)*.

### 4.5 Le foyer partagé *(formule Diamant)*

- Jusqu'à **4 personnes** : le propriétaire du foyer et 3 membres invités par courriel.
- Tous voient le même stock et la même liste de courses.
- **Chacun conserve son propre compte**, donc ses régimes alimentaires, ses allergies,
  ses recettes et ses notifications.

### 4.6 Confort quotidien

- **Widget d'écran d'accueil** — les 3 ou 5 aliments les plus critiques, par date
  d'expiration ou par quantité. Disponible sur **toutes les formules**.
- **Alertes allergènes** — un rangement contenant un aliment incompatible avec les
  régimes déclarés porte un avertissement. Disponible sur **toutes les formules**.
- **Mode hors-ligne complet** — tout est enregistré d'abord sur l'appareil.
  La synchronisation reprend au lancement suivant.
- **Mode sombre**, interface en **français et en anglais**.
- Plusieurs rangements : frigo, congélateur, placard, et tout espace créé librement,
  renommables, avec une icône au choix.

---

## 5. CONFIDENTIALITÉ — à présenter sans enrobage

- Les données sont chiffrées au repos (AES-256) et transitent en HTTPS.
- **Les serveurs sont situés aux États-Unis (Oregon).** C'est un transfert hors Union
  européenne, encadré par les clauses contractuelles types. Une migration vers un
  hébergement européen est envisagée.
- Lors d'une saisie en langage naturel, **seul le texte saisi** est transmis à un
  fournisseur d'IA pour analyse. Ni l'inventaire, ni le profil, ni les recettes.
- **Aucune revente de données, aucune publicité, aucun profilage publicitaire.**
- Suppression du compte depuis l'application, en deux étapes, avec effacement immédiat.
- Aucun courriel marketing n'est envoyé.

**Pourquoi le dire** : annoncer un hébergement européen qu'on n'a pas est le genre
d'approximation qui se retourne contre un produit. L'assumer est un signal de sérieux.

---

## 6. LES FORMULES

| | **Standard** | **Premium** | **Diamant** |
|---|---|---|---|
| **Prix** | Gratuit | **2,99 €/mois** | **4,99 €/mois** |
| Rangements | 2 | Illimités | Illimités |
| Scan de code-barres | Oui | Oui | Oui |
| Rappels de péremption | Oui | Oui | Oui |
| Liste + parcours magasin | Oui | Oui | Oui |
| Recettes depuis le stock | Oui | Oui | Oui |
| Widget écran d'accueil | Oui | Oui | Oui |
| Alertes allergènes | Oui | Oui | Oui |
| Mode hors-ligne | Oui | Oui | Oui |
| Synchronisation multi-appareils | — | Oui | Oui |
| Saisie dictée analysée par IA | — | — | Oui |
| Scan de ticket de caisse | — | — | Oui |
| Recettes générées par IA | — | — | Oui |
| Partage du foyer (4 personnes) | — | — | Oui |

**Essai gratuit de 7 jours** sur Premium et Diamant.
La carte bancaire est enregistrée au début de l'essai mais **n'est pas débitée pendant
les 7 jours**. Au 8ᵉ jour l'abonnement démarre automatiquement, la date exacte du premier
prélèvement étant affichée avant de commencer. Résiliation possible à tout moment avant
cette date, sans aucun prélèvement. Un seul essai par personne.

**La formule Standard est gratuite sans limite de durée et ne demande aucune carte.**

Facturation mensuelle. Aucune offre annuelle à ce jour.

**Positionnement tarifaire** — le marché des applications de gestion de stock alimentaire
se situe entre 3 et 10 $ par mois, avec une médiane autour de 5 à 7 $. SmartFridge se
place volontairement en bas de fourchette pour privilégier le volume d'utilisateurs.

---

## 7. CAPTURES D'ÉCRAN À UTILISER

Toutes en 1080 × 2400, prises sur un appareil Android réel, avec des données de
démonstration. Chemin : `design/captures/`

| Fichier | Écran | Slide suggérée |
|---|---|---|
| `ecran-frigo.png` | Inventaire du réfrigérateur, 4 aliments et jours restants | 5 — vue d'ensemble |
| `ecran-saisie-avant.png` | Phrase saisie avant analyse | 6 — remplir |
| `ecran-saisie-apres.png` | Articles reconnus, champs modifiables | 6 — remplir |
| `ecran-courses.png` | Liste de courses, vue Liste | 8 — parcours |
| `ecran-courses-panier.png` | **Vue Panier, rayons numérotés** | **8 — slide clé** |
| `ecran-recettes.png` | « À cuisiner ce soir » et idées de la semaine | 9 — cuisiner |
| `ecran-placard.png` | Autre rangement (placard) | 5 — multi-rangements |
| `ecran-abonnement-choix.png` | Comparatif des formules dans l'app | 12 — formules |
| `ecran-parametres.png` | Réglages et profil | facultatif |
| `ecran-formulaire-article.png` | Formulaire d'ajout détaillé | facultatif |

Le compte de démonstration est en formule Diamant : toutes les fonctions y sont visibles.

**Présentation des captures :** les afficher dans un cadre d'appareil sobre, sans ombre
portée excessive, sans inclinaison 3D. Ne jamais recadrer au point de masquer la barre
d'onglets du bas, qui montre la structure de l'application.

---

## 8. IDENTITÉ VISUELLE

| Rôle | Couleur | Usage |
|---|---|---|
| Bleu produit | `#0A7CD4` | Actions principales, titres de section |
| Bleu profond | `#0B2233` | Fonds sombres, texte principal |
| Fond clair | `#EAF4FD` | Fonds de slides alternés |
| Ambre | `#D97B06` | Péremption proche, stock faible — **jamais décoratif** |
| Rouge | `#D23B41` | Périmé, suppression — usage rare |
| Violet | `#8B3FD9` | Fonctions IA uniquement |

**Règle de couleur :** la couleur porte une information, elle ne décore pas. Rouge =
urgent, ambre = bientôt, vert/neutre = correct. C'est ce qui rend l'interface lisible en
un coup d'œil, et cela doit se retrouver dans la présentation.

**Typographie** — une seule famille sans empattement, deux graisses. Éviter les polices
fantaisie.

**Logo** : `public/logo.png` (512 × 512, fond transparent).

---

## 9. CE QUI N'EXISTE PAS ENCORE — NE PAS SUPPRIMER CETTE SLIDE

Une présentation qui n'admet aucune limite n'est pas crédible. Ces points assumés
renforcent tout le reste.

- **Android uniquement.** Pas de version iOS à ce stade — mieux vaut une plateforme qui
  fonctionne que deux à moitié.
- Le délai de rappel est fixé à 3 jours et n'est **pas encore réglable**.
- La synchronisation n'est **pas en temps réel** : elle s'effectue à l'ouverture de
  l'application et après chaque modification.
- Pas encore d'application sur montre connectée.
- Pas d'export automatisé des données depuis l'application — il se fait sur demande.
- L'application **n'est pas encore publiée** : aucun téléchargement, aucune note,
  aucun avis à ce jour.

---

## 10. LA SUITE

**Court terme**
- Publication sur Google Play.
- Réglage du délai de rappel par l'utilisateur.
- Migration de l'hébergement vers l'Union européenne.

**Moyen terme — mode tablette / écran de cuisine**

C'est la direction la plus prometteuse. Une interface conçue pour une tablette posée sur
le plan de travail ou fixée au réfrigérateur, utilisable **sans clavier** : une grille de
grandes vignettes tactiles, construite à partir des produits que l'utilisateur achète le
plus souvent. Un appui = un article ajouté.

Elle répond directement au problème de la section 2 : celui qui range ses courses n'a
plus besoin de sortir son téléphone. Aucun concurrent analysé ne le propose.

Cette fonctionnalité nécessite un historique d'achats pour être utile — elle n'a donc de
sens qu'une fois l'application adoptée.

---

## 11. PHRASES CLÉS RÉUTILISABLES

À placer telles quelles sur les slides :

- « Un foyer jette 465 € de nourriture par an. »
- « On ne jette pas par négligence. On jette parce qu'on oublie. »
- « Le vrai concurrent n'est pas une autre application : c'est le fait de ne rien noter. »
- « Une application d'inventaire meurt de sa propre saisie. »
- « Si enregistrer une course prend plus de quelques secondes, personne ne le fera. »
- « Votre liste de courses, dans l'ordre des rayons du magasin. »
- « Le rappel dit quoi faire, pas seulement quoi regretter. »
- « Chacun ses allergies, chacun ses alertes. »
