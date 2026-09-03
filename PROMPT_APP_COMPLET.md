# SmartFridge — Cahier des charges : monétisation, foyer et multi-appareils

> Document unique à passer à la session de développement de l'application.
> Rédigé le 2 septembre 2026 depuis le projet du site vitrine.
> Remplace et consolide `PROMPT_ESSAI_GRATUIT.md` et `PROMPT_FOYER_MULTI_APPAREILS.md`.

---

## Sommaire

| Partie | Sujet | Statut |
|---|---|---|
| 0 | Moyen de paiement | **décidé** — achats intégrés natifs |
| 1 | Grille de fonctionnalités par formule | à coder |
| 2 | Essai gratuit de 7 jours | à coder |
| 3 | Multi-appareils et plafonds | à coder |
| 4 | Foyer partagé et parrainage | à coder |
| 5 | Vérification du foyer | recommandation |
| 6 | Mode tablette / écran de frigo | **idée v3, ne rien coder** |

**Ordre d'exécution conseillé :** 1, puis 2, puis 3 et 4 ensemble.

## Périmètre de cette version : Android uniquement

**iOS est reporté.** L'éditeur ne dispose pas d'appareil Apple et ne peut donc pas tester
un parcours d'achat iOS — livrer une monétisation non testée serait irresponsable.

Ce que cela change :

- **Seul Google Play Billing est à intégrer.** Aucun travail StoreKit.
- **Aucune inscription à un programme n'est nécessaire côté Google** : le taux de 15 % sur
  les abonnements (10 % de service + 5 % de facturation) est le taux standard, il n'y a
  pas d'équivalent du programme Apple Small Business à demander. À reconfirmer dans la
  Play Console au moment de créer les produits.
- **Le travail sur l'App Store est reporté**, y compris l'inscription au programme Apple
  Small Business — à faire le jour où un appareil iOS sera disponible.

### À faire dès maintenant pour ne pas avoir à tout refaire

Le code d'abonnement doit être **agnostique de la plateforme dès le premier jour**, même
avec un seul store branché. Concrètement :

- Une table serveur unique d'abonnements, avec une colonne `source`
  (`google_play` | `app_store` | `stripe`) et un statut normalisé, identique quelle que
  soit l'origine.
- **Le droit d'accès est porté par le compte SmartFridge**, jamais par le compte Google.
  Un utilisateur qui a payé sur Android doit retrouver son abonnement le jour où il ouvre
  l'app sur iPhone ou sur le web.
- La validation des reçus se fait **côté serveur uniquement**, dans un module isolé, pour
  qu'ajouter Apple plus tard consiste à écrire un second validateur et non à réécrire la
  logique d'accès.
- Ne pas nommer les produits ni les colonnes avec « google » dans la logique métier :
  `tier`, `subscription_status`, `renews_at`, pas `google_tier`.

Si ces quatre règles sont respectées, l'ajout d'iOS plus tard représentera quelques jours
de travail. Si elles ne le sont pas, ce sera une réécriture.

## Décisions déjà prises — ne pas les rouvrir

| Sujet | Décision |
|---|---|
| Plateforme de cette version | **Android uniquement**, iOS reporté |
| Moyen de paiement | **Google Play Billing** (15 % : 10 % service + 5 % facturation) |
| Pourquoi pas Stripe en app | Les 0,25 € fixes par transaction le rendent plus cher sous 8,93 € |
| Stripe conservé pour | Le web uniquement, en parcours secondaire |
| Essai gratuit | **7 jours, carte demandée**, débit automatique ensuite |
| Plafond d'appareils | **3** en Premium et Diamant, 1 en Standard |
| Quota gratuit | **5 analyses IA/mois** — pas de quota sur les modifications |
| Scan de code-barres | **Gratuit et illimité** dans toutes les formules |
| Qui paie le foyer | **Le propriétaire**, par paliers de référence |
| Vérification du foyer | **Pas de géolocalisation, pas d'IP** |

Le détail et le raisonnement de chacune sont dans les parties correspondantes.

---

## Contexte à connaître

Le site vitrine annonce aujourd'hui, en toutes lettres, qu'**il n'y a aucune période
d'essai**, et affiche les formules Standard / Premium (2,99 €) / Diamant (4,99 €).
Ces affirmations sont verrouillées par des tests automatisés.

**Chaque fois qu'une de ces choses change dans l'application, préviens le projet du
site** : page Tarifs, FAQ, CGU et politique de confidentialité doivent suivre.

---

# Partie 0 — Décision préalable : le moyen de paiement

## Ce qui a changé : Stripe n'est plus interdit dans l'UE

L'ancienne règle (« tout abonnement numérique passe par les achats intégrés, sinon
rejet ») **n'est plus applicable ici**. Le règlement européen sur les marchés numériques
(DMA) et l'arrêt Epic contre Apple l'ont démantelée.

La Martinique est en France, donc dans l'Union européenne : **c'est le régime DMA qui
s'applique**, le plus favorable des trois grandes zones.

### Apple — conditions UE effectives au 1er octobre 2026

Commissions **programme Apple Small Business inclus** (revenus sous 1 M$ par an,
inscription déclarative et gratuite) :

| Voie de paiement | Commission Apple |
|---|---|
| App Store + achats intégrés Apple | **15 %** |
| App Store + processeur alternatif dans l'app | **10 %** |
| Lien sortant vers le web | **10 %** |

Le Core Technology Fee par installation est remplacé par une **Core Technology Commission
de 5 %** sur les transactions des apps distribuées hors App Store.

Sous le DMA, **Apple ne peut plus empêcher de communiquer sur des moyens de paiement
alternatifs**, ni facturer cette communication. L'app peut afficher ses prix et renvoyer
vers le web.

### Google Play — programme Billing Choice, effectif depuis le 30 juin 2026

- frais de facturation : **5 %**, **non applicables** en facturation alternative ou lien
  externe
- facturation au choix de l'utilisateur : frais de service standard **moins 4 points**
- programme External Offers : liens sortants autorisés, avec avertissement de sécurité
- achat conclu hors app : frais d'acquisition de **5 %** pour un abonnement à
  reconduction automatique, plafonné à 2 ans

## DÉCISION : achats intégrés natifs (Apple StoreKit + Google Play Billing)

**Calcul fait, la voie native est la moins chère aux prix pratiqués.** Le résultat est
contre-intuitif et mérite d'être compris, parce qu'il changera si les prix montent.

### Les taux réels

| Acteur | Taux |
|---|---|
| Apple, achats intégrés (Small Business) | 15 % |
| Apple, paiement alternatif ou lien web | 10 % |
| Google Play Billing (10 % service + 5 % facturation) | 15 % |
| Google, facturation alternative (service seul) | 10 % |
| Stripe France, abonnement récurrent | 1,5 % + 0,7 % (Billing) + **0,25 € fixe** |

### Le piège : les 0,25 € fixes de Stripe

Sur une transaction de 2,99 €, les 0,25 € de frais fixes représentent **8,4 % à eux
seuls**. Le taux effectif de Stripe n'est donc pas 2,2 % mais :

```
2,2 % × 2,99 € = 0,066 €
+ 0,25 € fixe   = 0,316 €  →  10,6 % de 2,99 €
```

Les voies « à 10 % » empilent donc la commission du store **par-dessus** ces 10,6 %.

### Net encaissé sur un abonnement de 2,99 €

| Voie | Frais | Net | Part conservée |
|---|---|---|---|
| **Web seul** (hors store, Stripe) | 0,32 € | **2,67 €** | **89,4 %** |
| **Apple IAP** | 0,45 € | **2,54 €** | **85,0 %** |
| **Google Play Billing** | 0,45 € | **2,54 €** | **85,0 %** |
| Apple, paiement alternatif | 0,62 € | 2,38 € | 79,4 % |
| Apple, lien sortant web | 0,62 € | 2,38 € | 79,4 % |
| Google, facturation alternative | 0,62 € | 2,38 € | 79,4 % |

Sur 4,99 € : natif 4,24 € (85,0 %) contre alternatif 4,13 € (82,8 %). Le natif gagne
encore.

### Le seuil de bascule : 8,93 €/mois

En dessous de **8,93 €** par transaction, le natif est moins cher. Au-dessus, les voies
alternatives deviennent gagnantes, parce que les 0,25 € fixes se diluent.

```
natif       = 0,15 × P
alternatif  = 0,122 × P + 0,25
égalité     → P = 8,93 €
```

Les deux formules (2,99 € et 4,99 €) sont largement en dessous. **Le natif est le bon
choix, et il le restera tant que le prix mensuel ne dépasse pas ~9 €.**

À revoir si un jour un abonnement annuel est lancé : à 29,99 € par transaction, les voies
alternatives redeviennent nettement plus intéressantes (0,25 € fixe ne pèse plus que
0,8 %). Le calcul devra être refait par formule, pas globalement.

### En complément, pas à la place : proposer aussi le web

Le DMA autorise désormais à mentionner dans l'application qu'un abonnement est disponible
sur le site. Le web direct conserve **89,4 %** au lieu de 85,0 %.

Recommandation : **le natif comme parcours par défaut** (le plus simple, le moins cher au
prix pratiqué), et une mention discrète du site en second chemin pour ceux qui la
cherchent. Ne pas en faire le parcours principal : chaque sortie de l'application coûte
des conversions bien plus que les 4 points gagnés.

### Ce que la voie native apporte en plus du prix

Elle règle gratuitement une grande partie du travail décrit plus bas.

Apple et Google gèrent nativement :

- l'affichage légal du prix, de la date de premier débit et de la reconduction
- l'e-mail de rappel avant la fin de l'essai
- le parcours de résiliation en deux gestes
- l'authentification forte du moyen de paiement
- **un essai par compte Apple / compte Google et par groupe d'abonnement** — ce qui
  résout l'essentiel de l'anti-abus d'essai

Ce que la voie native complique, à anticiper :

- **La quantité variable n'existe pas dans les abonnements Apple** → voir partie 4.
- **Trois sources de vérité** (Apple, Google, Stripe pour le web) à réconcilier dans une
  table serveur unique, alimentée par les notifications serveur des trois, avec
  **validation des reçus côté serveur uniquement**, jamais côté client.
- **Un utilisateur qui paie sur iOS et ouvre l'app sur Android** doit retrouver son
  abonnement : c'est le compte SmartFridge qui porte le droit, pas le compte de
  plateforme.

## À faire aujourd'hui

1. **S'inscrire au programme Apple Small Business.** Gratuit, déclaratif, fait passer la
   commission de 30 % à 15 %.
2. Vérifier l'équivalent Google Play Console (palier réduit sous 1 M$).
3. **Trancher la voie avant d'écrire une ligne de code de monétisation.**

---

# Partie 1 — Grille de fonctionnalités par formule

## Principe directeur

Une version gratuite doit permettre de vivre **la boucle centrale complète** :
ajouter un aliment → être prévenu avant qu'il périme → ne pas le jeter.
Quelqu'un qui ne vit jamais ce moment ne s'abonnera jamais.

Ce qui se monétise n'est donc pas la boucle, mais :

1. **ce qui coûte de l'argent à chaque usage** (les appels à l'IA)
2. **ce qui sert plusieurs personnes ou plusieurs écrans** (synchronisation, foyer)
3. **ce qui fait gagner du confort** (rangements illimités, historique)

## Grille recommandée

| Fonctionnalité | Standard | Premium 2,99 € | Diamant 4,99 € |
|---|---|---|---|
| Ajout manuel d'aliments | ✅ illimité | ✅ | ✅ |
| **Scan de code-barres** | ✅ **illimité** | ✅ | ✅ |
| Rappels de péremption | ✅ | ✅ | ✅ |
| Liste de courses automatique | ✅ | ✅ | ✅ |
| Rangements | **2** | illimités | illimités |
| Mode hors-ligne | ✅ | ✅ | ✅ |
| **Saisie dictée / langage naturel** | **5 / mois** | illimitée | illimitée |
| Synchronisation multi-appareils | ❌ | ✅ | ✅ |
| Appareils simultanés | 1 | **3** | **3** par compte |
| Suggestions de recettes depuis le stock | ❌ | ✅ | ✅ |
| Alertes allergènes personnalisées | ✅ | ✅ | ✅ |
| **Membre d'un foyer** (invité) | ✅ | ✅ | ✅ |
| **Propriétaire d'un foyer** (inviter) | ❌ | ❌ | ✅ |
| Recettes générées par IA | ❌ | ❌ | ✅ |
| Scan photo par IA | ❌ | ❌ | ✅ |
| Scan de ticket de caisse *(v3)* | ❌ | ❌ | ✅ |

## Les trois décisions à comprendre

### Le scan de code-barres reste gratuit et illimité

C'est le meilleur outil d'acquisition du produit : il rend l'ajout d'aliments trivial
pour quelqu'un qui découvre l'app. Le placer derrière un paywall rend la version gratuite
pénible — et **personne ne convertit depuis une version pénible**.

Son coût marginal est par ailleurs quasi nul (lecteur local + Open Food Facts, gratuit).
Il n'y a aucune raison économique de le restreindre.

### Le quota porte sur l'IA, pas sur les modifications

Un quota de modifications (« il vous reste 12 modifications ce mois-ci ») est à proscrire :
ajouter et corriger des aliments **est** la boucle centrale, on le fait tous les jours, et
le compteur serait vécu comme une brimade incompréhensible.

En revanche, chaque saisie en langage naturel déclenche un appel facturé à un fournisseur
d'IA. **C'est un coût réel, variable, et directement attribuable à l'usage.** Un plafond y
est légitime, explicable en une phrase, et il pousse naturellement vers Premium ceux qui
en font un usage quotidien.

**5 analyses par mois** en Standard : assez pour comprendre la valeur de la fonction,
trop peu pour s'en servir à chaque course. Le compteur se réinitialise à date fixe et
reste visible dans l'écran de saisie, jamais en surprise au moment de valider.

Le repli hors-ligne (dictionnaire local) doit rester **illimité** en Standard : il ne
coûte rien et garde la fonction utilisable.

### Les alertes allergènes restent gratuites

Elles touchent à la sécurité alimentaire. Les monétiser serait indéfendable
commercialement et moralement. Elles restent dans toutes les formules — leur valeur
commerciale est ailleurs : **en foyer, chaque membre a ses propres allergies**, ce qu'un
compte partagé ne permet pas (voir partie 4).

---

# Partie 2 — Essai gratuit de 7 jours

## Décision retenue

**Carte bancaire demandée à l'inscription, prélèvement automatique à la fin des 7 jours.**
L'utilisateur accède immédiatement à la formule choisie.

Si la partie 0 aboutit aux achats intégrés natifs : Apple et Google gèrent l'essai
nativement (`introductoryOffer` / `freeTrialPeriod`), y compris les obligations
d'information et le rappel. Les sections 2.1, 2.3, 2.4, 2.5 et 2.7 deviennent alors sans
objet. **Conserver impérativement la partie 3 (source de vérité des droits).**

Si la partie 0 aboutit à Stripe : session Checkout en mode `subscription` avec
`subscription_data.trial_period_days = 7`, et tout ce qui suit s'applique.

## 2.1 Information avant le paiement

Avant le bouton de confirmation, sur le même écran, en texte lisible — pas dans un lien,
pas dans une case pré-cochée :

```
Essai gratuit de 7 jours, puis 2,99 €/mois.

Votre carte est enregistrée aujourd'hui mais ne sera pas débitée
pendant l'essai.

Le [DATE PRÉCISE], votre abonnement démarrera automatiquement et
votre carte sera débitée de 2,99 €, puis chaque mois.

Vous pouvez résilier à tout moment avant cette date depuis
Réglages → Abonnement. Aucun montant ne sera prélevé.
```

**La date doit être calculée et affichée en clair** (« le 9 septembre 2026 »), jamais
« dans 7 jours ». C'est ce qui distingue une information loyale d'une formulation
trompeuse.

Le bouton dit **« Commencer l'essai — puis 2,99 €/mois »**, pas « Continuer ».
Le prix figure sur le bouton qui engage.

## 2.2 Droit de rétractation — le point le plus risqué

Pour un service numérique, le consommateur européen dispose de 14 jours de rétractation.
Il peut y renoncer, **mais seulement s'il y consent expressément** et reconnaît perdre ce
droit. Sans ce consentement recueilli et horodaté, il peut exiger un remboursement
intégral pendant 14 jours, **même après avoir utilisé le service**.

Case à cocher **non pré-cochée**, distincte de l'acceptation des CGU :

```
☐ Je demande l'accès immédiat au service et je reconnais perdre mon
   droit de rétractation de 14 jours une fois l'essai commencé.
```

Enregistrer en base : date, heure, version des CGU acceptée.

## 2.3 Rappel avant le débit

Rappel **2 jours avant** la fin, par notification et par e-mail, avec la date, le montant
et le moyen de résilier. Stripe sait l'envoyer automatiquement (« Trial ending ») —
l'activer, et doubler d'une notification in-app.

Ce rappel n'est pas une politesse : son absence est l'argument numéro un dans les litiges
de prélèvement contesté.

## 2.4 Reconduction tacite

Le droit français impose d'informer clairement de la reconduction automatique et de rendre
la résiliation **aussi simple que la souscription** : accessible en deux gestes depuis les
réglages, jamais par e-mail au support.

## 2.5 Authentification forte (DSP2)

La carte est authentifiée à l'enregistrement, mais l'authentification peut être
**redemandée au premier débit**. Prévoir le cas : message clair, lien de régularisation,
et période de grâce avant fermeture des accès.

## 2.6 Base de données

Sur le profil utilisateur :

```
trial_tier          : text, nullable      -- 'premium' ou 'diamant'
trial_started_at    : timestamptz, null
trial_ends_at       : timestamptz, null
trial_consumed      : boolean, default false
retraction_waived_at: timestamptz, null
cgu_version         : text, null
```

`trial_consumed` ne repasse **jamais** à `false`. Un essai par utilisateur, à vie.

## 2.7 Anti-abus (uniquement si voie Stripe)

Avec les achats intégrés, Apple et Google limitent déjà à un essai par compte et par
groupe d'abonnement. **Cette section ne sert que si l'on reste sur Stripe.**

### Registre par empreinte, jamais d'e-mail en clair

Conserver l'adresse d'un compte supprimé contredit le droit à l'effacement. Stocker un
**hachage**, dans une table séparée des profils :

```
trial_registry
  email_hash       : text, clé primaire  -- SHA-256(e-mail normalisé + sel serveur)
  card_fingerprint : text, indexé, null  -- fourni par Stripe
  first_trial_at   : timestamptz
```

Normaliser avant de hacher : minuscules, espaces retirés, et pour les domaines
concernés, retirer les points et le suffixe `+alias` de la partie locale
(`j.dupont+x@gmail.com` et `jdupont@gmail.com` → même empreinte).

Le sel est un secret serveur. Le hachage rend l'entrée non réidentifiable : on vérifie
si une adresse *connue* a déjà servi, on ne peut pas reconstituer la liste.

Ce registre **survit à la suppression du compte** — c'est son intérêt. Le mentionner dans
la politique de confidentialité au titre de la prévention de la fraude (intérêt
légitime), avec sa durée de conservation (24 mois).

### L'empreinte de carte est la vraie barrière

Le registre d'e-mails ne bloque pas dix comptes avec dix adresses. La carte, si :
`PaymentMethod.card.fingerprint` est **identique pour une même carte, quel que soit le
client Stripe**. Ne stocker que cette empreinte — jamais le numéro, le nom du porteur ni
la date d'expiration.

### Vérification au démarrage

Côté serveur uniquement, de façon **atomique** (insertion et démarrage réussissent ou
échouent ensemble, sinon deux appels simultanés créent deux essais) :

1. normaliser et hacher l'e-mail
2. si l'empreinte existe → refuser l'essai, proposer l'abonnement direct, message
   honnête : « Un essai gratuit a déjà été utilisé avec cette adresse. »
3. sinon → insérer, poser les dates, créer la session

### Ce qu'il faut accepter

Aucune barrière n'est étanche (cartes prépayées, adresses jetables). L'objectif est de
rendre l'abus plus coûteux que l'abonnement. Deux barrières suffisent. **Ne pas ajouter
d'empreinte d'appareil** : intrusif, fragile, juridiquement délicat.

## 2.8 Interface

- **Pendant l'essai** : bandeau permanent « Essai Premium — il reste N jours », date de
  premier débit accessible en un tap. Compter en jours entiers ; le dernier jour, écrire
  « dernier jour », pas « 0 jour ».
- **Résiliation pendant l'essai** : bouton visible, confirmation précisant « aucun montant
  ne sera prélevé ».
- **À l'expiration sans résiliation** : débit, accès continu sans rupture.
- **Après résiliation** : retour en Standard à la fin de la période. **Aucune donnée
  supprimée** — les rangements au-delà de la limite passent en lecture seule.

## 2.9 Cas limites

- **Hors-ligne** : date de fin connue en local pour ne pas bloquer un utilisateur
  légitime, mais le serveur reste l'autorité dès qu'il y a du réseau.
- **Horloge de l'appareil** : ne jamais calculer l'expiration sur l'heure du téléphone
  seule.
- **Déjà abonné** : ne jamais proposer l'essai.
- **Suppression de compte pendant l'essai** : annuler l'abonnement côté serveur, sinon le
  débit a lieu sur un compte inexistant. L'entrée anti-abus est conservée.

## 2.10 Mesure

Enregistrer : essai démarré, résilié avant terme, premier débit réussi, premier débit
échoué, résiliation après conversion. Sans cela, impossible de savoir s'il faut passer à
14 jours ou changer d'approche.

## 2.11 À ne pas faire

- Pas de compte à rebours anxiogène ni de fenêtre modale répétée.
- Ne pas dégrader l'expérience pendant l'essai : il doit montrer le produit complet.
- Ne jamais supprimer de données à l'expiration.
- Ne pas rendre la résiliation plus difficile que la souscription.

---

# Partie 3 — Multi-appareils et plafonds

## Une seule source de vérité pour les droits

**Point technique le plus important de tout ce document.** Les vérifications de formule
sont aujourd'hui dispersées (bouton IA du dock, gestion du foyer, suggestions de recettes,
synchronisation). Il faut **une fonction unique** :

```
fun currentTier(profile): Tier
    si abonnement actif                  -> la formule payée
    sinon si trial_ends_at > maintenant  -> trial_tier
    sinon                                -> Standard
```

Tout passe par là. Une vérification oubliée = un utilisateur en essai privé d'une fonction
qu'il a payée, ou l'inverse.

Cette fonction doit **exister aussi côté serveur** : le client peut mentir sur sa date.
Le serveur reste l'autorité pour l'IA, le foyer partagé et la synchronisation.

## Pourquoi un plafond d'appareils est indispensable

Un raisonnement séduisant mais faux : « pas besoin de plafond, deux foyers qui partagent
un compte verraient leurs frigos mélangés, le produit s'auto-protège ».

**Vrai entre foyers différents. Totalement faux au sein d'un même foyer** — la cible même
de la formule Diamant. Une famille de quatre *veut* le même frigo. Sans plafond, elle
installe l'app sur quatre téléphones avec un seul compte Premium à 2,99 €, obtient
exactement le stock partagé, et Diamant plus le parrainage ne servent à rien.

**Le plafond d'appareils est le mécanisme qui rend la formule foyer vendable.**

## Plafonds

| Formule | Appareils actifs simultanés |
|---|---|
| Standard | 1 (pas de synchronisation cloud) |
| Premium | **3** |
| Diamant — propriétaire | **3** |
| Diamant — chaque membre du foyer | **3** sur son propre compte |

**Pourquoi 3.** Le plafond doit se situer **au-dessus du besoin d'une personne et en
dessous de celui d'un foyer**. Une personne seule a besoin de téléphone + écran de cuisine
= 2 ; le troisième emplacement absorbe le changement de téléphone et la tablette de
remplacement, et supprime la quasi-totalité des demandes d'assistance. Une famille de
quatre a besoin de quatre téléphones plus l'écran de cuisine : elle ne tiendra jamais
dans 3.

À 2, un couple tiendrait dans un seul Premium et n'aurait aucune raison de passer en
Diamant.

## Ce qui rend le plafond acceptable

- **Gestion des appareils en libre-service** : liste des appareils connectés dans les
  réglages, bouton « Déconnecter » sur chacun. C'est ce qui supprime le ticket « j'ai
  changé de téléphone et je suis bloqué ».
- **Message clair au dépassement** — c'est aussi l'argumentaire de vente :
  « Vous êtes connecté sur 3 appareils. Déconnectez-en un, ou passez en Diamant pour que
  chaque membre du foyer ait son propre compte. »
- **Compter les appareils, pas les connexions** : identifiant d'installation stable,
  expiration automatique après 60 jours d'inactivité.

## Synchronisation multi-appareils

- **Résolution des conflits** : règle actuelle « dernière écriture gagne », acceptable.
- **Déclencher la synchronisation au retour au premier plan** sur chaque appareil.
- **Écran toujours allumé** : un appareil fixe ne repasse jamais « au premier plan ».
  Prévoir une synchronisation périodique (2 à 5 minutes) dans ce mode.
- **Déconnexion à distance** : à livrer avec le multi-appareils, pas après.

**Première tâche à vérifier :** d'après l'inventaire du code, aucune limite de sessions
n'existe aujourd'hui. Tester le multi-appareils réel avant de coder quoi que ce soit — il
fonctionne peut-être déjà, auquel cas il n'y a que le plafond à ajouter.

---

# Partie 4 — Foyer partagé et parrainage

## Le modèle

Le premier abonné (formule Diamant) est **propriétaire du foyer**. Il partage un lien de
parrainage. Chaque personne qui le rejoint crée **son propre compte**, avec son profil, ses
régimes et ses allergies, et voit le **même stock et la même liste de courses**.

## Qui peut être membre, et à quel prix

C'est le point qui structure tout le reste.

| Statut du membre | Ce qu'il voit | Ce qu'il peut faire | Prix |
|---|---|---|---|
| **Membre Standard** (gratuit) | stock et liste partagés, complets | ajout manuel et scan illimités, rappels, 5 analyses IA/mois, 1 appareil | **0 €** |
| **Membre parrainé** | idem | tout Premium sur son compte : 3 appareils, IA illimitée, recettes | **2,99 €** |
| **Propriétaire** | idem | tout Diamant, invite et retire les membres | **4,99 €** |

**Pourquoi laisser entrer des membres gratuits.** Un membre Standard dans un foyer n'est
pas un revenu perdu : c'est un utilisateur déjà installé, déjà actif, qui vit la boucle
centrale tous les jours et se heurte au plafond de 5 analyses IA et à la limite d'un seul
appareil. C'est le meilleur candidat à la conversion que le produit puisse avoir. Le
bloquer à l'entrée ferait simplement renoncer toute la famille.

**Ce qui distingue un membre payant.** Pas l'accès au stock — l'accès à *ses* outils :
l'IA sans compteur, ses trois appareils, les recettes. Et surtout, sur un compte
individuel, **ses propres allergies et régimes**.

## L'argument qui vend le foyer

Sur un compte partagé entre quatre personnes, il n'y a **qu'un seul profil**. Donc un seul
jeu de régimes et d'intolérances : les alertes allergènes deviennent fausses pour tout le
monde, et les suggestions de recettes sont une moyenne qui ne convient à personne.

En foyer, chacun a son compte, donc **ses allergies, ses régimes, ses recettes et ses
notifications**. C'est un argument de sécurité alimentaire, pas une brimade commerciale —
il se défend sans agressivité et c'est le plus fort dont dispose le produit.

C'est cette liste, et non le plafond d'appareils, qu'il faut mettre en avant sur l'écran
de vente.

## Qui paie : DÉCIDÉ — le propriétaire paie pour tout le monde

**Un seul moyen de paiement, une seule facture, aucune friction pour les membres.**
L'abonnement du propriétaire monte de palier à chaque membre payant ajouté.

Pourquoi ce choix : c'est le propriétaire, déjà convaincu et déjà payant, qui porte l'acte
d'achat. L'alternative — chaque membre paie sa part sur son propre compte — imposerait un
tunnel de paiement complet par personne, avec son taux d'abandon : un adolescent n'a pas
de carte, un conjoint peut refuser d'en sortir une « pour une app de frigo ».

C'est aussi la seule voie réellement praticable avec les achats intégrés : un seul
abonnement à suivre au lieu de quatre à synchroniser.

Une famille de trois rapporte **10,97 €** au lieu de 4,99 € avec un forfait famille à prix
fixe.

**Note sur le modèle de référence.** C'est la forme qu'utilisent Netflix, Spotify Family
et Apple One : un payeur, une facture, plusieurs utilisateurs. À une nuance près, qui est
précisément celle retenue ici — **aucun de ces services ne facture au membre**. Ils
vendent des **paliers** (nombre d'écrans chez Netflix, prix fixe jusqu'à 6 personnes chez
Spotify). La structure en quatre références ci-dessous est exactement cette logique de
palier, et c'est aussi ce que les achats intégrés Apple imposent.

### Conséquence de la partie 0 : références par taille de foyer

**Google Play Billing ne gère pas la quantité variable** sur un abonnement, pas plus que
les abonnements Apple. Le modèle « la facture du propriétaire augmente à chaque membre »
ne se transpose donc pas tel quel — même en restant sur Android.

**Solution retenue : des références distinctes par taille de foyer.**

| Référence | Contenu | Prix |
|---|---|---|
| `diamant_solo` | propriétaire seul | 4,99 € |
| `diamant_foyer_2` | propriétaire + 1 membre payant | 7,98 € |
| `diamant_foyer_3` | propriétaire + 2 membres payants | 10,97 € |
| `diamant_foyer_4` | propriétaire + 3 membres payants | 13,96 € |

À créer dans la **Play Console** comme quatre **plans de base d'un même abonnement**
(et non quatre abonnements distincts). Google gère alors nativement le passage d'un plan
à l'autre avec proratisation : l'entrée d'un membre déclenche une montée de palier, sa
sortie une descente en fin de période.

Reproduire la même structure dans App Store Connect le jour où iOS sera livré, en
conservant des identifiants de produit identiques à un préfixe près — cela évitera de
réconcilier deux nomenclatures.

Les membres qui restent en **Standard gratuit** ne changent rien à la référence du
propriétaire — seuls les membres payants la font évoluer.

**Créer ces quatre références dès le départ**, même si le foyer n'est pas encore
développé : réorganiser un groupe d'abonnement avec des abonnés actifs dessus est pénible,
et les créer à l'avance ne coûte rien.

## Lien de parrainage

- Généré depuis « Gestion du foyer », propre à chaque foyer.
- **Jeton opaque non devinable** (UUID v4 ou 32 caractères aléatoires), jamais
  l'identifiant du foyer.
- **Expiration 7 jours**, régénérable. Un lien permanent qui fuite ouvre le foyer à des
  inconnus.
- **Révocable** à tout moment par le propriétaire.
- Limité par la taille maximale du foyer (3 membres + propriétaire).

## Parcours du membre

1. Il ouvre le lien → l'app s'ouvre (deep link) ou propose l'installation.
2. Il crée son compte.
3. **Avant validation**, un écran indique clairement dans quel foyer il entre :
   « Vous rejoignez le foyer de [prénom]. Vous partagerez le même stock et la même liste
   de courses. Votre profil, vos allergies et vos recettes restent privés. »
4. Le foyer est rejoint. Il reste en Standard, ou passe au tarif parrainé.

## Départ du foyer — le point à ne pas rater

- **Aucune donnée supprimée.** La personne récupère un stock personnel vide et conserve
  son profil, ses recettes et ses préférences.
- Son tarif repasse au prix plein **à la fin de la période déjà payée**, jamais
  immédiatement. Un prélèvement imprévu est un litige.
- Elle est **prévenue par notification et e-mail** avant tout changement de tarif.
- Le propriétaire ne peut pas retirer quelqu'un sans que la personne en soit informée.

## Cas limites

- **Le propriétaire résilie** : laisser aux membres leur tarif jusqu'à la fin de la
  période, puis leur proposer de reprendre le foyer à leur compte. Ne jamais couper tout
  le monde du jour au lendemain.
- **Le propriétaire supprime son compte** : proposer le transfert de propriété au membre
  le plus ancien avant suppression.
- **Un membre veut son propre foyer** : il quitte et crée le sien.
- **Fusion de deux foyers** : ne pas gérer, c'est marginal.

---

# Partie 5 — Vérifier qu'il s'agit d'un même foyer

## Recommandation : ne pas contrôler la localisation

Deux pistes ont été envisagées — contrôle de l'adresse IP, et suivi de position avec perte
d'accès après 30 jours d'absence. **Les deux sont à écarter.**

**La géolocalisation en arrière-plan fera rejeter l'application.** Apple exige qu'une
permission de localisation en arrière-plan serve une fonctionnalité utile *à
l'utilisateur*. Vérifier qu'il ne partage pas son abonnement est un usage au bénéfice de
l'éditeur : motif de rejet documenté. Google applique une politique comparable.

**L'adresse IP ne mesure pas ce qu'on croit.** En 4G/5G, l'opérateur attribue une adresse
partagée sans rapport avec le domicile : **deux personnes sur le même canapé auront deux
adresses différentes**. À l'inverse, un immeuble entier sort sur une seule adresse. Les
VPN faussent tout. Le signal est bruité dans les deux sens.

**Le RGPD.** Suivre en continu la position pour contrôler un abonnement est
disproportionné au regard de la finalité. La localisation est une donnée sensible et le
principe de minimisation s'applique pleinement.

**La règle des 30 jours frapperait les meilleurs clients :** l'étudiant qui vit sur son
campus, l'enfant en garde alternée, le conjoint en mission longue, le routier, le marin,
une hospitalisation, cinq semaines de vacances. Ce sont exactement les familles nombreuses
visées par le foyer partagé. Les couper de leur liste de courses génère un avis 1 étoile
et une demande de remboursement.

**Précédent du secteur :** Netflix a déployé un contrôle de foyer par IP en 2023 — crise
de réputation, vague de résiliations, recul partiel. Spotify Family demande une adresse
**déclarée une fois, non vérifiée en continu**. C'est le standard de fait.

**Et l'enjeu ne le justifie pas.** Le pire abus possible : trois personnes qui ne vivent
pas ensemble paient 2,99 € au lieu de 4,99 €. Le manque à gagner est de 2 € par mois et
par personne. Le coût d'un faux positif — client furieux, avis public, remboursement — est
bien supérieur.

## À faire à la place

**1. Plafonner la taille du foyer.** Déjà en place : 3 membres + propriétaire.

**2. Limiter les rotations.** Un membre retiré ne libère sa place qu'après 7 jours, et un
compte ne peut rejoindre que 2 ou 3 foyers différents sur 12 mois. Cela tue le « foyer
tournant » sans jamais gêner une vraie famille — une famille ne change pas de composition
toutes les semaines.

**3. Adresse du foyer déclarée, non vérifiée.** À la création, demander l'adresse au
propriétaire avec la mention « les membres du foyer doivent résider à cette adresse ».
Ne pas la vérifier. Effet **dissuasif et contractuel** : elle rend l'abus conscient et
fournit une base pour fermer un foyer manifestement détourné. Modèle Spotify.

**Si un contrôle plus ferme devenait nécessaire** — et seulement si les chiffres montrent
un abus réel — la mesure la moins intrusive est d'exiger le **même moyen de paiement**
pour tout le foyer. Aucune donnée nouvelle, aucune permission système. Avec l'option B
(le propriétaire paie), c'est automatique : il n'y a qu'une carte.

---

# Partie 6 — Mode tablette / écran de frigo — IDÉE v3

> **Ne rien coder.** Note d'intention à archiver.

## Le problème résolu

Quelqu'un rentre des courses. Il n'a pas noté ses achats, et ce qu'il a acheté ne venait
pas de sa liste. Aujourd'hui il devrait sortir son téléphone. En pratique il ne le fera
pas — et l'inventaire se désynchronise du frigo réel. **C'est le point de rupture
principal de cette catégorie d'application**, celui qui provoque les désinstallations.

## Le geste visé

Il range ses courses, tape sur l'écran collé au frigo : une icône de beurre, une de lait,
une de yaourts. Trois taps, l'inventaire est à jour.

## Ce que ça implique

- **Grandes vignettes tactiles**, bien au-delà des 44 px habituels — une tablette de
  cuisine se manipule debout, parfois les mains humides.
- Les vignettes viennent de **l'historique de l'utilisateur**, triées par fréquence
  d'ajout. Pas d'un catalogue générique. Au bout de quelques semaines, une vingtaine de
  produits couvre l'essentiel des courses d'un foyer.
- **Un tap = +1 unité**, avec la quantité et la durée de conservation déjà connues pour ce
  produit. Appui long ou boutons `−` / `+` pour ajuster.
- Retour visuel immédiat et **annulable d'un geste**.
- **Orientation paysage**, pas de scroll profond, aucune saisie clavier obligatoire.
- Le foyer est déjà connecté : pas de ré-authentification par geste. En contrepartie,
  réfléchir à ce qu'un écran partagé de cuisine ne doit **pas** afficher — facturation,
  suppression de compte, données personnelles des autres membres.
- Écran allumé en permanence : veille sombre, protection contre le marquage d'écran,
  retour à l'accueil après inactivité.

## Pourquoi c'est stratégique

C'est la fonctionnalité qui transforme un usage épisodique en usage quotidien, et **aucun
concurrent direct identifié ne la propose** — les huit applications comparées sont toutes
mobile-only. Elle justifie aussi le plafond de 3 appareils : l'écran de cuisine occupe un
emplacement, ce qui rend le multi-appareils concret et désirable.

## Pourquoi en v3

La grille se construit à partir de l'historique de l'utilisateur. Sans utilisateurs actifs
et sans historique, l'écran est vide et l'idée ne fonctionne pas. **Elle a besoin que l'app
mobile soit adoptée pour exister.**

## À trancher le moment venu

Le support visé : la **tablette Android bon marché** posée sur le plan de travail est le
vrai marché (60 €, tout le monde en a une qui traîne, aucun partenariat nécessaire).
L'écran de frigo connecté type Samsung Family Hub est un marché minuscule et une
intégration lourde — c'est un argument de communication, pas un volume.

Et décider s'il s'agit d'une vue de l'application existante ou d'une application distincte.

---

# À renvoyer au projet du site une fois décidé

- La voie de paiement retenue (partie 0)
- La grille de fonctionnalités définitive (partie 1) et le quota IA réel
- Durée d'essai, moyen de paiement, comportement à l'expiration (partie 2)
- Les plafonds d'appareils réellement implémentés (partie 3)
- Option A ou B pour le paiement du foyer, et le tarif parrainé (partie 4)
- La mesure anti-abus retenue (partie 5)

Le site mettra alors à jour : page Tarifs, page Fonctionnalités, FAQ, CGU, politique de
confidentialité, et les tests automatisés qui verrouillent ces affirmations.
