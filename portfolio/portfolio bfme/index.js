
    document.addEventListener("DOMContentLoaded", function() {
        let button = document.querySelector(".explore-button"); // Sélectionne le bouton
        let background = document.querySelector(".background_image img"); // Sélectionne l'image

        button.addEventListener("click", function() {
            background.style.filter = "blur(0px)"; // Enlève le flou
        });
    });

