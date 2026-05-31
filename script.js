// Single-page scrolling with reliable anchor navigation and scroll tracking
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const mainContent = document.querySelector('.main-content');
    const searchInput = document.getElementById('searchInput');

    // Enhanced scroll tracking - update active nav item based on scroll position
    function updateActiveNav() {
        const scrollPos = mainContent.scrollTop;
        let current = '';
        
        // Find which section is currently in view
        const sections = document.querySelectorAll('.content-section');
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            // If scroll position is within this section, mark it as current
            if (scrollPos >= sectionTop - 150 && scrollPos < sectionBottom - 150) {
                current = section.getAttribute('id');
            }
        });

        // Update nav items with active state
        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href').substring(1);
            if (href === current) {
                item.classList.add('active');
                // Auto-scroll sidebar to show active item
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }

    // Track scroll events
    mainContent.addEventListener('scroll', updateActiveNav);
    window.addEventListener('resize', updateActiveNav);

    // Initial call
    updateActiveNav();

    // Smooth scroll on nav click
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Calculate the scroll position
                const offset = targetSection.offsetTop - 20;
                mainContent.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
                
                console.log('[v0] Scrolling to:', targetId, 'at position:', offset);
            }
        });
    });

    // Search functionality
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        navItems.forEach(item => {
            const label = item.querySelector('.label').textContent.toLowerCase();
            if (label.includes(searchTerm) || searchTerm === '') {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // FAQ Accordion - toggle open/close
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                item.classList.toggle('open');
            });
        }
    });
});
