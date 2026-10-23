/* =========================================================
   LOGIQUE DU PORTFOLIO
   Les données (projets, preuves) sont dans donnees.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    // Sections disponibles : l'identifiant sert aussi d'ancre dans l'URL (#projets...)
    const SECTIONS = ["apropos", "projets", "competences", "cv", "contact"];

    // L'utilisateur a-t-il demandé à réduire les animations (réglage du système) ?
    const animationsReduites = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* -----------------------------------------------------
       1. INTRO : bouton "Commencer à explorer"
       ----------------------------------------------------- */
    const boutonExplorer = document.querySelector(".explore-button");

    // Lance l'exploration : le CSS se charge de toutes les animations
    // (fondu de l'intro, défloutage de la carte, apparition des cercles)
    function lancerExploration(instantane) {
        if (document.body.classList.contains("exploration")) return;
        if (instantane) document.body.classList.add("sans-animation");
        document.body.classList.add("exploration");
        // La carte devient défilable avec la classe "exploration" : on la centre aussitôt
        centrerCarte();

        // Sur grand écran, on ouvre le menu latéral une fois les cercles apparus
        if (!instantane && window.matchMedia("(min-width: 1401px)").matches) {
            setTimeout(() => ouvrirMenu(true), animationsReduites ? 0 : 3500);
        }
        // Enlève la classe une fois la page affichée pour réactiver les transitions
        if (instantane) requestAnimationFrame(() => requestAnimationFrame(() => {
            document.body.classList.remove("sans-animation");
        }));
    }

    boutonExplorer.addEventListener("click", () => lancerExploration(false));

    /* -----------------------------------------------------
       1 bis. CARTE : sur un écran plus étroit que la carte (mobile),
       on la centre sur les cercles et on indique qu'elle peut glisser
       ----------------------------------------------------- */
    const zoneCarte = document.querySelector(".menu-stage");
    const carte = document.querySelector(".carte");
    const indiceGlisser = document.querySelector(".indice-glisser");

    function centrerCarte() {
        // 52 % = milieu horizontal des lieux placés sur la carte
        zoneCarte.scrollLeft = carte.offsetWidth * 0.52 - zoneCarte.clientWidth / 2;

        if (zoneCarte.scrollWidth > zoneCarte.clientWidth + 40) {
            indiceGlisser.classList.add("visible");
            const cacher = () => indiceGlisser.classList.remove("visible");
            // Le défilement fait par l'utilisateur cache l'indication
            // (on attend un peu pour ignorer le centrage automatique ci-dessus)
            setTimeout(() => zoneCarte.addEventListener("scroll", cacher, { once: true }), 300);
            setTimeout(cacher, 6000);
        }
    }

    /* -----------------------------------------------------
       2. MENU BURGER (barre latérale)
       ----------------------------------------------------- */
    const burgerIcon = document.querySelector(".burger-icon");
    const navSidebar = document.querySelector(".nav-sidebar");

    function ouvrirMenu(ouvert) {
        burgerIcon.classList.toggle("active", ouvert);
        navSidebar.classList.toggle("active", ouvert);
        burgerIcon.setAttribute("aria-expanded", ouvert);
        burgerIcon.setAttribute("aria-label", ouvert ? "Fermer le menu" : "Ouvrir le menu");
    }

    burgerIcon.addEventListener("click", () => {
        ouvrirMenu(!navSidebar.classList.contains("active"));
    });

    // Touche Échap : ferme le menu
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navSidebar.classList.contains("active") && !popup.open) {
            ouvrirMenu(false);
            burgerIcon.focus();
        }
    });

    /* -----------------------------------------------------
       3. POPUP PRINCIPALE (élément <dialog> natif)
       Navigation par ancre : #apropos, #projets, etc.
       → les liens sont partageables et le bouton "retour"
         du navigateur ferme la popup.
       ----------------------------------------------------- */
    const popup = document.getElementById("popup");
    const barreProgression = popup.querySelector(".popup-progress");
    const onglets = popup.querySelectorAll(".popup-onglets a");

    // Affiche une section dans la popup
    function afficherSection(id) {
        const changer = () => {
            document.querySelectorAll(".popup-section").forEach(section => {
                section.hidden = section.id !== id;
            });
            onglets.forEach(onglet => {
                const actif = onglet.dataset.section === id;
                onglet.classList.toggle("actif", actif);
                if (actif) {
                    onglet.setAttribute("aria-current", "page");
                    // Sur mobile, les onglets défilent : on rend l'onglet actif visible
                    onglet.scrollIntoView({ block: "nearest", inline: "nearest" });
                } else {
                    onglet.removeAttribute("aria-current");
                }
            });
            popup.scrollTop = 0;
            majProgression();
        };

        // View Transitions API : fondu enchaîné entre deux sections
        // (navigateurs récents ; sinon le changement est simplement immédiat)
        if (popup.open && document.startViewTransition && !animationsReduites) {
            document.startViewTransition(changer);
        } else {
            changer();
        }

        if (!popup.open) {
            ouvrirMenu(false);
            popup.showModal();
        }
        const titre = document.querySelector("#" + id + " h2");
        document.title = (titre ? titre.textContent + " · " : "") + "Portfolio Adrien Cachoux";
    }

    // Lit l'ancre de l'URL et ouvre/ferme la popup en conséquence
    function suivreAncre() {
        const id = location.hash.slice(1);
        if (SECTIONS.includes(id)) {
            lancerExploration(true);
            afficherSection(id);
        } else if (popup.open) {
            popup.close();
        }
    }

    window.addEventListener("hashchange", suivreAncre);

    // À la fermeture : on retire l'ancre de l'URL
    popup.addEventListener("close", () => {
        document.title = "Portfolio Adrien Cachoux";
        if (location.hash) {
            history.pushState("", "", location.pathname + location.search);
        }
        // Sur grand écran, le menu latéral se rouvre (comme avant)
        if (window.matchMedia("(min-width: 1401px)").matches) ouvrirMenu(true);
    });

    // Clic sur le fond sombre (en dehors du contenu) → fermeture
    popup.addEventListener("click", (e) => {
        if (e.target === popup) popup.close();
    });
    popup.querySelector(".close-popup").addEventListener("click", () => popup.close());

    // Barre de progression de lecture en haut de la popup
    function majProgression() {
        const max = popup.scrollHeight - popup.clientHeight;
        const ratio = max > 0 ? popup.scrollTop / max : 0;
        barreProgression.style.transform = `scaleX(${ratio})`;
    }
    popup.addEventListener("scroll", majProgression, { passive: true });

    /* -----------------------------------------------------
       4. TABLEAU DES COMPÉTENCES (généré depuis donnees.js)
       ----------------------------------------------------- */
    const tableau = document.querySelector(".skills-table");

    function construireTableau() {
        // En-tête : "Projets" + une colonne par compétence
        let html = "<thead><tr><th scope=\"col\">Projets</th>";
        COMPETENCES.forEach(c => {
            html += `<th scope="col" data-competence="${c.id}">${c.nom}</th>`;
        });
        html += "</tr></thead><tbody>";

        REALISATIONS.forEach((groupe, g) => {
            html += `<tr class="section-header"><td colspan="${COMPETENCES.length + 1}">${groupe.periode}</td></tr>`;
            groupe.projets.forEach((projet, p) => {
                const competencesDuProjet = Object.keys(projet.preuves).join(" ");
                html += `<tr data-competences="${competencesDuProjet}"><th scope="row">${projet.nom}</th>`;
                COMPETENCES.forEach(c => {
                    const preuve = projet.preuves[c.id];
                    if (!preuve) {
                        html += `<td data-competence="${c.id}"><span class="visually-hidden">Non</span></td>`;
                    } else if (preuve.lien) {
                        // Preuve = lien externe (site en ligne, profil LinkedIn...)
                        html += `<td data-competence="${c.id}"><a class="check" data-label="${c.court}" href="${preuve.lien}" target="_blank" rel="noopener"
                                 title="Ouvrir le lien" aria-label="${c.court} : ouvrir le lien (nouvel onglet)">✓<i class="fas fa-arrow-up-right-from-square"></i></a></td>`;
                    } else {
                        // Preuve = fichiers → ouverture de la visionneuse
                        html += `<td data-competence="${c.id}"><button type="button" class="check" data-label="${c.court}" data-groupe="${g}" data-projet="${p}" data-competence="${c.id}"
                                 title="${preuve.length} preuve(s)" aria-label="${c.court} : voir ${preuve.length} preuve(s)">✓</button></td>`;
                    }
                });
                html += "</tr>";
            });
        });
        tableau.innerHTML = html + "</tbody>";
    }

    // Filtres : met en valeur une compétence et les projets qui la valident
    function construireFiltres() {
        const zone = document.querySelector(".filtres-competences");
        const tousLesProjets = REALISATIONS.flatMap(g => g.projets);

        let html = `<button type="button" class="filtre actif" data-filtre="" aria-pressed="true">Toutes</button>`;
        COMPETENCES.forEach(c => {
            const nb = tousLesProjets.filter(p => p.preuves[c.id]).length;
            html += `<button type="button" class="filtre" data-filtre="${c.id}" aria-pressed="false" title="${c.nom}">
                        ${c.court} <span class="badge">${nb}</span></button>`;
        });
        zone.innerHTML = html;

        zone.addEventListener("click", (e) => {
            const bouton = e.target.closest(".filtre");
            if (!bouton) return;
            const id = bouton.dataset.filtre;
            zone.querySelectorAll(".filtre").forEach(b => {
                b.classList.toggle("actif", b === bouton);
                b.setAttribute("aria-pressed", b === bouton);
            });
            tableau.dataset.filtre = id;
            tableau.querySelectorAll("tbody tr[data-competences]").forEach(ligne => {
                const valide = !id || ligne.dataset.competences.split(" ").includes(id);
                ligne.classList.toggle("attenue", !valide);
            });
            // Un titre de période sans aucun projet visible en dessous est lui aussi atténué
            tableau.querySelectorAll("tr.section-header").forEach(titre => {
                let ligne = titre.nextElementSibling;
                let aucunVisible = true;
                while (ligne && !ligne.classList.contains("section-header")) {
                    if (!ligne.classList.contains("attenue")) aucunVisible = false;
                    ligne = ligne.nextElementSibling;
                }
                titre.classList.toggle("attenue", aucunVisible);
            });
            tableau.querySelectorAll("[data-competence]").forEach(cellule => {
                cellule.classList.toggle("colonne-active", cellule.dataset.competence === id);
            });
        });

        // Chiffres clés au-dessus du tableau
        const nbPreuves = tousLesProjets.reduce((total, p) =>
            total + Object.values(p.preuves).reduce((n, preuve) => n + (preuve.lien ? 1 : preuve.length), 0), 0);
        document.querySelector(".stats-competences").innerHTML = `
            <div class="stat"><strong>${tousLesProjets.length}</strong><span>réalisations</span></div>
            <div class="stat"><strong>${COMPETENCES.length}</strong><span>compétences</span></div>
            <div class="stat"><strong>${nbPreuves}</strong><span>preuves</span></div>`;
    }

    construireTableau();
    construireFiltres();

    // Un seul écouteur pour tout le tableau (délégation d'événements) :
    // il n'est ajouté qu'UNE fois, contrairement à avant où chaque ouverture
    // de la popup ajoutait de nouveaux écouteurs (liens ouverts en double...)
    tableau.addEventListener("click", (e) => {
        const bouton = e.target.closest("button.check");
        if (!bouton) return;
        const projet = REALISATIONS[bouton.dataset.groupe].projets[bouton.dataset.projet];
        const competence = COMPETENCES.find(c => c.id === bouton.dataset.competence);
        ouvrirVisionneuse(projet.preuves[competence.id], projet.nom + " · " + competence.court);
    });

    /* -----------------------------------------------------
       5. VISIONNEUSE DE PREUVES (images + PDF)
       Navigation : flèches, clavier ← →, swipe sur mobile
       ----------------------------------------------------- */
    const visionneuse = document.getElementById("visionneuse");
    const zoneMedia = visionneuse.querySelector(".visionneuse-media");
    const titreVisionneuse = visionneuse.querySelector(".visionneuse-titre");
    const contexteVisionneuse = visionneuse.querySelector(".visionneuse-contexte");
    const compteur = visionneuse.querySelector(".visionneuse-compteur");
    const miniatures = visionneuse.querySelector(".visionneuse-miniatures");
    const boutonPrec = visionneuse.querySelector(".visionneuse-prec");
    const boutonSuiv = visionneuse.querySelector(".visionneuse-suiv");

    let preuvesAffichees = [];
    let indexActuel = 0;

    const estPdf = (chemin) => chemin.toLowerCase().endsWith(".pdf");

    function ouvrirVisionneuse(preuves, contexte) {
        preuvesAffichees = preuves;
        contexteVisionneuse.textContent = contexte;

        // Miniatures cliquables (une par preuve)
        miniatures.innerHTML = preuves.map((p, i) => `
            <button type="button" data-index="${i}" aria-label="Preuve ${i + 1} : ${p.titre}">
                ${estPdf(p.chemin)
                    ? '<i class="fas fa-file-pdf" aria-hidden="true"></i>'
                    : `<img src="${encodeURI(p.chemin)}" alt="" loading="lazy">`}
            </button>`).join("");
        miniatures.hidden = preuves.length < 2;
        boutonPrec.hidden = boutonSuiv.hidden = preuves.length < 2;

        afficherPreuve(0);
        visionneuse.showModal();
    }

    function afficherPreuve(index) {
        const total = preuvesAffichees.length;
        indexActuel = (index + total) % total; // boucle : après la dernière → la première
        const preuve = preuvesAffichees[indexActuel];
        const url = encodeURI(preuve.chemin);

        titreVisionneuse.textContent = preuve.titre;
        compteur.textContent = total > 1 ? `${indexActuel + 1} / ${total}` : "";

        if (estPdf(preuve.chemin)) {
            zoneMedia.innerHTML = `
                <iframe src="${url}" title="${preuve.titre}"></iframe>
                <a class="pdf-link" href="${url}" target="_blank" rel="noopener">
                    <i class="fas fa-up-right-from-square"></i> Ouvrir le PDF dans un nouvel onglet</a>`;
        } else {
            zoneMedia.innerHTML = `
                <a href="${url}" target="_blank" rel="noopener" title="Voir en taille réelle">
                    <img src="${url}" alt="${preuve.titre}">
                </a>`;
        }

        miniatures.querySelectorAll("button").forEach((b, i) => {
            b.classList.toggle("actif", i === indexActuel);
            if (i === indexActuel) b.scrollIntoView({ block: "nearest", inline: "center" });
        });

        // Précharge l'image suivante pour une navigation instantanée
        const suivante = preuvesAffichees[(indexActuel + 1) % total];
        if (suivante && !estPdf(suivante.chemin)) new Image().src = encodeURI(suivante.chemin);
    }

    boutonPrec.addEventListener("click", () => afficherPreuve(indexActuel - 1));
    boutonSuiv.addEventListener("click", () => afficherPreuve(indexActuel + 1));
    miniatures.addEventListener("click", (e) => {
        const b = e.target.closest("button");
        if (b) afficherPreuve(Number(b.dataset.index));
    });
    visionneuse.querySelector(".close-visionneuse").addEventListener("click", () => visionneuse.close());
    visionneuse.addEventListener("click", (e) => {
        if (e.target === visionneuse) visionneuse.close();
    });
    visionneuse.addEventListener("close", () => { zoneMedia.innerHTML = ""; });

    visionneuse.addEventListener("keydown", (e) => {
        if (preuvesAffichees.length < 2) return;
        if (e.key === "ArrowLeft") afficherPreuve(indexActuel - 1);
        if (e.key === "ArrowRight") afficherPreuve(indexActuel + 1);
    });

    // Swipe gauche / droite sur écran tactile
    let debutX = null;
    zoneMedia.addEventListener("touchstart", (e) => { debutX = e.touches[0].clientX; }, { passive: true });
    zoneMedia.addEventListener("touchend", (e) => {
        if (debutX === null || preuvesAffichees.length < 2) return;
        const ecart = e.changedTouches[0].clientX - debutX;
        if (Math.abs(ecart) > 50) afficherPreuve(indexActuel + (ecart < 0 ? 1 : -1));
        debutX = null;
    });

    /* -----------------------------------------------------
       6. FILTRE DES PROJETS (formation / stage 1 / stage 2)
       ----------------------------------------------------- */
    const filtresProjets = document.querySelector(".filtres-projets");
    filtresProjets.addEventListener("click", (e) => {
        const bouton = e.target.closest(".filtre");
        if (!bouton) return;
        filtresProjets.querySelectorAll(".filtre").forEach(b => {
            b.classList.toggle("actif", b === bouton);
            b.setAttribute("aria-pressed", b === bouton);
        });
        document.querySelectorAll(".groupe-projets").forEach(groupe => {
            groupe.hidden = bouton.dataset.filtre !== "" && groupe.dataset.categorie !== bouton.dataset.filtre;
        });
        majProgression();
    });

    /* -----------------------------------------------------
       7. CONTACT : copie de l'email + formulaire
       ----------------------------------------------------- */
    const toast = document.querySelector(".toast");
    let minuteurToast;

    function afficherToast(message) {
        toast.textContent = message;
        toast.classList.add("visible");
        clearTimeout(minuteurToast);
        minuteurToast = setTimeout(() => toast.classList.remove("visible"), 2500);
    }

    document.querySelectorAll("[data-copier]").forEach(bouton => {
        bouton.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(bouton.dataset.copier);
                afficherToast("Adresse email copiée ✓");
            } catch {
                afficherToast("Copie impossible, sélectionnez l'adresse manuellement");
            }
        });
    });

    const contactForm = document.getElementById("contact-form");
    const statutForm = contactForm.querySelector(".form-statut");
    const boutonEnvoyer = contactForm.querySelector(".submit-button");

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        boutonEnvoyer.disabled = true;
        boutonEnvoyer.textContent = "Envoi en cours…";
        statutForm.className = "form-statut";
        statutForm.textContent = "";

        try {
            // FormData récupère automatiquement tous les champs du formulaire
            const response = await fetch(contactForm.action, {
                method: "POST",
                headers: { "Accept": "application/json" },
                body: new FormData(contactForm)
            });

            if (!response.ok) throw new Error("Réponse " + response.status);

            statutForm.classList.add("succes");
            statutForm.textContent = "Merci ! Votre message a bien été envoyé, je vous répondrai rapidement.";
            contactForm.reset();
        } catch (error) {
            console.error("Erreur d'envoi :", error);
            statutForm.classList.add("erreur");
            statutForm.textContent = "Une erreur est survenue. Vous pouvez réessayer ou m'écrire directement par email.";
        } finally {
            boutonEnvoyer.disabled = false;
            boutonEnvoyer.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer';
        }
    });

    /* -----------------------------------------------------
       8. DÉMARRAGE : si l'URL contient déjà une ancre
          (ex. lien partagé vers #projets), on ouvre directement
       ----------------------------------------------------- */
    suivreAncre();
});
