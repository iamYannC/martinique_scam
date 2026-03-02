/* ==========================================================================
   STATE
   ========================================================================== */
const LANGS = ["en", "fr"];
const THEMES = ["dark", "light"];

let currentLang = localStorage.getItem("lang") || "en";
let currentTheme = localStorage.getItem("theme") || "dark";

if (!LANGS.includes(currentLang)) currentLang = "en";
if (!THEMES.includes(currentTheme)) currentTheme = "dark";

/* ==========================================================================
   UI STRINGS
   ========================================================================== */
const UI_TEXT = {
  en: {
    pageTitle: "Grand Theft Appartment: Martinique",
    homeSub: "TL;DR I got scammed for EUR 800",
    menuSuspects: "Suspects",
    menuTimeline: "Timeline",
    suspectsTitle: "Suspect Database",
    timelineTitle: "Case Timeline",
    back: "\u2190 BACK",
    timelineIntro:
      "In February 2026, I was urgently looking for accommodation in Martinique. Under pressure to find somewhere quickly, I responded to what seemed like a legitimate Facebook rental listing and let that urgency cloud my judgment. What followed was five days of coordinated manipulation. I transferred EUR 800 across four payments, believing I was about to sign a lease and collect keys. Instead, I stood in front of a false address with no apartment and no money.",
    clickToView: "CLICK TO VIEW",
    suspectFile: "SUSPECT FILE",
    profile: "Profile",
    photosDocs: "Photos & Documents",
    notePrefix: "NOTE",
    runningTotal: "RUNNING TOTAL",
    totalLost: "TOTAL LOST",
    switchToLight: "LIGHT THEME",
    switchToDark: "DARK THEME",
    screenshotAlt: "screenshot",
    transferReceiptAlt: "transfer receipt",
    docPreviewAlt: "document preview",
    photoAlt: "photo",
  },
  fr: {
    pageTitle: "Grand Theft Appartment : Martinique",
    homeSub: "TL;DR je me suis fait arnaquer de 800 EUR",
    menuSuspects: "Suspects",
    menuTimeline: "Chronologie",
    suspectsTitle: "Base des suspects",
    timelineTitle: "Chronologie de l'affaire",
    back: "\u2190 RETOUR",
    timelineIntro:
      "En fevrier 2026, je cherchais en urgence un logement en Martinique. Sous pression, j'ai repondu a une annonce Facebook qui paraissait legitime, et cette urgence a brouille mon jugement. Ce qui a suivi: cinq jours de manipulation coordonnee. J'ai transfere 800 EUR en quatre paiements, en croyant signer un bail et recuperer les cles. Au final, je me suis retrouve devant une fausse adresse, sans appartement et sans argent.",
    clickToView: "CLIQUER POUR OUVRIR",
    suspectFile: "DOSSIER SUSPECT",
    profile: "Profil",
    photosDocs: "Photos & Documents",
    notePrefix: "NOTE",
    runningTotal: "TOTAL CUMULE",
    totalLost: "TOTAL PERDU",
    switchToLight: "THEME CLAIR",
    switchToDark: "THEME SOMBRE",
    screenshotAlt: "capture d'ecran",
    transferReceiptAlt: "recu de virement",
    docPreviewAlt: "apercu du document",
    photoAlt: "photo",
  },
};

/* ==========================================================================
   DATA
   ========================================================================== */
const SUSPECTS = [
  {
    name: "Etienne Moulinat",
    role: { en: "Main Scammer", fr: "Arnaqueur principal" },
    roleCls: "scammer",
    stars: 5,
    photos: ["../Pictures/Etienne Whatsapp.jpg", "../Pictures/Etienne gmail.jpg"],
    docs: ["../ID Etienne.jpg"],
    snippet: {
      en: "Orchestrated the entire scam over email.",
      fr: "A orchestre toute l'arnaque par email.",
    },
    money: { en: "Received EUR 800 total", fr: "A recu 800 EUR au total" },
    desc: {
      en: "Primary orchestrator. Posed as a landlord renting a Sainte-Anne studio. Gradually escalated demands from EUR 20 to EUR 800 across 5 days via 4 wire transfers to two beneficiaries. Never completed a meaningful phone call. Provided a non-existent contract address. Never showed up to the appointment.",
      fr: "Organisateur principal. S'est fait passer pour un proprietaire louant un studio a Sainte-Anne. A fait monter les demandes de 20 EUR a 800 EUR sur 5 jours, via 4 virements vers deux beneficiaires. Aucun appel utile n'a abouti. A fourni une adresse de contrat inexistante. Ne s'est jamais presente au rendez-vous.",
    },
    sections: [
      {
        label: { en: "Contact", fr: "Contact" },
        rows: [
          { k: { en: "Phone", fr: "Telephone" }, v: "+33 7 57 83 91 83" },
          { k: { en: "Email", fr: "Email" }, v: "etiennemoulinat4@gmail.com" },
        ],
      },
      {
        label: { en: "Identity Card", fr: "Carte d'identite" },
        rows: [
          { k: { en: "Full Name", fr: "Nom complet" }, v: "MOULINAT Etienne Edouard Jean-Marie" },
          { k: { en: "Birth Date", fr: "Date de naissance" }, v: "19/10/1948" },
          { k: { en: "ID Number", fr: "Numero de piece" }, v: "150106102409" },
          { k: { en: "Document", fr: "Document" }, v: "ID Etienne.pdf" },
        ],
        mrz: ["IDFRAMOULINAT<<<<<<<<<<<<<<<<<061014", "1501061024091ETIENNE<<EDOUA4810195M6"],
      },
    ],
  },
  {
    name: "Reine Sabrina",
    role: { en: "Facebook", fr: "Facebook" },
    roleCls: "facebook",
    stars: 2,
    photos: ["../Pictures/Reine Sabrina.jpg"],
    snippet: {
      en: "Posted the rental ad. Entry point of the scam.",
      fr: "A publie l'annonce. Point d'entree de l'arnaque.",
    },
    desc: {
      en: "Posted the apartment rental ad on a Martinique Facebook group. Privately shared Sylvain's phone number and Etienne's email address to the victim. Claims Etienne is her cousin.",
      fr: "A publie l'annonce de location dans un groupe Facebook de Martinique. A transmis en prive le numero de Sylvain et l'email d'Etienne a la victime. Dit qu'Etienne est son cousin.",
    },
    sections: [
      {
        label: { en: "Contact", fr: "Contact" },
        rows: [
          { k: { en: "Platform", fr: "Plateforme" }, v: "Facebook Messenger" },
          { k: { en: "Phone", fr: "Telephone" }, v: { en: "Unknown", fr: "Inconnu" } },
          { k: { en: "Email", fr: "Email" }, v: { en: "Unknown", fr: "Inconnu" } },
        ],
      },
    ],
  },
  {
    name: "Sylvain",
    role: { en: "Realtor", fr: "Intermediaire" },
    roleCls: "realtor",
    stars: 3,
    photos: ["../Pictures/Sylvain.jpg"],
    snippet: {
      en: "WhatsApp intermediary. Never answered calls.",
      fr: "Intermediaire WhatsApp. N'a jamais repondu aux appels.",
    },
    desc: {
      en: "Second contact, reached via WhatsApp (+33 7 73 97 29 07, number given by Reine). Redirected all communication to Etienne's email. Never answered calls. After Monday's transfers, messages showed single checkmarks only, likely blocked the victim.",
      fr: "Deuxieme contact, joint sur WhatsApp (+33 7 73 97 29 07, numero donne par Reine). A redirige toute la communication vers l'email d'Etienne. N'a jamais repondu aux appels. Apres les virements du lundi, les messages restaient sur une coche, probablement un blocage.",
    },
    sections: [
      {
        label: { en: "Contact", fr: "Contact" },
        rows: [
          { k: { en: "Phone", fr: "Telephone" }, v: "+33 7 73 97 29 07" },
          { k: { en: "Platform", fr: "Plateforme" }, v: "WhatsApp" },
        ],
      },
    ],
  },
  {
    name: "Sondayeni Sanou",
    role: { en: "Beneficiary", fr: "Beneficiaire" },
    roleCls: "beneficiary",
    stars: 4,
    photos: [],
    docs: ["../SANOU small buisness from alexandra bzh.jpeg"],
    snippet: {
      en: "Money mule #1. Received EUR 600.",
      fr: "Mule financiere #1. A recu 600 EUR.",
    },
    money: {
      en: "EUR 600 received (Transfers #1, #2 & #3)",
      fr: "600 EUR recus (Virements #1, #2 et #3)",
    },
    desc: {
      en: "First money mule. Received EUR 200 on Monday (Wise), EUR 200 on Tuesday (Nickel), and another EUR 200 on Wednesday (Nickel) after Etienne falsely claimed a rejection. Presented as Etienne's collaborator. Account at Deblock. Evidence includes a business-registration screenshot, not a personal photo.",
      fr: "Premiere mule financiere. A recu 200 EUR lundi (Wise), 200 EUR mardi (Nickel), puis 200 EUR mercredi (Nickel) apres une fausse allegation de rejet par Etienne. Presentee comme la collaboratrice d'Etienne. Compte chez Deblock. La preuve jointe est une capture de fiche d'entreprise, pas une photo personnelle.",
    },
    sections: [
      {
        label: { en: "Banking Details", fr: "Coordonnees bancaires" },
        rows: [
          { k: "IBAN", v: "FR76 1774 8019 8470 0732 7966 495" },
          { k: "BIC", v: "DBLKFR22XXX" },
          { k: { en: "Bank", fr: "Banque" }, v: "Deblock" },
          {
            k: { en: "Bank URL", fr: "URL banque" },
            v: "deblock.com/fr-FR",
            link: "https://deblock.com/fr-FR",
          },
        ],
      },
      {
        label: { en: "Business Registry", fr: "Registre d'entreprise" },
        rows: [
          { k: { en: "Company", fr: "Entreprise" }, v: "SANOU SONDAYENI (DS SMART)" },
          { k: "SIREN", v: "942 237 116" },
          { k: { en: "Status", fr: "Statut" }, v: { en: "Active", fr: "Active" } },
          {
            k: { en: "Address", fr: "Adresse" },
            v: "19 Boulevard Mendes France, 44700 Orvault",
          },
          {
            k: { en: "Activity", fr: "Activite" },
            v: {
              en: "Building routine cleaning",
              fr: "Nettoyage courant des batiments",
            },
          },
          { k: { en: "Employees", fr: "Employes" }, v: { en: "0 employee (2026 data)", fr: "0 salarie (donnees 2026)" } },
          { k: { en: "Created", fr: "Creation" }, v: "20/03/2025" },
          { k: { en: "Director", fr: "Dirigeant" }, v: "Sanou SONDAYENI" },
          { k: { en: "RNE update", fr: "Mise a jour RNE" }, v: "28/02/2026" },
          { k: { en: "INSEE update", fr: "Mise a jour INSEE" }, v: "27/02/2026" },
        ],
      },
    ],
  },
  {
    name: "Junior Yohan",
    role: { en: "Beneficiary", fr: "Beneficiaire" },
    roleCls: "beneficiary",
    stars: 4,
    photos: [],
    snippet: {
      en: "Money mule #2. \"Etienne's brother.\"",
      fr: "Mule financiere #2. \"Frere d'Etienne\".",
    },
    money: {
      en: "EUR 200 received (Transfer #4)",
      fr: "200 EUR recus (Virement #4)",
    },
    desc: {
      en: "Second money mule. Introduced on Wednesday as an alternative beneficiary, allegedly Etienne's brother and employee. Received EUR 200 from Yann's uncle via instant transfer (Wise -> BoursoBank).",
      fr: "Deuxieme mule financiere. Introduit mercredi comme beneficiaire alternatif, presente comme le frere et employe d'Etienne. A recu 200 EUR de l'oncle de Yann via virement instantane (Wise -> BoursoBank).",
    },
    extra: { en: "Etienne's brother", fr: "Frere d'Etienne" },
    sections: [
      {
        label: { en: "Banking Details", fr: "Coordonnees bancaires" },
        rows: [
          { k: "IBAN", v: "FR76 4061 8805 0500 0406 8586 984" },
          { k: "BIC", v: "BOUSFRPPXXX" },
          { k: { en: "Bank", fr: "Banque" }, v: "BoursoBank" },
          {
            k: { en: "Bank URL", fr: "URL banque" },
            v: "boursobank.com",
            link: "https://www.boursobank.com/",
          },
        ],
      },
    ],
  },
  {
    name: "Marie-Louise Eliane",
    role: { en: "Parallel Actor", fr: "Actrice parallele" },
    roleCls: "witness",
    stars: 3,
    photos: ["../Marie-Louise Eliane SC.jpeg"],
    docs: ["../Marie-Louise Eliane/etienne specifies amount 450.jpg"],
    snippet: {
      en: "New name tied to the same payment-demand script.",
      fr: "Nouveau nom lie au meme script de demande d'argent.",
    },
    desc: {
      en: "After the complaint, another participant shared a Messenger screenshot showing the same operating pattern and wording, under the name Marie-Louise Eliane. This expands the actor map beyond the original chain.",
      fr: "Apres la plainte, une autre personne a partage une capture Messenger montrant le meme mode operatoire et la meme formulation, sous le nom de Marie-Louise Eliane. Cela elargit la cartographie des acteurs au-dela de la chaine initiale.",
    },
    sections: [
      {
        label: { en: "Context", fr: "Contexte" },
        rows: [
          { k: { en: "Platform", fr: "Plateforme" }, v: "Facebook Messenger" },
          {
            k: { en: "Evidence", fr: "Preuve" },
            v: {
              en: "Screenshot where money amount is specified",
              fr: "Capture ou le montant a payer est precise",
            },
          },
        ],
      },
    ],
  },
];

const DAYS = [
  { key: "sat", name: { en: "SAT", fr: "SAM" }, date: { en: "21 Feb", fr: "21 Fev" } },
  { key: "sun", name: { en: "SUN", fr: "DIM" }, date: { en: "22 Feb", fr: "22 Fev" } },
  { key: "mon", name: { en: "MON", fr: "LUN" }, date: { en: "23 Feb", fr: "23 Fev" } },
  { key: "tue", name: { en: "TUE", fr: "MAR" }, date: { en: "24 Feb", fr: "24 Fev" } },
  { key: "wed", name: { en: "WED", fr: "MER" }, date: { en: "25 Feb", fr: "25 Fev" } },
];

const EVENTS = [
  {
    day: "sat",
    time: "08:36",
    type: "contact",
    title: { en: "Facebook Ad Seen", fr: "Annonce Facebook reperee" },
    actor: "Reine Sabrina",
    desc: {
      en: "Yann sees a rental ad on a Martinique Facebook group and messages the author, Reine Sabrina.",
      fr: "Yann voit une annonce de location dans un groupe Facebook de Martinique et contacte l'auteure, Reine Sabrina.",
    },
  },
  {
    day: "sat",
    time: "13:10",
    type: "contact",
    title: { en: "Referral Received", fr: "Mise en relation recue" },
    actor: "Reine Sabrina",
    desc: {
      en: "Reine says her cousin handles rentals. Shares a phone number (+33 773 97 29 07) and an email (etiennemoulinat4@gmail.com). They belong to different people.",
      fr: "Reine dit que son cousin gere les locations. Elle partage un numero (+33 773 97 29 07) et un email (etiennemoulinat4@gmail.com). Ils appartiennent a des personnes differentes.",
    },
  },
  {
    day: "sun",
    time: "14:23",
    type: "contact",
    title: { en: "WhatsApp: Sylvain", fr: "WhatsApp : Sylvain" },
    actor: "Sylvain",
    desc: {
      en: "Yann contacts the number on WhatsApp. Sylvain asks him to write to the email address.",
      fr: "Yann contacte le numero sur WhatsApp. Sylvain lui demande d'ecrire a l'adresse email.",
    },
  },
  {
    day: "sun",
    time: "14:29",
    type: "contact",
    title: { en: "Email Thread Begins", fr: "Debut du fil email" },
    actor: "Etienne",
    desc: {
      en: "Etienne presents himself as the landlord. Offers a furnished studio at EUR 450/mo and a 2-bed at EUR 950/mo.",
      fr: "Etienne se presente comme proprietaire. Propose un studio meuble a 450 EUR/mois et un T2 a 950 EUR/mois.",
    },
  },
  {
    day: "sun",
    time: "16:38",
    type: "info",
    title: { en: "Studio Photos Shared", fr: "Photos du studio envoyees" },
    actor: "Etienne",
    desc: {
      en: "Google Drive link sent with apartment photos.",
      fr: "Lien Google Drive envoye avec les photos du logement.",
    },
  },
  {
    day: "sun",
    time: "18:28",
    type: "warning",
    title: { en: "Documents Requested", fr: "Documents demandes" },
    actor: "Etienne",
    desc: {
      en: "Etienne asks for ID and proof of income. States that no upfront payment is needed.",
      fr: "Etienne demande une piece d'identite et un justificatif de revenus. Il dit qu'aucun paiement en avance n'est necessaire.",
    },
  },
  {
    day: "sun",
    time: "21:17",
    type: "escalation",
    title: { en: "Escalation #1 - EUR 20", fr: "Escalade #1 - 20 EUR" },
    actor: "Etienne",
    img: { en: "ui-screenshots/1-escalation-20.png" },
    desc: {
      en: "After receiving personal documents, Etienne introduces a EUR 20 'seriousness' deposit to confirm the visit.",
      fr: "Apres reception des documents personnels, Etienne introduit un depot de 20 EUR pour 'serieux' afin de confirmer la visite.",
    },
  },
  {
    day: "mon",
    time: "07:22",
    type: "escalation",
    title: { en: "Escalation #2 - EUR 220", fr: "Escalade #2 - 220 EUR" },
    actor: "Etienne",
    img: { en: "ui-screenshots/2-escalation-220.png" },
    extraImgs: [
      {
        src: "../Marie-Louise Eliane/etienne specifies amount 450.jpg",
        caption: {
          en: "Additional screenshot: the same money-demand pattern appears in a report involving Marie-Louise Eliane.",
          fr: "Capture supplementaire : le meme schema de demande d'argent apparait dans un signalement impliquant Marie-Louise Eliane.",
        },
      },
    ],
    desc: {
      en: "Amount jumps to EUR 220. Etienne claims EUR 200 is travel cost and refundable if Yann does not like the apartment.",
      fr: "Le montant passe a 220 EUR. Etienne affirme que 200 EUR couvrent ses frais de deplacement et seraient remboursables si Yann refuse l'appartement.",
    },
  },
  {
    day: "mon",
    time: "08:51",
    type: "banking",
    title: { en: "Beneficiary: Sondayeni", fr: "Beneficiaire : Sondayeni" },
    actor: "Etienne",
    desc: {
      en: "Bank details sent: Sondayeni Sanou, FR76 1774 8019 8470 0732 7966 495, Deblock.",
      fr: "Coordonnees envoyees : Sondayeni Sanou, FR76 1774 8019 8470 0732 7966 495, Deblock.",
    },
  },
  {
    day: "mon",
    time: "09:13",
    type: "warning",
    title: { en: "Sylvain Unreachable", fr: "Sylvain injoignable" },
    actor: "Sylvain",
    desc: {
      en: "Yann attempts two WhatsApp calls before transferring money. No answer.",
      fr: "Yann tente deux appels WhatsApp avant de transferer l'argent. Aucune reponse.",
    },
  },
  {
    day: "mon",
    time: "10:37",
    type: "info",
    title: { en: "Agreed on EUR 200", fr: "Accord sur 200 EUR" },
    actor: "Etienne",
    desc: {
      en: "Nickel blocks new beneficiaries for 24h, so Yann uses Wise balance of EUR 200.",
      fr: "Nickel bloque les nouveaux beneficiaires pendant 24h, donc Yann utilise son solde Wise de 200 EUR.",
    },
  },
  {
    day: "mon",
    time: "12:03",
    type: "transfer",
    title: { en: "TRANSFER #1 - EUR 200", fr: "VIREMENT #1 - 200 EUR" },
    actor: { en: "Yann -> Sondayeni", fr: "Yann -> Sondayeni" },
    running: "-EUR 200",
    receipt: ["../Transfers/1st wise 200.jpg"],
    desc: {
      en: "EUR 200 sent from Wise to Sondayeni Sanou. Running total: EUR 200.",
      fr: "200 EUR envoyes de Wise a Sondayeni Sanou. Total cumule : 200 EUR.",
    },
  },
  {
    day: "mon",
    time: "13:15",
    type: "appointment",
    title: { en: "Meeting Confirmed", fr: "Rendez-vous confirme" },
    actor: "Etienne + Sylvain",
    desc: {
      en: "Appointment agreed for Wednesday 25 Feb at 14:00. Address to follow.",
      fr: "Rendez-vous fixe au mercredi 25 fevrier a 14:00. Adresse a suivre.",
    },
  },
  {
    day: "tue",
    time: "13:36",
    type: "escalation",
    title: { en: "Escalation #3 - +EUR 200", fr: "Escalade #3 - +200 EUR" },
    actor: "Etienne",
    desc: {
      en: "Etienne demands another EUR 200 and shares WhatsApp number +33 757 839 183.",
      fr: "Etienne exige encore 200 EUR et partage le numero WhatsApp +33 757 839 183.",
    },
  },
  {
    day: "tue",
    time: "15:25",
    type: "warning",
    title: { en: "Sylvain Blocked?", fr: "Sylvain a bloque ?" },
    actor: "Sylvain",
    img: {
      en: "ui-screenshots/sylvain-stops-answer-blocks EN.jpg",
      fr: "ui-screenshots/sylvain-stops-answer-blocks.jpg",
    },
    imgTall: true,
    desc: {
      en: "Messages show single checkmark. Calls from different numbers fail.",
      fr: "Les messages restent sur une coche. Les appels depuis d'autres numeros echouent.",
    },
  },
  {
    day: "tue",
    time: "15:38",
    type: "warning",
    title: { en: "Failed Calls to Etienne", fr: "Appels rates vers Etienne" },
    actor: "Etienne",
    desc: {
      en: "Multiple WhatsApp calls disconnect quickly. Normal calls return immediate busy tone.",
      fr: "Plusieurs appels WhatsApp se coupent rapidement. Les appels normaux sonnent occupe immediatement.",
    },
  },
  {
    day: "tue",
    time: "15:59",
    type: "escalation",
    title: { en: "Threatens Refund", fr: "Menace de remboursement" },
    actor: "Etienne",
    desc: {
      en: "Etienne says the process is too complicated and threatens to cancel and refund.",
      fr: "Etienne dit que c'est trop complique et menace d'annuler puis de rembourser.",
    },
  },
  {
    day: "tue",
    time: "16:24",
    type: "transfer",
    title: { en: "TRANSFER #2 - EUR 200", fr: "VIREMENT #2 - 200 EUR" },
    actor: { en: "Yann -> Sondayeni", fr: "Yann -> Sondayeni" },
    running: "-EUR 400",
    receipt: ["../Transfers/2nd nickel 200.jpg"],
    desc: {
      en: "EUR 200 sent from Nickel to Sondayeni Sanou. Running total: EUR 400.",
      fr: "200 EUR envoyes de Nickel a Sondayeni Sanou. Total cumule : 400 EUR.",
    },
  },
  {
    day: "tue",
    time: "16:41",
    type: "appointment",
    title: { en: "Address Shared", fr: "Adresse transmise" },
    actor: "Etienne",
    desc: {
      en: "6 Rue Abbe Hurard, Sainte-Anne 97227. Meeting confirmed for tomorrow at 14:00.",
      fr: "6 Rue Abbe Hurard, Sainte-Anne 97227. Rendez-vous confirme pour demain a 14:00.",
    },
  },
  {
    day: "wed",
    time: "05:38",
    type: "warning",
    title: { en: "\"Transfer Rejected\"", fr: "\"Virement rejete\"" },
    actor: "Etienne",
    img: {
      en: "ui-screenshots/4 false-claim-for-rejection EN.jpg",
      fr: "ui-screenshots/4 false-claim-for-rejection.jpg",
    },
    imgTall: true,
    desc: {
      en: "Etienne falsely claims money was returned and asks Yann to resend.",
      fr: "Etienne affirme a tort que l'argent est revenu et demande un renvoi.",
    },
  },
  {
    day: "wed",
    time: "07:03",
    type: "transfer",
    title: { en: "TRANSFER #3 - EUR 200", fr: "VIREMENT #3 - 200 EUR" },
    actor: { en: "Yann -> Sondayeni", fr: "Yann -> Sondayeni" },
    running: "-EUR 600",
    receipt: ["../Transfers/3rd nickel 200.jpg"],
    desc: {
      en: "EUR 200 resent after false rejection claim. Running total: EUR 600.",
      fr: "200 EUR renvoyes apres la fausse allegation de rejet. Total cumule : 600 EUR.",
    },
  },
  {
    day: "wed",
    time: "09:52",
    type: "banking",
    title: { en: "New Beneficiary: Junior", fr: "Nouveau beneficiaire : Junior" },
    actor: "Etienne",
    desc: {
      en: "New IBAN provided for Junior Yohan (BoursoBank), presented as Etienne's brother.",
      fr: "Nouveau RIB fourni pour Junior Yohan (BoursoBank), presente comme le frere d'Etienne.",
    },
  },
  {
    day: "wed",
    time: "11:01",
    type: "transfer",
    title: { en: "TRANSFER #4 - EUR 200", fr: "VIREMENT #4 - 200 EUR" },
    actor: { en: "Yann's uncle -> Junior", fr: "Oncle de Yann -> Junior" },
    running: "-EUR 800",
    receipt: ["../Transfers/4th wise ariel 200.jpg"],
    desc: {
      en: "EUR 200 sent by Yann's uncle to Junior Yohan via Wise instant transfer.",
      fr: "200 EUR envoyes par l'oncle de Yann a Junior Yohan via virement instantane Wise.",
    },
  },
  {
    day: "wed",
    time: "12:27",
    type: "appointment",
    title: { en: "Yann Arrives", fr: "Yann arrive" },
    actor: "Yann",
    desc: {
      en: "Yann arrives with luggage and waits at the provided address.",
      fr: "Yann arrive avec ses bagages et attend a l'adresse fournie.",
    },
  },
  {
    day: "wed",
    time: "14:00+",
    type: "ghosted",
    title: { en: "NOBODY SHOWS UP", fr: "PERSONNE NE VIENT" },
    actor: "Etienne",
    img: {
      en: "ui-screenshots/5 etienne-never-shows-up-blocks EN.jpg",
      fr: "ui-screenshots/5 etienne-never-shows-up-blocks.jpg",
    },
    imgTall: true,
    desc: {
      en: "Appointment time passes. Etienne goes silent and stops responding.",
      fr: "L'heure du rendez-vous passe. Etienne devient silencieux et ne repond plus.",
    },
  },
  {
    day: "wed",
    time: "16:46",
    type: "ghosted",
    title: { en: "Complaint Filed", fr: "Plainte deposee" },
    actor: "Yann",
    img: { en: "ui-screenshots/last-police-st-anne.jpg" },
    desc: {
      en: "Yann files a formal complaint. Communication channels go dark.",
      fr: "Yann depose une plainte formelle. Les canaux de communication se ferment.",
    },
  },
];

const TYPE_META = {
  contact: { color: "var(--blue)", label: { en: "CONTACT", fr: "CONTACT" } },
  info: { color: "var(--teal)", label: { en: "INFO", fr: "INFO" } },
  warning: { color: "var(--yellow)", label: { en: "WARNING", fr: "ALERTE" } },
  escalation: { color: "var(--orange)", label: { en: "ESCALATION", fr: "ESCALADE" } },
  banking: { color: "var(--purple)", label: { en: "BANKING", fr: "BANQUE" } },
  transfer: { color: "var(--red)", label: { en: "TRANSFER", fr: "VIREMENT" } },
  appointment: { color: "var(--green)", label: { en: "APPOINTMENT", fr: "RENDEZ-VOUS" } },
  ghosted: { color: "var(--gray)", label: { en: "GHOSTED", fr: "DISPARU" } },
};

/* ==========================================================================
   HELPERS
   ========================================================================== */
function tr(value) {
  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    (Object.prototype.hasOwnProperty.call(value, "en") ||
      Object.prototype.hasOwnProperty.call(value, "fr"))
  ) {
    return value[currentLang] || value.en || "";
  }
  return value;
}

function text(key) {
  return UI_TEXT[currentLang][key] || "";
}

function isImageFile(path) {
  return /\.(png|jpe?g|webp|gif)$/i.test(path);
}

/* ==========================================================================
   NAVIGATION
   ========================================================================== */
function go(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* ==========================================================================
   CONTROLS (LANG + THEME)
   ========================================================================== */
function setTheme(theme, persist = true) {
  if (!THEMES.includes(theme)) return;
  currentTheme = theme;
  document.body.setAttribute("data-theme", theme);
  if (persist) localStorage.setItem("theme", theme);
  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.textContent = theme === "dark" ? text("switchToLight") : text("switchToDark");
  }
}

function setLanguage(lang, persist = true) {
  if (!LANGS.includes(lang)) return;
  currentLang = lang;
  document.documentElement.lang = lang;
  if (persist) localStorage.setItem("lang", lang);

  renderStaticText();
  renderSuspects();
  renderTimeline();

  const langBtns = document.querySelectorAll(".lang-btn");
  langBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });

  // If modal is open, close it to avoid mixed-language stale content.
  closeSusDirect();
}

function bindControls() {
  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      setTheme(currentTheme === "dark" ? "light" : "dark");
    });
  }

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setLanguage(btn.dataset.lang);
    });
  });
}

function renderStaticText() {
  document.title = text("pageTitle");
  const homeSub = document.getElementById("home-sub");
  if (homeSub) homeSub.textContent = text("homeSub");

  const menuSuspects = document.getElementById("menu-suspects");
  if (menuSuspects) menuSuspects.textContent = text("menuSuspects");

  const menuTimeline = document.getElementById("menu-timeline");
  if (menuTimeline) menuTimeline.textContent = text("menuTimeline");

  const suspectsTitle = document.getElementById("suspects-title");
  if (suspectsTitle) suspectsTitle.textContent = text("suspectsTitle");

  const timelineTitle = document.getElementById("timeline-title");
  if (timelineTitle) timelineTitle.textContent = text("timelineTitle");

  const timelineIntro = document.getElementById("timeline-intro");
  if (timelineIntro) timelineIntro.textContent = text("timelineIntro");

  document.querySelectorAll('[data-i18n="back"]').forEach((el) => {
    el.textContent = text("back");
  });

  setTheme(currentTheme, false);
}

/* ==========================================================================
   RENDER SUSPECTS
   ========================================================================== */
function renderSuspects() {
  const grid = document.getElementById("suspects-grid");
  grid.innerHTML = SUSPECTS.map((s, i) => {
    const photo = s.photos.length
      ? `<img class="s-photo" src="${s.photos[0]}" alt="${s.name}">`
      : `<div class="s-placeholder">&#9764;</div>`;
    const money = s.money ? `<div class="s-money">${tr(s.money)}</div>` : "";

    return `
      <div class="s-card" onclick="openSus(${i})">
        ${photo}
        <div class="s-body">
          <div class="s-role role-${s.roleCls}">${tr(s.role)}</div>
          <div class="s-name">${s.name}</div>
          <div class="s-snippet">${tr(s.snippet)}</div>
          ${money}
          <div class="s-tap">${text("clickToView")}</div>
        </div>
      </div>`;
  }).join("");
}

/* ==========================================================================
   SUSPECT MODAL
   ========================================================================== */
function openSus(i) {
  const s = SUSPECTS[i];
  const photo = s.photos.length
    ? `<img class="m-photo" src="${s.photos[0]}" alt="${s.name}">`
    : `<div class="m-photo-none">&#9764;</div>`;

  const stars =
    "&#9733;".repeat(s.stars) +
    "<span style=\"color:var(--text-faint)\">" +
    "&#9733;".repeat(5 - s.stars) +
    "</span>";

  const extra = s.extra
    ? `<div style="margin-top:8px;font-family:'Share Tech Mono',monospace;font-size:10px;letter-spacing:2px;color:var(--orange);">${text("notePrefix")}: ${tr(s.extra).toUpperCase()}</div>`
    : "";

  let body = "";
  for (const sec of s.sections) {
    body += `<div class="m-section">${tr(sec.label)}</div>`;
    for (const r of sec.rows) {
      const valText = tr(r.v);
      const val = r.link
        ? `<a href="${r.link}" target="_blank" style="color:var(--blue);text-decoration:none">${valText}</a>`
        : valText;
      body += `<div class="m-row"><div class="m-key">${tr(r.k)}</div><div class="m-val">${val}</div></div>`;
    }
    if (sec.mrz) {
      body += `<div class="m-row"><div class="m-key">MRZ</div></div>`;
      body += `<div class="m-mrz">${sec.mrz.join("<br>")}</div>`;
    }
  }

  const docs = s.docs || [];
  const imageDocs = docs.filter(isImageFile);
  const fileDocs = docs.filter((d) => !isImageFile(d));

  if (s.photos.length > 1 || imageDocs.length || fileDocs.length) {
    body += `<div class="m-section">${text("photosDocs")}</div>`;
    body += `<div class="m-thumbs">`;

    for (const p of s.photos) {
      body += `<img class="m-thumb" src="${p}" alt="${text("photoAlt")}" onclick="window.open('${p}','_blank')">`;
    }

    for (const d of imageDocs) {
      body += `<img class="m-thumb m-doc-thumb" src="${d}" alt="${text("docPreviewAlt")}" onclick="window.open('${d}','_blank')">`;
    }

    body += `</div>`;

    for (const d of fileDocs) {
      const fname = d.split("/").pop();
      body += `<a class="m-doc-link" href="${d}" target="_blank">&#x1F4C4; ${fname}</a>`;
    }
  }

  document.getElementById("sus-content").innerHTML = `
    <div class="m-head">
      ${photo}
      <div class="m-meta">
        <div class="m-role-line">${text("suspectFile")}</div>
        <div class="m-name">${s.name}</div>
        <div class="m-stars">${stars}</div>
        <div class="s-role role-${s.roleCls}" style="margin-bottom:8px">${tr(s.role)}</div>
        ${s.money ? `<div style="font-family:'Share Tech Mono',monospace;font-size:11px;color:var(--red)">${tr(s.money)}</div>` : ""}
        ${extra}
      </div>
    </div>
    <div class="m-body">
      <div class="m-section">${text("profile")}</div>
      <div class="m-desc" style="margin-bottom:8px;line-height:1.65">${tr(s.desc)}</div>
      ${body}
    </div>`;

  document.getElementById("sus-overlay").classList.add("open");
}

function closeSus(e) {
  if (e.target === e.currentTarget) closeSusDirect();
}

function closeSusDirect() {
  const overlay = document.getElementById("sus-overlay");
  if (overlay) overlay.classList.remove("open");
}

/* ==========================================================================
   RENDER TIMELINE
   ========================================================================== */
function renderTimeline() {
  const legend = document.getElementById("tl-legend");
  legend.innerHTML = Object.entries(TYPE_META)
    .map(
      ([, v]) =>
        `<div class="leg"><div class="leg-dot" style="background:${v.color}"></div>${tr(v.label)}</div>`
    )
    .join("");

  const track = document.getElementById("tl-track");
  let html = "";
  let currentDay = null;

  EVENTS.forEach((e, idx) => {
    if (e.day !== currentDay) {
      currentDay = e.day;
      const d = DAYS.find((day) => day.key === currentDay);
      html += `<div class="tl-day-div">
        <span class="tl-day-name">${tr(d.name)}</span>
        <span class="tl-day-date">${tr(d.date)}</span>
      </div>`;
    }

    let imgHtml = "";
    if (e.img) {
      const hasFr = !!e.img.fr;
      const tallCls = e.imgTall ? " tall" : "";

      if (hasFr) {
        const imageLang = currentLang === "fr" ? "fr" : "en";
        imgHtml = `
          <div class="tl-screenshot" id="ss-${idx}">
            <div class="tl-lang">
              <button class="${imageLang === "en" ? "active" : ""}" onclick="swapLang(${idx},'en',event)">EN</button>
              <button class="${imageLang === "fr" ? "active" : ""}" onclick="swapLang(${idx},'fr',event)">FR</button>
            </div>
            <img src="${e.img[imageLang]}" data-en="${e.img.en}" data-fr="${e.img.fr}" class="${tallCls}" alt="${text("screenshotAlt")}">
          </div>`;
      } else {
        imgHtml = `
          <div class="tl-screenshot">
            <img src="${e.img.en}" class="${tallCls}" alt="${text("screenshotAlt")}">
          </div>`;
      }
    }

    let extraImgHtml = "";
    if (e.extraImgs && e.extraImgs.length) {
      extraImgHtml = `<div class="tl-extra-imgs">${e.extraImgs
        .map(
          (extra) => `
            <figure class="tl-extra-shot">
              <img src="${extra.src}" alt="${text("screenshotAlt")}">
              ${extra.caption ? `<figcaption>${tr(extra.caption)}</figcaption>` : ""}
            </figure>`
        )
        .join("")}</div>`;
    }

    let receiptHtml = "";
    if (e.receipt) {
      receiptHtml = `<div class="tl-receipt-imgs">${e.receipt
        .map((src) => `<img src="${src}" alt="${text("transferReceiptAlt")}">`)
        .join("")}</div>`;
    }

    html += `
      <div class="tl-ev t-${e.type}">
        <div class="tl-head">
          <span class="tl-time">${e.time}</span>
          <span class="tl-title">${tr(e.title)}</span>
        </div>
        <div class="tl-actor">${tr(e.actor).toUpperCase()}</div>
        <div class="tl-desc">${tr(e.desc)}</div>
        ${receiptHtml}
        ${imgHtml}
        ${extraImgHtml}
      </div>`;

    if (e.running) {
      html += `
      <div class="tl-running">
        <div class="tl-running-amount">${e.running}</div>
        <div class="tl-running-label">${text("runningTotal")}</div>
      </div>`;
    }
  });

  html += `
    <div class="tl-end">
      <div class="tl-end-amount">-EUR 800</div>
      <div class="tl-end-label">${text("totalLost")}</div>
    </div>`;

  track.innerHTML = html;
}

/* screenshot language toggle */
function swapLang(idx, lang, evt) {
  evt.stopPropagation();
  const container = document.getElementById("ss-" + idx);
  if (!container) return;

  const img = container.querySelector("img");
  if (!img || !img.dataset[lang]) return;

  img.src = img.dataset[lang];
  container.querySelectorAll(".tl-lang button").forEach((b) => b.classList.remove("active"));
  evt.currentTarget.classList.add("active");
}

/* ==========================================================================
   KEYBOARD
   ========================================================================== */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (document.getElementById("sus-overlay").classList.contains("open")) {
      return closeSusDirect();
    }
    go("home");
  }
});

/* ==========================================================================
   INIT
   ========================================================================== */
bindControls();
setTheme(currentTheme, false);
setLanguage(currentLang, false);
