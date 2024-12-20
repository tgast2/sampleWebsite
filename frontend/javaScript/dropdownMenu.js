document.addEventListener('DOMContentLoaded', () => {
    const dropdownToggles = document.querySelectorAll('.dropdown > a');
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    dropdownToggles.forEach((toggle) => {
        let isDropdownOpen = false;

        toggle.addEventListener('click', (e) => {
            const dropdownMenu = toggle.nextElementSibling;

            if (mediaQuery.matches && dropdownMenu) {
                e.preventDefault();
                if (!isDropdownOpen) {
                    dropdownMenu.classList.toggle('show');
                    isDropdownOpen = true;
                } else {
                    window.location.href = toggle.href;
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
