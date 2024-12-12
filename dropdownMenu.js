document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.querySelector(".dropdown");
    const dropdownToggle = document.querySelector(".dropdown-toggle");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    // Handle clicks on the dropdown toggle
    dropdownToggle.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default link behavior

        // Toggle the 'show' class on the dropdown menu
        dropdownMenu.classList.toggle("show");
    });

    // Close the dropdown menu when clicking outside
    document.addEventListener("click", function (event) {
        if (!dropdown.contains(event.target)) {
            dropdownMenu.classList.remove("show");
        }
    });
});
