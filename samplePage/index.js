document.addEventListener("DOMContentLoaded", function () {
    const slideshows = document.querySelectorAll(".slideshow");

    slideshows.forEach((slideshow) => {
        const images = slideshow.querySelectorAll("img");
        let currentImageIndex = 0;

        function showNextImage() {
            // Remove 'active' class from the current image
            images[currentImageIndex].classList.remove("active");

            // Calculate the next image index
            currentImageIndex = (currentImageIndex + 1) % images.length;

            // Add 'active' class to the next image
            images[currentImageIndex].classList.add("active");
        }

        // Start with the first image active
        images[currentImageIndex].classList.add("active");

        // Change images every 4 seconds
        setInterval(showNextImage, 4000);
    });
});