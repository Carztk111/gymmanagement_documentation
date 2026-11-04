document.addEventListener('DOMContentLoaded', function () {

    const sidebar = document.querySelector('.sidebar');
    const menuButton = document.getElementById('mobileMenuBtn');
    const overlay = document.getElementById('sidebarOverlay');
    const mainContent = document.querySelector('.main-content');

    const navItems = document.querySelectorAll('.nav-item');
    const searchInput = document.getElementById('searchInput');

    // Check required mobile elements
    if (!sidebar || !menuButton || !overlay || !mainContent) {
        console.error('GNEX 360: Navigation elements are missing.');
        return;
    }

    // OPEN SIDEBAR
    function openMenu() {
        sidebar.classList.add('active');
        overlay.classList.add('active');

        menuButton.innerHTML = '✕';
        menuButton.setAttribute('aria-label', 'Close navigation menu');
        menuButton.setAttribute('aria-expanded', 'true');
    }

    // CLOSE SIDEBAR
    function closeMenu() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');

        menuButton.innerHTML = '☰';
        menuButton.setAttribute('aria-label', 'Open navigation menu');
        menuButton.setAttribute('aria-expanded', 'false');
    }

    // HAMBURGER BUTTON
    menuButton.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (sidebar.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // CLICK OUTSIDE SIDEBAR
    overlay.addEventListener('click', closeMenu);

    // ESCAPE KEY
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });

    // NAVIGATION
    navItems.forEach(item => {

        item.addEventListener('click', function (e) {

            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);

            if (target) {

                const position =
                    target.getBoundingClientRect().top -
                    mainContent.getBoundingClientRect().top +
                    mainContent.scrollTop;

                mainContent.scrollTo({
                    top: position,
                    behavior: 'smooth'
                });

                if (window.innerWidth <= 768) {
                    closeMenu();
                }
            }

        });

    });

    // ACTIVE NAVIGATION
    function updateActiveNav() {

        const sections = document.querySelectorAll('.content-section');
        let current = '';

        sections.forEach(section => {

            const top =
                section.getBoundingClientRect().top -
                mainContent.getBoundingClientRect().top;

            const bottom = top + section.offsetHeight;

            if (top <= 160 && bottom > 160) {
                current = section.id;
            }

        });

        navItems.forEach(item => {

            item.classList.toggle(
                'active',
                item.getAttribute('href') === '#' + current
            );

        });

    }

    mainContent.addEventListener('scroll', updateActiveNav);

    window.addEventListener('resize', function () {

        if (window.innerWidth > 768) {
            closeMenu();
        }

        updateActiveNav();

    });

    // SEARCH
    if (searchInput) {

        searchInput.addEventListener('input', function () {

            const term = this.value.toLowerCase().trim();

            navItems.forEach(item => {

                const label = item.querySelector('.label');

                if (!label) return;

                item.style.display =
                    label.textContent.toLowerCase().includes(term)
                    ? 'flex'
                    : 'none';

            });

        });

    }

    updateActiveNav();

});
