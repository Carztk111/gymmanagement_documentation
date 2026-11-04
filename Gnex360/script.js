document.addEventListener('DOMContentLoaded', function () {

    const navItems = document.querySelectorAll('.nav-item');
    const mainContent = document.querySelector('.main-content');
    const searchInput = document.getElementById('searchInput');

    const sidebar = document.querySelector('.sidebar');
    const menuButton = document.getElementById('mobileMenuBtn');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    // =====================================
    // MOBILE SIDEBAR
    // =====================================

    function openSidebar() {
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');

        menuButton.innerHTML = '✕';
        menuButton.setAttribute('aria-expanded', 'true');

        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');

        menuButton.innerHTML = '☰';
        menuButton.setAttribute('aria-expanded', 'false');

        document.body.style.overflow = '';

        // Keep desktop layout behavior
        if (window.innerWidth <= 768) {
            document.body.style.overflow = 'hidden';
        }
    }

    menuButton.addEventListener('click', function () {

        if (sidebar.classList.contains('active')) {
            closeSidebar();
        } else {
            openSidebar();
        }

    });

    sidebarOverlay.addEventListener('click', closeSidebar);

    // Close menu using Escape key
    document.addEventListener('keydown', function (e) {

        if (e.key === 'Escape') {
            closeSidebar();
        }

    });

    // Close sidebar when resizing to desktop
    window.addEventListener('resize', function () {

        if (window.innerWidth > 768) {
            closeSidebar();
        }

        updateActiveNav();

    });


    // =====================================
    // ACTIVE NAVIGATION TRACKING
    // =====================================

    function updateActiveNav() {

        const sections = document.querySelectorAll('.content-section');

        let current = '';

        sections.forEach(section => {

            const sectionTop =
                section.getBoundingClientRect().top -
                mainContent.getBoundingClientRect().top;

            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                sectionTop <= 160 &&
                sectionBottom > 160
            ) {
                current = section.getAttribute('id');
            }

        });

        navItems.forEach(item => {

            item.classList.remove('active');

            const href = item.getAttribute('href');

            if (href && href.substring(1) === current) {

                item.classList.add('active');

                if (sidebar.classList.contains('active')) {
                    item.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }

            }

        });

    }

    // Track scrolling
    mainContent.addEventListener('scroll', updateActiveNav);

    updateActiveNav();


    // =====================================
    // NAVIGATION CLICK
    // =====================================

    navItems.forEach(item => {

        item.addEventListener('click', function (e) {

            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);

            const targetSection = document.getElementById(targetId);

            if (targetSection) {

                const offset =
                    targetSection.getBoundingClientRect().top -
                    mainContent.getBoundingClientRect().top +
                    mainContent.scrollTop;

                mainContent.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });

                // Close mobile menu after selecting a section
                if (window.innerWidth <= 768) {
                    closeSidebar();
                }

            }

        });

    });


    // =====================================
    // SEARCH FUNCTIONALITY
    // =====================================

    if (searchInput) {

        searchInput.addEventListener('input', function (e) {

            const searchTerm = e.target.value.toLowerCase().trim();

            navItems.forEach(item => {

                const label = item.querySelector('.label');

                if (!label) return;

                const text = label.textContent.toLowerCase();

                if (
                    text.includes(searchTerm) ||
                    searchTerm === ''
                ) {

                    item.style.display = 'flex';

                } else {

                    item.style.display = 'none';

                }

            });

        });

    }

});
