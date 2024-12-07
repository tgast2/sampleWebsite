document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".slideshow-container img");
    let currentIndex = 0;

    function showNextImage() {
        // Hide all images
        images.forEach((img) => {
            img.style.opacity = "0"; // Fade out all images
        });

        // Show the current image
        const currentImage = images[currentIndex];
        currentImage.style.opacity = "1"; // Fade in the current image

        // Move to the next image
        currentIndex = (currentIndex + 1) % images.length; // Loop back to the first image
    }

    // Start the slideshow
    showNextImage(); // Show the first image immediately
    setInterval(showNextImage, 3000); // Change image every 3 seconds
});
