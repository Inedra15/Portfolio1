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
            cercleImg.style.width = "190px";
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
            cercleImg.style.width = "90px";
            fondCercle.style.width = "80px";
            texteCercle.style.fontSize = "10px";
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

    // Images pour chaque compétence
    const skillImages = {
        'HTML/CSS': 'https://picsum.photos/400/300?random=1',
        'JavaScript': 'https://picsum.photos/400/300?random=2',
        'React': 'https://picsum.photos/400/300?random=3',
        'Node.js': 'https://picsum.photos/400/300?random=4',
        'Git': 'https://picsum.photos/400/300?random=5',
        'UI/UX Design': 'https://picsum.photos/400/300?random=6'
    };
    
    // Contenu pour chaque popup
    const popupContents = {
        rond: `
            <h2>À Propos</h2>
            <p>Je suis étudiant en deuxième année de BTS SIO (Services Informatiques aux Organisations), 
            spécialité SLAM (Solutions logiciel et application métier).</p>
            <p>J'ai toujours eu une attirance pour l'informatique et plus spécialement dans le développement 
            informatique. C'est tout naturellement que je me suis tourné vers cette formation, après avoir 
            obtenu mon BAC Général spécialité mathématique et physique chimie en 2021 et après 2ans en 
            licences Mathématique et informatique appliqué aux sciences humaines et sociales.</p>
            <div class="projet-professionnel">
                <h3>Projet professionnel</h3>
                <p>Professionnellement je souhaite m'orienter vers le métier de développeur web.</p>
                <p>Après l'obtention de mon BTS SIO - BAC+2, je souhaiterais poursuivre mon cursus en suivant une formation en BACHELOR - BAC+3 ou d'une licence professionnel dans le domaine du développement informatique, puis par la suite mon objectif est de continuer vers une formation en master-BAC+5.</p>
                <p>Je souhaite continuer ma formation par le biais de l'apprentissage en alternance, ce qui me permettra :</p>
                <ul>
                    <li>D'acquérir une expérience professionnelle, et de pouvoir confronter mes connaissances théoriques aux réalités du terrain</li>
                    <li>Le monde de l'entreprise est toujours en mouvement, l'alternance offre la possibilité de participer à la construction et au développement de nouveaux projets</li>
                </ul>
            </div>
        `,
        rond2: `
            <h2>Projets</h2>
            <div class="projet">
                <h3>Stage Mobix</h3>
                <p>Stage BTS SIO de 1er année. Stage suivi dans l'entreprise MOBIX au sein du service production informatique.</p>
                
                <h3>Expériences professionnelles</h3>
                <ul>
                    <li>Opérateur en conditionnement de produits chimiques - Gaches Chimie, Escalquens (2022-2023)</li>
                    <li>Stage d'observation - Chirurgien-dentiste, Caraman (2021)</li>
                    <li>Stage d'observation - Institut de recherche Pierre Fabre Médicaments, Castres</li>
                </ul>
            </div>
        `,
        rond3: `
            <h2>Compétences</h2>
            <table class="skills-table">
                <thead>
                    <tr>
                        <th>Projets</th>
                        <th>HTML/CSS</th>
                        <th>JavaScript</th>
                        <th>React</th>
                        <th>Node.js</th>
                        <th>Git</th>
                        <th>UI/UX Design</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Portfolio</td>
                        <td><span class="check" data-skill="HTML/CSS">✓</span></td>
                        <td><span class="check" data-skill="JavaScript">✓</span></td>
                        <td><span class="cross">✕</span></td>
                        <td><span class="cross">✕</span></td>
                        <td><span class="check" data-skill="Git">✓</span></td>
                        <td><span class="check" data-skill="UI/UX Design">✓</span></td>
                    </tr>
                    <tr>
                        <td>Projet 2</td>
                        <td><span class="check" data-skill="HTML/CSS">✓</span></td>
                        <td><span class="check" data-skill="JavaScript">✓</span></td>
                        <td><span class="check" data-skill="React">✓</span></td>
                        <td><span class="cross">✕</span></td>
                        <td><span class="check" data-skill="Git">✓</span></td>
                        <td><span class="cross">✕</span></td>
                    </tr>
                    <tr>
                        <td>Projet 3</td>
                        <td><span class="check" data-skill="HTML/CSS">✓</span></td>
                        <td><span class="cross">✕</span></td>
                        <td><span class="check" data-skill="React">✓</span></td>
                        <td><span class="check" data-skill="Node.js">✓</span></td>
                        <td><span class="check" data-skill="Git">✓</span></td>
                        <td><span class="check" data-skill="UI/UX Design">✓</span></td>
                    </tr>
                    <tr>
                        <td>Projet 4</td>
                        <td><span class="cross">✕</span></td>
                        <td><span class="check" data-skill="JavaScript">✓</span></td>
                        <td><span class="check" data-skill="React">✓</span></td>
                        <td><span class="check" data-skill="Node.js">✓</span></td>
                        <td><span class="cross">✕</span></td>
                        <td><span class="check" data-skill="UI/UX Design">✓</span></td>
                    </tr>
                    <tr>
                        <td>Projet 5</td>
                        <td><span class="check" data-skill="HTML/CSS">✓</span></td>
                        <td><span class="check" data-skill="JavaScript">✓</span></td>
                        <td><span class="cross">✕</span></td>
                        <td><span class="check" data-skill="Node.js">✓</span></td>
                        <td><span class="check" data-skill="Git">✓</span></td>
                        <td><span class="cross">✕</span></td>
                    </tr>
                    <tr>
                        <td>Projet 6</td>
                        <td><span class="check" data-skill="HTML/CSS">✓</span></td>
                        <td><span class="check" data-skill="JavaScript">✓</span></td>
                        <td><span class="check" data-skill="React">✓</span></td>
                        <td><span class="check" data-skill="Node.js">✓</span></td>
                        <td><span class="check" data-skill="Git">✓</span></td>
                        <td><span class="check" data-skill="UI/UX Design">✓</span></td>
                    </tr>
                </tbody>
            </table>
            <div id="skill-image-popup" class="skill-image-popup">
                <span class="close-skill-image">&times;</span>
                <img id="skill-image" src="" alt="Compétence">
            </div>
        `,
        rond4: `
            <h2>CV</h2>
            <div class="cv-content">
                <h3>Formation</h3>
                <ul>
                    <li>BTS SIO - option SLAM (2023 - Aujourd'hui)
                        <p>Institut Limayrac</p>
                    </li>
                    <li>Licence MIASHS - option santé (2021 - 2023)
                        <p>Aix Marseille université</p>
                    </li>
                    <li>Bac générale scientifique (2018 - 2021)
                        <p>Lycée Vincent auriol</p>
                    </li>
                    <li>Collège (2014 - 2018)
                        <p>Collège François Mitterrand</p>
                    </li>
                </ul>
            </div>
        `,
        rond5: `
            <h2>Contact</h2>
            <div class="info-section">
                <h3>Informations personnelles</h3>
                <ul>
                    <li>École : Institut Limayrac - Toulouse(31)</li>
                    <li>Téléphone : 07 81 83 61 74</li>
                    <li>Email : a.cachoux@gmail.com</li>
                    <li>Diplôme : Bac générale scientifique</li>
                </ul>
            </div>
            <p>N'hésitez pas à me contacter pour discuter de vos projets :</p>
            <ul class="contact-list">
                <li>📧 Email : a.cachoux@gmail.com</li>
                <li>📱 Téléphone : 07 81 83 61 74</li>
                <li>🏫 École : Institut Limayrac - Toulouse(31)</li>
            </ul>
        `
    };
    
    // Fonction pour ouvrir la popup
    function openPopup(content) {
        popupBody.innerHTML = content;
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
                if (skill && skillImages[skill]) {
                    skillImage.src = skillImages[skill];
                    skillImagePopup.style.display = 'flex';
                }
            });
        });

        if (closeSkillImage) {
            closeSkillImage.addEventListener('click', () => {
                skillImagePopup.style.display = 'none';
            });
        }

        // Ajouter le gestionnaire d'événements pour fermer en cliquant à côté
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
            const content = popupContents[element.id];
            openPopup(content);
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
            const content = popupContents[section];
            
            // Ferme le menu burger
            burgerIcon.classList.remove('active');
            navSidebar.classList.remove('active');
            
            // Ouvre la popup correspondante
            openPopup(content);
        });
    });

    //cercle.style.display = "flex";
});




