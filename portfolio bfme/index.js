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
            cercleImg.style.width = "200px";
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
            cercleImg.style.width = "100px";
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
        'Portfolio': {
            'HTML/CSS': 'image/skills/portfolio/html-css.jpg',
            'JavaScript': 'image/skills/portfolio/javascript.jpg',
            'Git': 'image/skills/portfolio/git.jpg',
            'UI/UX Design': 'image/skills/portfolio/uiux.jpg'
        },
        'Projet 2': {
            'HTML/CSS': 'image/skills/projet2/html-css.jpg',
            'JavaScript': 'image/skills/projet2/javascript.jpg',
            'React': 'image/skills/projet2/react.jpg',
            'Git': 'image/skills/projet2/git.jpg'
        },
        'Projet 3': {
            'HTML/CSS': 'image/skills/projet3/html-css.jpg',
            'React': 'image/skills/projet3/react.jpg',
            'Node.js': 'image/skills/projet3/nodejs.jpg',
            'Git': 'image/skills/projet3/git.jpg',
            'UI/UX Design': 'image/skills/projet3/uiux.jpg'
        },
        'Projet 4': {
            'JavaScript': 'image/skills/projet4/javascript.jpg',
            'React': 'image/skills/projet4/react.jpg',
            'Node.js': 'image/skills/projet4/nodejs.jpg',
            'UI/UX Design': 'image/skills/projet4/uiux.jpg'
        },
        'Projet 5': {
            'HTML/CSS': 'image/skills/projet5/html-css.jpg',
            'JavaScript': 'image/skills/projet5/javascript.jpg',
            'Node.js': 'image/skills/projet5/nodejs.jpg',
            'Git': 'image/skills/projet5/git.jpg'
        },
        'Projet 6': {
            'HTML/CSS': 'image/skills/projet6/html-css.jpg',
            'JavaScript': 'image/skills/projet6/javascript.jpg',
            'React': 'image/skills/projet6/react.jpg',
            'Node.js': 'image/skills/projet6/nodejs.jpg',
            'Git': 'image/skills/projet6/git.jpg',
            'UI/UX Design': 'image/skills/projet6/uiux.jpg'
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

        // Ajouter les gestionnaires d'événements pour les cases cochées
        const checks = popupBody.querySelectorAll('.check');
        const skillImagePopup = popupBody.querySelector('#skill-image-popup');
        const skillImage = popupBody.querySelector('#skill-image');
        const closeSkillImage = popupBody.querySelector('.close-skill-image');

        checks.forEach(check => {
            check.style.cursor = 'pointer';
            check.addEventListener('click', () => {
                const skill = check.getAttribute('data-skill');
                const projectName = check.closest('tr').querySelector('td:first-child').textContent;
                
                if (skill && skillImages[projectName] && skillImages[projectName][skill]) {
                    skillImage.src = skillImages[projectName][skill];
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
});




