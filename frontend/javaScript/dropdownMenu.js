document.addEventListener("DOMContentLoaded", function () {
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach((dropdown) => {
        const toggle = dropdown.querySelector(".dropdown-toggle");
        const menu = dropdown.querySelector(".dropdown-menu");

        // Toggle the dropdown menu on click or touch
        toggle.addEventListener("click", function (event) {
            menu.classList.toggle("show");

            // Close other open dropdowns
            dropdowns.forEach((otherDropdown) => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.querySelector(".dropdown-menu").classList.remove("show");
                }
            });
        });
    });

    // Close dropdown if clicking outside
    document.addEventListener("click", function (event) {
        dropdowns.forEach((dropdown) => {
            const menu = dropdown.querySelector(".dropdown-menu");
            if (!dropdown.contains(event.target)) {
                menu.classList.remove("show");
            }
        });
    });
});
