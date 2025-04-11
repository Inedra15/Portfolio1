document.addEventListener("DOMContentLoaded", function () {
    let button = document.querySelector(".explore-button"); // Sélectionne le bouton
    let background = document.querySelector(".background_image img"); // Sélectionne l'image
    let intro = document.getElementById("intro"); // Sélectionne la div intro
    let cercle = document.getElementById("cercle"); // Sélectionne le cercle
    let rond = document.getElementById("rond"); // Sélectionne le rond
    let rond2 = document.getElementById("rond2");
    let rond3 = document.getElementById("rond3");
    let rond4 = document.getElementById("rond4");
    let rond5 = document.getElementById("rond5");
    
    // Sélection de tous les cercles et fonds
    let tousLesCercles = document.querySelectorAll(".div_comp .cercle");
    let tousLesFonds = document.querySelectorAll(".div_comp .fond_cercle");
    let tousLesTextes = document.querySelectorAll(".texte_cercle");
    
    // Debug des éléments sélectionnés
    console.log("Nombre de cercles trouvés:", tousLesCercles.length);
    console.log("Nombre de fonds trouvés:", tousLesFonds.length);
    console.log("Nombre de textes trouvés:", tousLesTextes.length);
    
    // Tailles initiales
    const tailleInitialeCercle = 80;
    const tailleInitialeFond = 70;
    const tailleInitialeTexte = 14;

    // Fonction pour agrandir les cercles
    function agrandirCercles(event) {
        console.log("Agrandissement des cercles"); // Debug
        const cercleParent = event.target.closest('.div_comp');
        const cercleImg = cercleParent.querySelector('.cercle');
        const fondCercle = cercleParent.querySelector('.fond_cercle');
        const texteCercle = cercleParent.querySelector('.texte_cercle');

        if (cercleImg && fondCercle && texteCercle) {
            cercleImg.style.width = "270px";
            fondCercle.style.width = "170px";
            texteCercle.style.fontSize = "26px";
            texteCercle.style.width = "150px";
        }
    }

    // Fonction pour réduire les cercles
    function reduireCercles(event) {
        console.log("Réduction des cercles"); // Debug
        const cercleParent = event.target.closest('.div_comp');
        const cercleImg = cercleParent.querySelector('.cercle');
        const fondCercle = cercleParent.querySelector('.fond_cercle');
        const texteCercle = cercleParent.querySelector('.texte_cercle');

        if (cercleImg && fondCercle && texteCercle) {
            cercleImg.style.width = "135px";
            fondCercle.style.width = "85px";
            texteCercle.style.fontSize = "12px";
            texteCercle.style.width = "70px";
        }
    }

    // Ajout des événements de survol sur tous les cercles
    tousLesCercles.forEach(cercle => {
        cercle.addEventListener("mouseenter", agrandirCercles);
        cercle.addEventListener("mouseleave", reduireCercles);
    });

    // Ajout des transitions CSS pour une animation fluide
    tousLesCercles.forEach(cercle => cercle.style.transition = "width 0.3s ease");
    tousLesFonds.forEach(fond => fond.style.transition = "width 0.3s ease");
    tousLesTextes.forEach(texte => texte.style.transition = "all 0.3s ease");
    
    // Fonction pour faire apparaître un cercle avec animation
    function apparaitreCercle(element, delai) {
        setTimeout(() => {
            // D'abord, on affiche l'élément avec opacité 0
            element.style.display = "flex";
            element.style.opacity = "0";
            element.style.transform = "scale(0.5)";
            
            // Petit délai pour laisser le navigateur prendre en compte le display: flex
            setTimeout(() => {
                // Ensuite, on applique l'opacité et l'échelle
                element.style.opacity = "1";
                element.style.transform = "scale(1)";
            }, 50);
        }, delai);
    }
    
    button.addEventListener("click", function () {
        // Assurer que l'origine de transformation est bien au centre
        background.style.transformOrigin = "center";
        background.style.display = "block";

        // Applique la transition sur le flou et le zoom en même temps
        background.style.transition = "filter 1s ease-out, transform 1s ease-out";
        background.style.filter = "blur(0px)";
        background.style.transform = "scale(1.08)";

        // Fait disparaître l'intro en douceur
        intro.style.transition = "opacity 1s ease-out";
        intro.style.opacity = "0";
        cercle.style.transition = "opacity 1s ease-out";
        cercle.style.opacity = "0";

        // Réinitialise les cercles pour l'animation
        [rond, rond2, rond3, rond4, rond5].forEach(element => {
            element.style.transition = "opacity 1s ease-out, transform 1s ease-out";
            element.style.opacity = "0";
            element.style.transform = "scale(0.5)";
            element.style.display = "none";
        });

        // Après la transition initiale
        setTimeout(() => {
            intro.style.display = "none";
            cercle.style.display = "none";

            // Apparition désynchronisée des cercles avec des délais plus longs
            apparaitreCercle(rond, 500);     // Premier cercle après 500ms
            apparaitreCercle(rond2, 1000);   // Deuxième cercle après 1000ms
            apparaitreCercle(rond3, 1500);   // Troisième cercle après 1500ms
            apparaitreCercle(rond4, 2000);   // Quatrième cercle après 2000ms
            apparaitreCercle(rond5, 2500);   // Cinquième cercle après 2500ms

            // Ouvre la barre de navigation après l'apparition des cercles
            setTimeout(() => {
                burgerIcon.classList.add('active');
                navSidebar.classList.add('active');
            }, 3000); // Ouvre la nav après 3 secondes (après l'apparition du dernier cercle)
            }, 1000);
    });

    // Sélection des éléments de la popup
    const popupOverlay = document.getElementById("popup-overlay");
    const popupBody = document.querySelector(".popup-body");
    const closePopup = document.querySelector(".close-popup");
    const popupSections = document.querySelectorAll(".popup-section");

    // Images pour chaque compétence par projet
    const skillImages = {
        'LinkedIn,CV': {
            'Organiser son développement professionnel': 'image/competences/linkedin_CV/organiser_developpement'
        },
        'CazaFamilia - Système de gestion de restaurant italien': {
            'Répondre aux incidents': 'image/competences/CazaFamilia/repondre_incidents',
            'Développer la présence en ligne': 'image/competences/CazaFamilia/developper_en_ligne',
            'Travailler en mode projet': 'image/competences/CazaFamilia/travailler_projet',
            'Mettre à disposition': 'image/competences/CazaFamilia/mettre_a_dispo'
        },
        'Site web M2L': {
            'Travailler en mode projet': 'image/competences/M2L/travailler_projet',
            'Mettre à disposition': 'image/competences/M2L/mettre_a_dispo',
            'Organiser son développement professionnel': 'image/competences/M2L/organiser_developpement'
        },
        'AP GLPI': {
            'Gérer le patrimoine informatique': 'image/competences/apGLPI/gerer_patrimoine'
        },
        'Planification d\'un projet via l\'outil Trello': {
            'Mettre à disposition': 'image/competences/Trello/mettre_a_dispo'
        },
        'Portfolio': {
            'Organiser son développement professionnel': 'image/competences/Portfolio/organiser_developpement'
        },
        'Machines virtuelles Windows, Windows Server et Linux': {
            'Répondre aux incidents': 'image/competences/VM/repondre_incidents',
            'Mettre à disposition': 'image/competences/VM/mettre_a_dispo'
        },
        'Site web d\'FAQ': {
            'Répondre aux incidents': 'image/competences/FAQ/repondre_incidents',
            'Développer la présence en ligne': 'image/competences/FAQ/developper_en_ligne',
            'Travailler en mode projet': 'image/competences/FAQ/travailler_projet',
            'Mettre à disposition': 'image/competences/FAQ/mettre_a_dispo'
        },
        'Workflow sur la phase de recrutement': {
            'Gérer le patrimoine informatique': 'image/competences/Gaches Chimie/workflow_recrutement/gerer_patrimoine',
            'Répondre aux incidents': 'image/competences/Gaches Chimie/workflow_recrutement/repondre_incidents',
            'Travailler en mode projet': 'image/competences/Gaches Chimie/workflow_recrutement/travailler_projet',
            'Mettre à disposition': 'image/competences/Gaches Chimie/workflow_recrutement/mettre_a_dispo',
            'Organiser son développement professionnel': 'image/competences/Gaches Chimie/workflow_recrutement/organiser_developpement'
        },
        'Workflow sur la phase de départ': {
            'Gérer le patrimoine informatique': 'image/competences/Gaches Chimie/Workflow_depart/gerer_patrimoine',
            'Répondre aux incidents': 'image/competences/Gaches Chimie/Workflow_depart/repondre_incidents',
            'Travailler en mode projet': 'image/competences/Gaches Chimie/Workflow_depart/travailler_projet',
            'Mettre à disposition': 'image/competences/Gaches Chimie/Workflow_depart/mettre_a_dispo',
            'Organiser son développement professionnel': 'image/competences/Gaches Chimie/Workflow_depart/organiser_developpement'
        },
        // Projets Mobix
        'Tableau prévisionnel de la charge de travail à prévoir en plus par collaborateur': {
            'Répondre aux incidents': 'image/competences/mobix/Tableau_previsionelle/repondre_incidents',
            'Travailler en mode projet': 'image/competences/mobix/Tableau_previsionelle/travailler_projet',
            'Mettre à disposition': 'image/competences/mobix/Tableau_previsionelle/mettre_a_dispo'
        },
        'Indicateur de retard de tous les projets ouverts': {
            'Répondre aux incidents': 'image/competences/mobix/indicateur_retard/repondre_incidents',
            'Travailler en mode projet': 'image/competences/mobix/indicateur_retard/travailler_projet',
            'Mettre à disposition': 'image/competences/mobix/indicateur_retard/mettre_a_dispo'
        },
        'Variation des marges des projets': {
            'Répondre aux incidents': 'image/competences/mobix/variation_marge/repondre_incidents',
            'Travailler en mode projet': 'image/competences/mobix/variation_marge/travailler_projet',
            'Mettre à disposition': 'image/competences/mobix/variation_marge/mettre_a_dispo'
        },
        'Contrats sans paiements effectués': {
            'Répondre aux incidents': 'image/competences/mobix/contrat_sans_paiement/repondre_incidents',
            'Travailler en mode projet': 'image/competences/mobix/contrat_sans_paiement/travailler_projet',
            'Mettre à disposition': 'image/competences/mobix/contrat_sans_paiement/mettre_a_dispo'
        },
        'Tableau des temps effectués par collaborateur en fonction des objectifs initiaux': {
            'Répondre aux incidents': 'image/competences/mobix/tableau_temps/repondre_incidents',
            'Travailler en mode projet': 'image/competences/mobix/tableau_temps/travailler_projet',
            'Mettre à disposition': 'image/competences/mobix/tableau_temps/mettre_a_dispo'
        },
        'Actualisation de la date de paiement des contrats payés mensuellement': {
            'Répondre aux incidents': 'image/competences/mobix/actualisation_date/repondre_incidents',
            'Travailler en mode projet': 'image/competences/mobix/actualisation_date/travailler_projet',
            'Mettre à disposition': 'image/competences/mobix/actualisation_date/mettre_a_dispo'
        },
        'Modification fiche devis client en fonction des dates': {
            'Répondre aux incidents': 'image/competences/mobix/modification_devis/repondre_incidents',
            'Travailler en mode projet': 'image/competences/mobix/modification_devis/travailler_projet',
            'Mettre à disposition': 'image/competences/mobix/modification_devis/mettre_a_dispo'
        }
    };
    
    // Fonction pour ouvrir la popup
    function openPopup(sectionId) {
        // Cacher toutes les sections
        popupSections.forEach(section => {
            section.style.display = 'none';
        });

        // Afficher la section demandée
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
        }

        popupOverlay.classList.add("active");
        document.body.style.overflow = "hidden";

        // Fermer le menu burger
        burgerIcon.classList.remove('active');
        navSidebar.classList.remove('active');

        // Ajouter les gestionnaires d'événements pour les cases cochées
        const checks = popupBody.querySelectorAll('.check');
        const skillImagePopup = popupBody.querySelector('#skill-image-popup');
        const skillImage = popupBody.querySelector('#skill-image');
        const closeSkillImage = popupBody.querySelector('.close-skill-image');

        checks.forEach(check => {
            check.style.cursor = 'pointer';
            check.addEventListener('click', () => {
                const projectRow = check.closest('tr');
                const projectName = projectRow.querySelector('td:first-child').textContent.trim();
                const headerCells = document.querySelectorAll('.skills-table th');
                const cellIndex = Array.from(check.closest('td').parentElement.children).indexOf(check.closest('td'));
                const fullSkill = headerCells[cellIndex].textContent.trim();
                
                // Mapping des titres complets vers les clés courtes
                const skillMapping = {
                    'Mettre à disposition un service informatique': 'Mettre à disposition',
                    'Organiser son développement professionnel': 'Organiser son développement professionnel',
                    'Gérer le patrimoine informatique': 'Gérer le patrimoine informatique',
                    'Répondre aux incidents et aux demandes d\'assistance et d\'évolution': 'Répondre aux incidents',
                    'Développer la présence en ligne de l\'organisation': 'Développer la présence en ligne',
                    'Travailler en mode projet': 'Travailler en mode projet'
                };

                const skill = skillMapping[fullSkill] || fullSkill;

                if (skillImages[projectName] && skillImages[projectName][skill]) {
                    const imagePath = skillImages[projectName][skill];
                    
                    // Créer un conteneur pour les images et PDFs
                    const imagesContainer = document.createElement('div');
                    imagesContainer.className = 'skill-images-container';
                    
                    let hasContent = false;
                    
                    // Tableau des extensions d'images et PDF possibles
                    const imageExt = ['.png', '.jpg', '.jpeg'];
                    const pdfExt = ['.pdf'];
                    
                    // Essayer de charger jusqu'à 5 images numérotées avec différentes extensions
                    for (let i = 1; i <= 5; i++) {
                        // Vérifier d'abord les images
                        for (const ext of imageExt) {
                            const imgPath = `${imagePath}/image${i}${ext}`;
                            
                            const img = document.createElement('img');
                            img.src = imgPath;
                            img.alt = `Compétence ${i}`;
                            img.dataset.loaded = 'false';
                            
                            img.onload = function() {
                                this.dataset.loaded = 'true';
                                hasContent = true;
                                imagesContainer.appendChild(this);
                            };
                            
                            img.onerror = function() {
                                // Ne rien faire, l'image sera ignorée
                                this.remove();
                            };
                            
                            // Ajouter temporairement pour déclencher le chargement
                            document.body.appendChild(img);
                            document.body.removeChild(img);
                        }
                        
                        // Vérifier ensuite les PDFs
                        for (const ext of pdfExt) {
                            const pdfPath = `${imagePath}/document${i}${ext}`;
                            
                            // Créer un conteneur pour le PDF avec un bouton pour l'ouvrir
                            const pdfContainer = document.createElement('div');
                            pdfContainer.className = 'pdf-container';
                            
                            const pdfLink = document.createElement('a');
                            pdfLink.href = pdfPath;
                            pdfLink.target = '_blank';
                            pdfLink.textContent = `Voir le document ${i}`;
                            pdfLink.className = 'pdf-link';
                            
                            // Vérifier si le PDF existe
                            fetch(pdfPath, { method: 'HEAD' })
                                .then(response => {
                                    if (response.ok) {
                                        pdfContainer.appendChild(pdfLink);
                                        imagesContainer.appendChild(pdfContainer);
                                        hasContent = true;
                                        
                                        // Ajouter un aperçu du PDF intégré
                                        const pdfPreview = document.createElement('div');
                                        pdfPreview.className = 'pdf-preview';
                                        
                                        const pdfEmbed = document.createElement('iframe');
                                        pdfEmbed.src = pdfPath;
                                        pdfEmbed.width = '100%';
                                        pdfEmbed.height = '300px';
                                        pdfEmbed.frameBorder = '0';
                                        
                                        pdfPreview.appendChild(pdfEmbed);
                                        imagesContainer.appendChild(pdfPreview);
                                    }
                                })
                                .catch(() => {
                                    // Ne rien faire, le PDF n'existe pas
                                });
                        }
                    }
                    
                    // Ajouter un message si aucun contenu n'a été trouvé
                    setTimeout(() => {
                        if (imagesContainer.children.length === 0) {
                            const message = document.createElement('p');
                            message.textContent = "Les contenus pour cette compétence seront bientôt disponibles.";
                            message.style.color = "#FFA500";
                            message.style.textAlign = "center";
                            message.style.padding = "30px";
                            message.style.backgroundColor = "rgba(255, 165, 0, 0.1)";
                            message.style.borderRadius = "8px";
                            imagesContainer.appendChild(message);
                        }
                    }, 300);
                    
                    // Vider et ajouter le conteneur à la popup
                    skillImagePopup.innerHTML = '';
                    skillImagePopup.appendChild(closeSkillImage);
                    skillImagePopup.appendChild(imagesContainer);
                    
                    // Positionner la popup par rapport à la position de défilement
                    const popupContent = document.querySelector('.popup-content');
                    const scrollTop = popupContent.scrollTop;
                    skillImagePopup.style.top = `${scrollTop}px`;
                    skillImagePopup.style.display = 'flex';
                }
            });
        });

        if (closeSkillImage) {
            closeSkillImage.addEventListener('click', () => {
                skillImagePopup.style.display = 'none';
            });
        }

        if (skillImagePopup) {
            skillImagePopup.addEventListener('click', (e) => {
                if (e.target === skillImagePopup) {
                    skillImagePopup.style.display = 'none';
                }
            });
        }
    }
    
    // Fonction pour fermer la popup
    function closePopupHandler() {
        popupOverlay.classList.remove("active");
        document.body.style.overflow = ""; // Réactive le défilement
        
        // Ouvrir le menu burger
        burgerIcon.classList.add('active');
        navSidebar.classList.add('active');
    }
    
    // Ajout des événements de fermeture
    closePopup.addEventListener("click", closePopupHandler);
    popupOverlay.addEventListener("click", (e) => {
        if (e.target === popupOverlay) {
            closePopupHandler();
        }
    });
    
    // Ajout des événements de clic sur les cercles
    [rond, rond2, rond3, rond4, rond5].forEach(element => {
        element.addEventListener("click", () => {
            const sectionId = element.id === 'rond' ? 'about-content' :
                            element.id === 'rond2' ? 'projects-content' :
                            element.id === 'rond3' ? 'skills-content' :
                            element.id === 'rond4' ? 'cv-content' :
                            'contact-content';
            openPopup(sectionId);
        });
    });

    // Sélection des éléments du menu burger
    const burgerIcon = document.querySelector('.burger-icon');
    const navSidebar = document.querySelector('.nav-sidebar');
    const navLinks = document.querySelectorAll('.nav-sidebar a');

    // Gestionnaire pour le menu burger
    burgerIcon.addEventListener('click', () => {
        burgerIcon.classList.toggle('active');
        navSidebar.classList.toggle('active');
    });

    // Gestionnaires pour les liens de navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.getAttribute('data-section');
            const sectionId = section === 'rond' ? 'about-content' :
                            section === 'rond2' ? 'projects-content' :
                            section === 'rond3' ? 'skills-content' :
                            section === 'rond4' ? 'cv-content' :
                            'contact-content';
            
            // Ferme le menu burger
            burgerIcon.classList.remove('active');
            navSidebar.classList.remove('active');
            
            // Ouvre la popup correspondante
            openPopup(sectionId);
        });
    });

    // Gestionnaire pour les liens sociaux
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            const href = link.getAttribute('href');
            if (href) {
                window.open(href, '_blank');
            }
            return false;
        }, true); // Ajout de la capture phase
    });

    //cercle.style.display = "flex";

    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            try {
                const response = await fetch('https://formspree.io/f/mzzekgzp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    alert('Message envoyé avec succès !');
                    contactForm.reset();
                } else {
                    throw new Error('Erreur lors de l\'envoi du message');
                }
            } catch (error) {
                alert('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.');
                console.error('Erreur:', error);
            }
        });
    }

    // Ajouter un écouteur d'événements pour le défilement
    const popupContent = document.querySelector('.popup-content');
    popupContent.addEventListener('scroll', () => {
        if (skillImagePopup.style.display === 'flex') {
            const scrollTop = popupContent.scrollTop;
            skillImagePopup.style.top = `${scrollTop}px`;
        }
    });
});




