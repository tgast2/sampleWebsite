document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".random-fade-container img");
    let shuffledImages = []; // Array to store the shuffled images
    let currentIndex = 0; // Track the current image index

    // Function to shuffle the images
    function shuffleImages() {
        shuffledImages = Array.from(images).sort(() => Math.random() - 0.5);
    }

    // Function to fade in and out an image
    function fadeInOutNextImage() {
        // If we've cycled through all images, reshuffle and restart
        if (currentIndex >= shuffledImages.length) {
            shuffleImages();
            currentIndex = 0;
        }

        // Get the next image
        const image = shuffledImages[currentIndex];
        currentIndex++;

        // Randomize the position of the selected image
        const container = image.parentElement;
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        const randomX = Math.random() * (containerWidth - image.offsetWidth);
        const randomY = Math.random() * (containerHeight - image.offsetHeight);

        image.style.left = `${randomX}px`;
        image.style.top = `${randomY}px`;

        // Fade in the image
        image.style.opacity = "1";

        // Fade out after a delay
        setTimeout(() => {
            image.style.opacity = "0";
        }, 2000); // Duration the image stays visible
    }

    // Initialize the shuffled images array and display the first image immediately
    shuffleImages();
    fadeInOutNextImage(); // Show the first image immediately

    // Start the interval for the rest of the cycle
    setInterval(fadeInOutNextImage, 4000);
});
