export const bookData = {
  title: "Comment Réussir sa Vie en 10 Étapes",
  subtitle: "Un guide interactif pour transformer votre vie",
  author: "Guide de Développement Personnel",
  totalSteps: 10,
  userProgress: {
    currentStep: 1,
    completedSteps: [],
    notes: {},
    quizResults: {}
  },
  steps: [
    {
      id: 1,
      title: "Définir sa Vision et ses Objectifs",
      description: "Créez une vision claire de votre avenir et fixez des objectifs SMART",
      content: `
        <h3>Pourquoi définir une vision est crucial ?</h3>
        <p>Sans vision claire, nous naviguons à l'aveugle dans la vie. Une vision bien définie devient votre étoile du nord, guidant chaque décision et action.</p>
        
        <h4>Les étapes pour créer votre vision :</h4>
        <ul>
          <li><strong>Réflexion profonde :</strong> Prenez du temps seul pour réfléchir à vos valeurs fondamentales</li>
          <li><strong>Visualisation :</strong> Imaginez votre vie idéale dans 5-10 ans</li>
          <li><strong>Écriture :</strong> Mettez votre vision par écrit de manière détaillée</li>
          <li><strong>Objectifs SMART :</strong> Transformez votre vision en objectifs Spécifiques, Mesurables, Atteignables, Réalistes et Temporellement définis</li>
        </ul>

        <h4>Exercice pratique :</h4>
        <p>Décrivez en détail où vous vous voyez dans 5 ans : carrière, relations, santé, finances, développement personnel.</p>
      `,
      exercise: {
        type: "text",
        question: "Décrivez votre vision de vie idéale dans 5 ans en 3-5 phrases claires :",
        placeholder: "Dans 5 ans, je me vois..."
      },
      keyPoints: [
        "Une vision claire guide vos décisions quotidiennes",
        "Les objectifs SMART transforment les rêves en réalité",
        "La révision régulière de vos objectifs est essentielle"
      ]
    },
    {
      id: 2,
      title: "Développer une Mentalité de Croissance",
      description: "Adoptez une attitude positive face aux défis et aux échecs",
      content: `
        <h3>Mentalité fixe vs Mentalité de croissance</h3>
        <p>Carol Dweck a révolutionné notre compréhension du succès en identifiant deux types de mentalités :</p>
        
        <h4>Mentalité fixe :</h4>
        <ul>
          <li>Croit que les capacités sont innées et immuables</li>
          <li>Évite les défis par peur de l'échec</li>
          <li>Considère l'effort comme un signe de faiblesse</li>
        </ul>

        <h4>Mentalité de croissance :</h4>
        <ul>
          <li>Croit que les capacités peuvent être développées</li>
          <li>Voit les défis comme des opportunités d'apprentissage</li>
          <li>Considère l'effort comme le chemin vers la maîtrise</li>
        </ul>

        <h4>Comment développer une mentalité de croissance :</h4>
        <ol>
          <li><strong>Remplacez "Je ne sais pas" par "Je ne sais pas encore"</strong></li>
          <li><strong>Célébrez l'effort autant que les résultats</strong></li>
          <li><strong>Apprenez de vos erreurs au lieu de les ignorer</strong></li>
          <li><strong>Cherchez des feedbacks constructifs</strong></li>
        </ol>
      `,
      exercise: {
        type: "multiple",
        question: "Quelle phrase reflète le mieux une mentalité de croissance ?",
        options: [
          "Je ne suis pas doué pour ça",
          "Je ne suis pas encore doué pour ça",
          "C'est trop difficile pour moi",
          "Les autres sont plus talentueux"
        ],
        correctAnswer: 1
      },
      keyPoints: [
        "L'échec est une opportunité d'apprentissage, pas une définition de soi",
        "L'effort et la persévérance surpassent souvent le talent naturel",
        "Chaque défi est une chance de grandir et de s'améliorer"
      ]
    },
    {
      id: 3,
      title: "Gérer son Temps Efficacement",
      description: "Maîtrisez l'art de la productivité et de la priorisation",
      content: `
        <h3>Le temps : votre ressource la plus précieuse</h3>
        <p>Contrairement à l'argent, le temps ne peut pas être récupéré une fois dépensé. Une gestion efficace du temps est donc cruciale pour atteindre vos objectifs.</p>
        
        <h4>Principes fondamentaux :</h4>
        <ol>
          <li><strong>Matrice d'Eisenhower :</strong>
            <ul>
              <li>Urgent + Important : À faire immédiatement</li>
              <li>Non urgent + Important : À planifier</li>
              <li>Urgent + Non important : À déléguer</li>
              <li>Non urgent + Non important : À éliminer</li>
            </ul>
          </li>
          <li><strong>Règle des 80/20 (Pareto) :</strong> 20% de vos efforts produisent 80% de vos résultats</li>
          <li><strong>Technique Pomodoro :</strong> 25 minutes de travail intense, 5 minutes de pause</li>
        </ol>

        <h4>Stratégies pratiques :</h4>
        <ul>
          <li>Planifiez votre journée la veille</li>
          <li>Identifiez vos heures de peak performance</li>
          <li>Éliminez les distractions (réseaux sociaux, notifications)</li>
          <li>Apprenez à dire "non" aux demandes non prioritaires</li>
        </ul>
      `,
      exercise: {
        type: "text",
        question: "Listez 3 activités que vous pourriez éliminer pour gagner plus de temps productif :",
        placeholder: "1. \n2. \n3. "
      },
      keyPoints: [
        "Priorisez l'important sur l'urgent",
        "Une heure de planification économise trois heures d'exécution",
        "Apprenez à dire non pour protéger votre temps"
      ]
    },
    {
      id: 4,
      title: "Construire des Relations Positives",
      description: "Développez votre réseau et entretenez des relations enrichissantes",
      content: `
        <h3>L'importance du capital social</h3>
        <p>Le succès dans la vie dépend largement de la qualité de nos relations. Un réseau solide ouvre des portes, offre du soutien et enrichit notre expérience de vie.</p>
        
        <h4>Principes des relations saines :</h4>
        <ul>
          <li><strong>Réciprocité :</strong> Donnez avant de recevoir</li>
          <li><strong>Authenticité :</strong> Soyez vrai et sincère dans vos interactions</li>
          <li><strong>Écoute active :</strong> Concentrez-vous vraiment sur ce que l'autre dit</li>
          <li><strong>Empathie :</strong> Cherchez à comprendre les perspectives d'autrui</li>
        </ul>

        <h4>Comment construire votre réseau :</h4>
        <ol>
          <li><strong>Rejoignez des communautés alignées avec vos intérêts</strong></li>
          <li><strong>Participez à des événements professionnels et sociaux</strong></li>
          <li><strong>Offrez votre aide sans attendre de retour immédiat</strong></li>
          <li><strong>Maintenez le contact régulièrement</strong></li>
        </ol>

        <h4>Gérer les relations difficiles :</h4>
        <p>Établissez des limites claires, communiquez vos besoins et n'hésitez pas à vous éloigner des relations toxiques qui drainent votre énergie.</p>
      `,
      exercise: {
        type: "multiple",
        question: "Quelle est la clé d'une relation professionnelle réussie ?",
        options: [
          "Toujours avoir raison dans les discussions",
          "Donner de la valeur avant d'en attendre",
          "Éviter les conflits à tout prix",
          "Se concentrer uniquement sur ses propres besoins"
        ],
        correctAnswer: 1
      },
      keyPoints: [
        "Investissez dans les relations à long terme, pas seulement quand vous en avez besoin",
        "La qualité des relations prime sur la quantité",
        "Sachez vous entourer de personnes qui vous tirent vers le haut"
      ]
    },
    {
      id: 5,
      title: "Prendre Soin de sa Santé Physique et Mentale",
      description: "Établissez les fondations d'une vie équilibrée et énergique",
      content: `
        <h3>La santé : votre plus grand investissement</h3>
        <p>Sans santé, tous vos autres objectifs perdent leur sens. Investir dans votre bien-être physique et mental est le fondement de toute réussite durable.</p>
        
        <h4>Piliers de la santé physique :</h4>
        <ol>
          <li><strong>Exercise régulier :</strong>
            <ul>
              <li>30 minutes d'activité modérée par jour</li>
              <li>Combinaison cardio et renforcement musculaire</li>
              <li>Trouvez une activité que vous aimez</li>
            </ul>
          </li>
          <li><strong>Alimentation équilibrée :</strong>
            <ul>
              <li>Privilégiez les aliments non transformés</li>
              <li>Hydratez-vous suffisamment (8 verres d'eau/jour)</li>
              <li>Écoutez les signaux de faim et satiété</li>
            </ul>
          </li>
          <li><strong>Sommeil de qualité :</strong>
            <ul>
              <li>7-9 heures par nuit</li>
              <li>Routine de coucher régulière</li>
              <li>Environnement propice au repos</li>
            </ul>
          </li>
        </ol>

        <h4>Santé mentale :</h4>
        <ul>
          <li><strong>Méditation et pleine conscience :</strong> 10-15 minutes par jour</li>
          <li><strong>Gestion du stress :</strong> Techniques de respiration, yoga</li>
          <li><strong>Équilibre social :</strong> Temps avec les proches</li>
          <li><strong>Aide professionnelle :</strong> N'hésitez pas à consulter si nécessaire</li>
        </ul>
      `,
      exercise: {
        type: "text",
        question: "Créez un plan santé personnel. Listez 3 habitudes que vous allez adopter cette semaine :",
        placeholder: "1. Santé physique : \n2. Alimentation : \n3. Bien-être mental : "
      },
      keyPoints: [
        "Votre corps est votre temple, prenez-en soin quotidiennement",
        "La santé mentale est aussi importante que la santé physique",
        "Les petites habitudes quotidiennes créent de grands changements"
      ]
    },
    {
      id: 6,
      title: "Développer ses Compétences Continuellement",
      description: "Restez compétitif grâce à l'apprentissage permanent",
      content: `
        <h3>L'apprentissage continu : clé de l'adaptabilité</h3>
        <p>Dans un monde en constante évolution, ceux qui cessent d'apprendre deviennent obsolètes. L'apprentissage continu vous garde pertinent et ouvre de nouvelles opportunités.</p>
        
        <h4>Stratégies d'apprentissage efficaces :</h4>
        <ol>
          <li><strong>Règle des 1% :</strong> Améliorez-vous de 1% chaque jour</li>
          <li><strong>Apprentissage multimodal :</strong>
            <ul>
              <li>Livres et articles (lecture)</li>
              <li>Podcasts et vidéos (écoute)</li>
              <li>Cours en ligne (interaction)</li>
              <li>Pratique et application (kinesthésique)</li>
            </ul>
          </li>
          <li><strong>Technique Feynman :</strong> Expliquez ce que vous apprenez à quelqu'un d'autre</li>
        </ol>

        <h4>Compétences à développer prioritairement :</h4>
        <ul>
          <li><strong>Compétences numériques :</strong> Adaptez-vous aux nouvelles technologies</li>
          <li><strong>Compétences relationnelles :</strong> Communication, négociation, leadership</li>
          <li><strong>Pensée critique :</strong> Analyse, résolution de problèmes</li>
          <li><strong>Créativité :</strong> Innovation et pensée originale</li>
          <li><strong>Adaptabilité :</strong> Flexibilité face au changement</li>
        </ul>

        <h4>Créez votre plan de développement :</h4>
        <p>Identifiez les compétences nécessaires pour vos objectifs, créez un plan d'apprentissage structuré et consacrez du temps quotidien à votre développement.</p>
      `,
      exercise: {
        type: "text",
        question: "Identifiez 2 compétences que vous devez développer pour atteindre vos objectifs professionnels :",
        placeholder: "Compétence 1 : \nPlan d'action : \n\nCompétence 2 : \nPlan d'action : "
      },
      keyPoints: [
        "L'apprentissage continu est un investissement, pas une dépense",
        "Diversifiez vos sources d'apprentissage pour maximiser la rétention",
        "Pratiquez immédiatement ce que vous apprenez"
      ]
    },
    {
      id: 7,
      title: "Gérer ses Finances Intelligemment",
      description: "Créez une sécurité financière et investissez dans votre avenir",
      content: `
        <h3>L'indépendance financière : liberté de choix</h3>
        <p>Une gestion financière saine vous donne la liberté de faire des choix basés sur vos valeurs plutôt que sur la nécessité économique.</p>
        
        <h4>Principes fondamentaux :</h4>
        <ol>
          <li><strong>Budget 50/30/20 :</strong>
            <ul>
              <li>50% : Besoins essentiels (logement, nourriture, transport)</li>
              <li>30% : Plaisirs et loisirs</li>
              <li>20% : Épargne et investissements</li>
            </ul>
          </li>
          <li><strong>Fonds d'urgence :</strong> 3-6 mois de dépenses courantes</li>
          <li><strong>Élimination des dettes :</strong> Commencez par les dettes à taux élevé</li>
        </ol>

        <h4>Stratégies d'investissement :</h4>
        <ul>
          <li><strong>Diversification :</strong> Ne mettez pas tous vos œufs dans le même panier</li>
          <li><strong>Investissement régulier :</strong> Dollar cost averaging</li>
          <li><strong>Horizon long terme :</strong> Le temps est votre meilleur allié</li>
          <li><strong>Formation financière :</strong> Éduquez-vous avant d'investir</li>
        </ul>

        <h4>Habitudes financières saines :</h4>
        <ul>
          <li>Suivez vos dépenses quotidiennement</li>
          <li>Négociez vos factures régulièrement</li>
          <li>Automatisez vos épargnes</li>
          <li>Révisez votre budget mensuellement</li>
        </ul>
      `,
      exercise: {
        type: "multiple",
        question: "Quel pourcentage de vos revenus devriez-vous idéalement épargner selon la règle 50/30/20 ?",
        options: [
          "10%",
          "15%",
          "20%",
          "25%"
        ],
        correctAnswer: 2
      },
      keyPoints: [
        "Payez-vous d'abord : épargnez avant de dépenser",
        "L'intérêt composé est la huitième merveille du monde",
        "Investissez dans votre éducation financière"
      ]
    },
    {
      id: 8,
      title: "Cultiver la Gratitude et la Positivité",
      description: "Développez un état d'esprit qui attire le succès et le bonheur",
      content: `
        <h3>Le pouvoir transformateur de la gratitude</h3>
        <p>La gratitude n'est pas seulement un sentiment agréable, c'est une force puissante qui transforme votre perspective et attire plus de positif dans votre vie.</p>
        
        <h4>Bénéfices scientifiquement prouvés :</h4>
        <ul>
          <li><strong>Santé mentale :</strong> Réduit l'anxiété et la dépression</li>
          <li><strong>Relations :</strong> Améliore la qualité des liens sociaux</li>
          <li><strong>Sommeil :</strong> Favorise un meilleur repos</li>
          <li><strong>Performance :</strong> Augmente la motivation et la productivité</li>
        </ul>

        <h4>Pratiques quotidiennes de gratitude :</h4>
        <ol>
          <li><strong>Journal de gratitude :</strong>
            <ul>
              <li>Notez 3 choses positives chaque soir</li>
              <li>Soyez spécifique dans vos descriptions</li>
              <li>Incluez pourquoi vous êtes reconnaissant</li>
            </ul>
          </li>
          <li><strong>Lettres de gratitude :</strong> Écrivez à quelqu'un qui vous a marqué</li>
          <li><strong>Méditation de gratitude :</strong> 5-10 minutes de réflexion positive</li>
        </ol>

        <h4>Cultiver la positivité :</h4>
        <ul>
          <li><strong>Reformulation positive :</strong> Cherchez les leçons dans les défis</li>
          <li><strong>Entourage positif :</strong> Fréquentez des personnes optimistes</li>
          <li><strong>Affirmations positives :</strong> Renforcez votre confiance en vous</li>
          <li><strong>Célébration des petites victoires :</strong> Reconnaissez vos progrès</li>
        </ul>
      `,
      exercise: {
        type: "text",
        question: "Écrivez 5 choses pour lesquelles vous êtes reconnaissant aujourd'hui :",
        placeholder: "1. \n2. \n3. \n4. \n5. "
      },
      keyPoints: [
        "La gratitude transforme ce que nous avons en suffisant",
        "Une attitude positive attire les opportunités",
        "Ce sur quoi vous vous concentrez grandit"
      ]
    },
    {
      id: 9,
      title: "Sortir de sa Zone de Confort",
      description: "Embrassez l'inconfort pour accélérer votre croissance personnelle",
      content: `
        <h3>La magie se produit en dehors de votre zone de confort</h3>
        <p>Votre zone de confort est un endroit sûr mais limitant. C'est en acceptant l'inconfort temporaire que vous découvrez votre vrai potentiel.</p>
        
        <h4>Les trois zones :</h4>
        <ol>
          <li><strong>Zone de confort :</strong> Sécurité mais stagnation</li>
          <li><strong>Zone d'apprentissage :</strong> Défi optimal et croissance</li>
          <li><strong>Zone de panique :</strong> Stress paralysant</li>
        </ol>

        <h4>Pourquoi sortir de sa zone de confort :</h4>
        <ul>
          <li><strong>Développement de la confiance :</strong> Chaque défi relevé renforce votre assurance</li>
          <li><strong>Découverte de talents cachés :</strong> Vous ne savez pas ce dont vous êtes capable</li>
          <li><strong>Opportunités inattendues :</strong> Les meilleures choses arrivent quand on s'y attend le moins</li>
          <li><strong>Résilience :</strong> Vous devenez plus fort face aux difficultés</li>
        </ul>

        <h4>Stratégies pratiques :</h4>
        <ol>
          <li><strong>Commencez petit :</strong> Micro-défis quotidiens</li>
          <li><strong>Technique des 20 secondes :</strong> Faites quelque chose qui vous rend nerveux pendant 20 secondes</li>
          <li><strong>Yes Challenge :</strong> Dites oui aux opportunités qui vous effraient un peu</li>
          <li><strong>Nouvelle expérience hebdomadaire :</strong> Essayez quelque chose de nouveau chaque semaine</li>
        </ol>

        <h4>Gérer la peur :</h4>
        <p>La peur est normale. Demandez-vous : "Que peut-il vraiment m'arriver de pire ?" et "Que pourrais-je gagner ?". Souvent, les regrets de ne pas avoir essayé sont plus douloureux que l'échec lui-même.</p>
      `,
      exercise: {
        type: "text",
        question: "Identifiez 3 actions que vous reportez par peur et planifiez quand les faire :",
        placeholder: "1. Action : \n   Quand : \n2. Action : \n   Quand : \n3. Action : \n   Quand : "
      },
      keyPoints: [
        "Le regret de ne pas avoir essayé dure plus longtemps que la peur d'échouer",
        "Votre zone de confort est un endroit où rien ne pousse",
        "Chaque action courageuse élargit votre zone de confort"
      ]
    },
    {
      id: 10,
      title: "Créer un Équilibre Vie Professionnelle/Personnelle",
      description: "Harmonisez tous les aspects de votre vie pour un succès durable",
      content: `
        <h3>L'équilibre : clé d'une vie épanouie</h3>
        <p>Le succès sans épanouissement personnel est l'échec ultime. Un équilibre sain entre vie professionnelle et personnelle est essentiel pour une réussite durable et un bonheur authentique.</p>
        
        <h4>Redéfinir l'équilibre :</h4>
        <p>L'équilibre ne signifie pas 50/50. C'est plutôt une harmonie dynamique où chaque aspect de votre vie reçoit l'attention qu'il mérite selon vos priorités actuelles.</p>

        <h4>Les piliers de l'équilibre :</h4>
        <ol>
          <li><strong>Professionnel :</strong> Carrière, compétences, revenus</li>
          <li><strong>Personnel :</strong> Famille, amis, relations</li>
          <li><strong>Physique :</strong> Santé, forme, bien-être</li>
          <li><strong>Mental/Spirituel :</strong> Croissance personnelle, valeurs, sens</li>
        </ol>

        <h4>Stratégies d'équilibre :</h4>
        <ul>
          <li><strong>Limites claires :</strong> Définissez des heures de travail et respectez-les</li>
          <li><strong>Rituels de transition :</strong> Créez des séparations entre travail et vie privée</li>
          <li><strong>Planification intentionnelle :</strong> Bloquez du temps pour chaque pilier</li>
          <li><strong>Déconnexion régulière :</strong> Éteignez les appareils, reconnectez avec vous-même</li>
        </ul>

        <h4>Signaux d'alarme du déséquilibre :</h4>
        <ul>
          <li>Fatigue chronique</li>
          <li>Relations négligées</li>
          <li>Perte de passion pour les loisirs</li>
          <li>Stress constant</li>
        </ul>

        <h4>Votre plan d'action :</h4>
        <p>Évaluez régulièrement votre équilibre, ajustez selon les saisons de votre vie, et souvenez-vous que l'équilibre parfait est un mythe - visez plutôt l'harmonie et la satisfaction.</p>
      `,
      exercise: {
        type: "text",
        question: "Notez votre niveau de satisfaction (1-10) pour chaque pilier et identifiez celui à améliorer en priorité :",
        placeholder: "Professionnel : /10\nPersonnel : /10\nPhysique : /10\nMental/Spirituel : /10\n\nPriorité à améliorer : \nActions concrètes : "
      },
      keyPoints: [
        "L'équilibre est un processus dynamique, pas un état final",
        "Investissez dans tous les piliers de votre vie",
        "Sachez dire non pour protéger vos priorités"
      ]
    }
  ]
};

export const mockUserData = {
  id: "user_123",
  currentStep: 1,
  completedSteps: [],
  notes: {},
  quizResults: {},
  lastAccessed: new Date().toISOString()
};