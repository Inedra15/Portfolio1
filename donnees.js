/* =========================================================
   DONNÉES DU PORTFOLIO
   ---------------------------------------------------------
   Ce fichier ne contient QUE des données (aucune logique).
   Pour ajouter un projet ou une preuve, il suffit de modifier
   les listes ci-dessous : le tableau des compétences est
   généré automatiquement à partir de ces données.
   ========================================================= */

// Dossier racine de toutes les preuves (captures d'écran, PDF)
const DOSSIER_PREUVES = "image/competences/";

// Les 6 compétences du BTS SIO, dans l'ordre des colonnes du tableau.
// "id" sert de clé dans les données des projets, "court" s'affiche dans les filtres.
const COMPETENCES = [
    { id: "patrimoine", nom: "Gérer le patrimoine informatique", court: "Patrimoine" },
    { id: "incidents", nom: "Répondre aux incidents et aux demandes d'assistance et d'évolution", court: "Incidents" },
    { id: "presence", nom: "Développer la présence en ligne de l'organisation", court: "Présence en ligne" },
    { id: "projet", nom: "Travailler en mode projet", court: "Mode projet" },
    { id: "dispo", nom: "Mettre à disposition des utilisateurs un service informatique", court: "Mise à disposition" },
    { id: "devpro", nom: "Organiser son développement professionnel", court: "Dév. professionnel" }
];

// Petites fonctions pour écrire les preuves plus simplement.
// Une preuve est soit une liste de fichiers, soit un lien externe.
function fichier(chemin, titre) {
    return { chemin: DOSSIER_PREUVES + chemin, titre: titre };
}
function lien(url) {
    return { lien: url };
}

// Les 5 projets Mobix ont exactement la même structure de dossiers
function projetMobix(dossier, titreDocument) {
    const base = "mobix/" + dossier + "/";
    return {
        incidents: [fichier(base + "repondre_incidents/document1.pdf", titreDocument)],
        projet: [fichier(base + "travailler_projet/image1.png", "Utilisation de l'application Zoho Analytics")],
        dispo: [fichier(base + "mettre_a_dispo/image1.png", "Résultat final")]
    };
}

// Les 2 workflows Gaches Chimie partagent aussi la même structure
function projetGaches(dossier, readme, preuvesDispo) {
    const base = "Gaches Chimie/" + dossier + "/";
    return {
        patrimoine: [
            fichier(base + "gerer_patrimoine/image1.png", "Création et gestion de la base de données"),
            fichier(base + "gerer_patrimoine/image2.png", "Script de gestion des mails automatiques")
        ],
        incidents: [
            fichier(base + "repondre_incidents/image1.png", "Réunion avec les RH"),
            fichier(base + "repondre_incidents/image2.png", "Réunion avec les RH"),
            fichier(base + "repondre_incidents/image3.pdf", "Document complémentaire (PDF)")
        ],
        projet: [
            fichier(base + "travailler_projet/image1.png", "Réunion avec les RH"),
            fichier(base + "travailler_projet/image2.png", "Réunion avec les RH"),
            fichier(base + "travailler_projet/image3.png", "Utilisation de GitHub"),
            fichier(base + "travailler_projet/" + readme, "README du projet (PDF)")
        ],
        dispo: preuvesDispo.map(([nom, titre]) => fichier(base + "mettre_a_dispo/" + nom, titre)),
        devpro: [fichier(base + "organiser_developpement/image1.png", "Apprentissage de JavaScript")]
    };
}

// Toutes les réalisations, regroupées par période.
// Chaque clé de "preuves" correspond à un "id" de COMPETENCES :
// si une compétence est présente, une coche ✓ apparaît dans le tableau.
const REALISATIONS = [
    {
        periode: "Réalisations en cours de formation",
        projets: [
            {
                nom: "LinkedIn, CV",
                preuves: {
                    devpro: lien("https://www.linkedin.com/in/adrien-cachoux-8607b82a0/")
                }
            },
            {
                nom: "Site web M2L",
                preuves: {
                    projet: [fichier("M2L/travailler_projet/image1.png", "Utilisation de Google Drive")],
                    dispo: [
                        fichier("M2L/mettre_a_dispo/image1.png", "Page d'accueil du site"),
                        fichier("M2L/mettre_a_dispo/image2.png", "Calendrier des matchs")
                    ],
                    devpro: [fichier("M2L/organiser_developpement/image1.png", "Cours HTML/CSS")]
                }
            },
            {
                nom: "AP GLPI",
                preuves: {
                    patrimoine: [
                        fichier("apGLPI/gerer_patrimoine/image1.png", "Interface GLPI"),
                        fichier("apGLPI/gerer_patrimoine/image2.png", "Gestion du parc informatique"),
                        fichier("apGLPI/gerer_patrimoine/image3.png", "Gestion des comptes utilisateurs")
                    ]
                }
            },
            {
                nom: "Portfolio",
                preuves: {
                    presence: [fichier("Portfolio/developper_en_ligne/image1.png", "Mise en ligne du portfolio")],
                    devpro: [fichier("Portfolio/organiser_developpement/image1.png", "Apprentissage de l'hébergement web")]
                }
            },
            {
                nom: "Site web de FAQ",
                preuves: {
                    incidents: [fichier("FAQ/repondre_incidents/image1.png", "Issue GitHub")],
                    presence: lien("https://appfaq.brandonmolina.fr/"),
                    projet: [
                        fichier("FAQ/travailler_projet/image1.png", "Utilisation de GitHub"),
                        fichier("FAQ/travailler_projet/image2.png", "Utilisation de Trello")
                    ],
                    dispo: [
                        fichier("FAQ/mettre_a_dispo/image1.png", "Page d'accueil de la FAQ"),
                        fichier("FAQ/mettre_a_dispo/image2.png", "Page d'inscription")
                    ],
                    devpro: [fichier("FAQ/organiser_developpement/image1.png", "Cours PHP")]
                }
            },
            {
                nom: "CazaFamilia - Système de gestion de restaurant italien",
                preuves: {
                    incidents: [fichier("CazaFamilia/repondre_incidents/image1.png", "Issue GitHub")],
                    presence: lien("https://cazafamilia.brandonmolina.fr/"),
                    projet: [
                        fichier("CazaFamilia/travailler_projet/image1.png", "Utilisation de GitHub"),
                        fichier("CazaFamilia/travailler_projet/image2.png", "Utilisation de Trello")
                    ],
                    dispo: [
                        fichier("CazaFamilia/mettre_a_dispo/image1.png", "Site web : accueil"),
                        fichier("CazaFamilia/mettre_a_dispo/image2.png", "Site web : menu"),
                        fichier("CazaFamilia/mettre_a_dispo/image3.png", "Application : toutes les commandes"),
                        fichier("CazaFamilia/mettre_a_dispo/image4.png", "Application : détail des commandes")
                    ],
                    devpro: [
                        fichier("CazaFamilia/organiser_developpement/image1.png", "Cours PHP"),
                        fichier("CazaFamilia/organiser_developpement/image2.png", "Cours Java")
                    ]
                }
            }
        ]
    },
    {
        periode: "Réalisations en milieu professionnel - 1ère année (Mobix)",
        projets: [
            {
                nom: "Tableau prévisionnel de la charge de travail à prévoir en plus par collaborateur",
                preuves: projetMobix("Tableau_previsionelle", "Tableau prévisionnel - charge de travail (PDF)")
            },
            {
                nom: "Indicateur de retard de tous les projets ouverts",
                preuves: projetMobix("indicateur_retard", "Indicateur de retard des projets (PDF)")
            },
            {
                nom: "Variation des marges des projets",
                preuves: projetMobix("variation_marge", "Variation des marges (PDF)")
            },
            {
                nom: "Contrats sans paiements effectués",
                preuves: projetMobix("contrat_sans_paiement", "Suivi des contrats et paiements (PDF)")
            },
            {
                nom: "Tableau des temps effectués par collaborateur en fonction des objectifs initiaux",
                preuves: projetMobix("tableau_temps", "Temps effectués par collaborateur (PDF)")
            }
        ]
    },
    {
        periode: "Réalisations en milieu professionnel - 2ème année (Gaches Chimie)",
        projets: [
            {
                nom: "Workflow sur la phase de recrutement",
                preuves: projetGaches("workflow_recrutement", "README_recrutement.pdf", [
                    ["image1.png", "Page d'accueil du site"],
                    ["image2.png", "Formulaire de demande de recrutement"],
                    ["image3.png", "Page d'accueil des candidats"],
                    ["image4.png", "Formulaire d'ajout de candidats"]
                ])
            },
            {
                nom: "Workflow sur la phase de départ",
                preuves: projetGaches("Workflow_depart", "README_depart.pdf", [
                    ["image1.png", "Remise des besoins"],
                    ["image2.png", "Liste de tous les employés"]
                ])
            }
        ]
    }
];

// Outils et technologies (section "Les forges de la Moria").
// "projets" : où je les ai utilisés (liste vide = pratiqué en cours).
const OUTILS = [
    {
        categorie: "Langages",
        liste: [
            { nom: "HTML / CSS", icone: "fab fa-html5", projets: ["Site M2L", "Site de FAQ", "CazaFamilia", "Portfolio"] },
            { nom: "JavaScript", icone: "fab fa-js", projets: ["Site M2L", "CazaFamilia", "Workflows Gaches Chimie", "Cyna", "Portfolio"] },
            { nom: "PHP", icone: "fab fa-php", projets: ["Site de FAQ", "CazaFamilia", "Cyna"] },
            { nom: "SQL / MySQL", icone: "fas fa-database", projets: ["Site de FAQ", "CazaFamilia", "Tableaux Mobix", "Workflows Gaches Chimie", "Cyna"] },
            { nom: "Java", icone: "fab fa-java", projets: ["CazaFamilia (client lourd)", "Cyna (application d'administration Swing)"] },
            { nom: "Python", icone: "fab fa-python", projets: [] },
            { nom: "C", icone: "fab fa-cuttlefish", projets: [] }
        ]
    },
    {
        categorie: "Outils et plateformes",
        liste: [
            { nom: "Git / GitHub", icone: "fab fa-github", projets: ["Site de FAQ", "CazaFamilia", "Workflows Gaches Chimie", "Cyna", "Portfolio"] },
            { nom: "Docker", icone: "fab fa-docker", projets: ["Cyna"] },
            { nom: "Stripe", icone: "fab fa-stripe-s", projets: ["Cyna (paiement en ligne)"] },
            { nom: "Zoho Analytics", icone: "fas fa-chart-column", projets: ["Les 5 tableaux de bord Mobix"] },
            { nom: "GLPI", icone: "fas fa-server", projets: ["AP GLPI (gestion de parc)"] },
            { nom: "Trello", icone: "fab fa-trello", projets: ["Site de FAQ", "CazaFamilia"] },
            { nom: "Google Drive", icone: "fab fa-google-drive", projets: ["Site M2L"] }
        ]
    }
];
