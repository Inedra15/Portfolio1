
document.addEventListener("DOMContentLoaded", function () {
    let button = document.querySelector(".explore-button"); // Sélectionne le bouton
    let background = document.querySelector(".background_image img"); // Sélectionne l'image
    let intro = document.getElementById("intro"); // Sélectionne la div intro

    button.addEventListener("click", function () {
        // Effet de défocus progressif sur l'image
        background.style.filter = "blur(0px)";
        background.style.transition = "filter 1s ease-out";

        // Fait disparaître l'intro en douceur
        intro.style.opacity = "0";
        intro.style.transition = "opacity 1s ease-out";

        // Après la transition, cache l'élément pour qu'il ne prenne plus de place
        setTimeout(() => {
            intro.style.display = "none";
        }, 1000); // 1000ms = 1s, le même temps que la transition
    });
});

