document.addEventListener('DOMContentLoaded', () => {
    const dropdownToggles = document.querySelectorAll('.dropdown > a'); // Dropdown toggles
    const mediaQuery = window.matchMedia('(max-width: 768px)'); // Mobile screen detection

    dropdownToggles.forEach((toggle) => {
        let isDropdownOpen = false; // Track dropdown state for mobile

        toggle.addEventListener('click', (e) => {
            const dropdownMenu = toggle.nextElementSibling;

            if (mediaQuery.matches && dropdownMenu) { // Mobile only
                e.preventDefault(); // Prevent immediate navigation
                if (!isDropdownOpen) {
                    dropdownMenu.classList.toggle('show'); // Show dropdown on first click
                    isDropdownOpen = true;
                } else {
                    window.location.href = toggle.href; // Navigate on second click
                }
            }
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        const isDropdown = e.target.matches('.dropdown > a, .dropdown-menu, .dropdown-menu *');

        if (!isDropdown) {
            document.querySelectorAll('.dropdown-menu').forEach((menu) => {
                menu.classList.remove('show');
            });
        }
    });
});
