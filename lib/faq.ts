import { PLANS, APP_LIMITS, INFRA, BILLING, PLATFORM } from './constants'

/**
 * Source unique des questions fréquentes.
 *
 * Consommée deux fois : par le composant FAQ (affichage) et par le balisage
 * FAQPage dans app/layout.tsx (résultats enrichis Google). Garder les deux
 * synchronisés en les faisant lire le même tableau.
 *
 * Chaque réponse a été vérifiée contre le code de l'application.
 */
export const faqs = [
  {
    question: 'Sur quelles plateformes fonctionne SmartFridge ?',
    answer:
      `SmartFridge est une application ${PLATFORM.name}, développée et testée sur ${PLATFORM.requirement}. Une version iOS n’est pas prévue à ce stade — nous préférons faire fonctionner une plateforme correctement plutôt que deux à moitié.`,
  },
  {
    question: 'Puis-je utiliser SmartFridge sans connexion ?',
    answer:
      'Oui. Tout est enregistré d’abord sur votre appareil : ajouter, modifier et supprimer fonctionnent hors ligne. La synchronisation repart au prochain lancement ou retour dans l’application.',
  },
  {
    question: 'Comment fonctionne la saisie en langage naturel ?',
    answer:
      `Vous écrivez ou dictez votre course, par exemple « 2 yaourts nature, 500 g de jambon et 1 L de lait » (${APP_LIMITS.freeInputChars} caractères maximum). Le texte est envoyé à notre serveur puis à ${INFRA.aiProvider} qui le découpe en articles avec quantité, unité et durée de conservation estimée. Sans connexion, un dictionnaire embarqué prend le relais sur les aliments courants.`,
  },
  {
    question: 'Où sont hébergées mes données ?',
    answer:
      `Sur ${INFRA.database}, dans la région ${INFRA.region}. C’est un transfert hors Union européenne, encadré par les clauses contractuelles types de la Commission européenne. Nous prévoyons une migration vers un hébergement européen.`,
  },
  {
    question: 'Mes données sont-elles revendues ?',
    answer:
      'Non. Il n’y a ni revente, ni publicité, ni profilage publicitaire dans l’application. Seul le texte que vous soumettez à l’analyse quitte nos serveurs, vers notre fournisseur d’IA.',
  },
  {
    question: 'Combien de personnes peuvent partager un foyer ?',
    answer:
      `Jusqu’à ${APP_LIMITS.householdMembers + 1} au total : le propriétaire du foyer et ${APP_LIMITS.householdMembers} membres invités par email. Tous voient le même stock et la même liste de courses.`,
  },
  {
    question: 'Quand suis-je prévenu d’une péremption ?',
    answer:
      `${APP_LIMITS.expiryReminderDays} jours avant la date, par une notification sur votre téléphone. Le rappel est calculé sur l’appareil : il fonctionne même sans connexion. Ce délai n’est pas encore réglable.`,
  },
  {
    question: 'Y a-t-il une période d’essai ?',
    answer:
      `Oui : ${BILLING.trialDays} jours gratuits sur ${PLANS.premium.name} comme sur ${PLANS.diamant.name}. Votre carte est enregistrée au début de l’essai mais n’est pas débitée pendant les ${BILLING.trialDays} jours. Au 8e jour, l’abonnement démarre automatiquement — la date exacte du premier débit vous est indiquée avant de commencer. Vous pouvez résilier à tout moment avant cette date depuis ${BILLING.cancelPath} : aucun montant ne sera prélevé. Un seul essai par personne.`,
  },
  {
    question: 'Et si je ne veux pas donner ma carte ?',
    answer:
      `La formule ${PLANS.standard.name} est gratuite sans limite de durée et ne demande aucune carte bancaire. Elle donne accès au suivi des aliments, aux rappels de péremption, au scan de code-barres et à la liste de courses. C’est une vraie version utilisable, pas une démonstration limitée dans le temps.`,
  },
  {
    question: 'Comment supprimer mon compte ?',
    answer:
      'Réglages, puis « Supprimer mon compte ». L’application liste ce qui sera effacé et demande une confirmation écrite. La suppression est immédiate côté base et côté compte.',
  },
] as const
