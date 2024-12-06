// Fonction pour obtenir une position aléatoire sans chevauchement
function getRandomPosition(element, occupiedPositions) {
    const maxWidth = window.innerWidth - element.offsetWidth;
    const maxHeight = window.innerHeight - element.offsetHeight;
    let x, y;
    let positionIsOccupied = true;

    // Générer une nouvelle position tant que celle-ci est occupée
    while (positionIsOccupied) {
        x = Math.random() * maxWidth;
        y = Math.random() * maxHeight;

        positionIsOccupied = false;
        for (let pos of occupiedPositions) {
            const distance = Math.sqrt(Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2));
            if (distance < 150) {
                positionIsOccupied = true;
                break;
            }
        }
    }

    occupiedPositions.push({ x, y });

    return { x, y };
}

// Fonction pour disperser les images sur l'écran sans chevauchement
function scatterImages() {
    const images = document.querySelectorAll('.image');
    const occupiedPositions = [];

    images.forEach((image) => {
        const { x, y } = getRandomPosition(image, occupiedPositions);
        image.style.left = `${x}px`;
        image.style.top = `${y}px`;
    });
}

// Fonction pour déplacer et afficher/cacher le logo
function showHideLogo() {
    const logo = document.getElementById('logo');
    const { x, y } = getRandomPosition(logo, []);

    logo.style.left = `${x}px`;
    logo.style.top = `${y}px`;

    logo.style.opacity = 1;

    const randomDelay = Math.random() * 2000 + 1000;
    setTimeout(() => {
        logo.style.opacity = 0;
    }, randomDelay);
}

// Fonction d'animation au clic : zoom, rotation, etc.
function animateLogo() {
    const logo = document.getElementById('logo');

    // Choisir une animation aléatoire parmi les animations disponibles
    const animations = ['zoomIn', 'rotate', 'move', 'changeColor'];
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];

    // Ajouter la classe pour déclencher l'animation
    logo.classList.add(randomAnimation);

    // Après l'animation, enlever la classe et appliquer un nouveau déplacement
    setTimeout(() => {
        logo.classList.remove(randomAnimation);

        // Déplacer le logo à une nouvelle position aléatoire
        const { x, y } = getRandomPosition(logo, []);
        logo.style.left = `${x}px`;
        logo.style.top = `${y}px`;
    }, 1000); // La durée de l'animation est de 1 seconde
}

// Ajoute un événement "click" au logo
document.getElementById('logo').addEventListener('click', animateLogo);

// Appel de la fonction pour disperser les images
scatterImages();

// Répéter l'apparition et la disparition du logo toutes les 3 à 5 secondes
setInterval(showHideLogo, Math.random() * 1000 + 2000);
