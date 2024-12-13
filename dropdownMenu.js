document.addEventListener("DOMContentLoaded", function () {
    const dropdownToggle = document.querySelector(".dropdown-toggle");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    // Toggle dropdown menu on click
    dropdownToggle.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default link behavior
        dropdownMenu.classList.toggle("show");
    });

    // Close dropdown menu when clicking outside
    document.addEventListener("click", function (event) {
        if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove("show");
        }
    });
});
