document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".random-fade-container img");
    let shuffledImages = [];
    let currentIndex = 0;

    function shuffleImages() {
        shuffledImages = Array.from(images).sort(() => Math.random() - 0.5);
    }


    function fadeInOutNextImage() {

        if (currentIndex >= shuffledImages.length) {
            shuffleImages();
            currentIndex = 0;
        }


        const image = shuffledImages[currentIndex];
        currentIndex++;


        const container = image.parentElement;
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        const randomX = Math.random() * (containerWidth - image.offsetWidth);
        const randomY = Math.random() * (containerHeight - image.offsetHeight);

        image.style.left = `${randomX}px`;
        image.style.top = `${randomY}px`;


        image.style.opacity = "1";


        setTimeout(() => {
            image.style.opacity = "0";
        }, 2000);
    }


    shuffleImages();
    fadeInOutNextImage();

    setInterval(fadeInOutNextImage, 4000);
});
