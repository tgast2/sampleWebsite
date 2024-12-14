document.addEventListener("DOMContentLoaded", function () {
    const footer = document.querySelector("footer");

    window.addEventListener("scroll", () => {
        // Check if the user has scrolled to the bottom
        const scrollPosition = window.scrollY + window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;

        if (scrollPosition >= pageHeight) {
            footer.classList.add("visible");
        } else {
            footer.classList.remove("visible");
        }
    });
});
