// ==================== Shared Navigation Injector ====================
// This script injects the same navbar into every page automatically.
// It highlights the active link based on the current page URL.

(function () {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    const navHTML = `
    <nav class="navbar">
        <div class="container nav-container">
            <a href="index.html" class="logo">Amirul Ehsan</a>
            <div class="nav-right">
                <ul class="nav-links" id="nav-links">
                    <li><a href="index.html"          id="nav-home">Home</a></li>
                    <li><a href="projects.html"       id="nav-projects">Projects</a></li>
                    <li><a href="work.html"           id="nav-work">Work</a></li>
                    <li><a href="school.html"         id="nav-school">Education</a></li>
                    <li><a href="certification.html"  id="nav-cert">Certifications</a></li>
                    <li><a href="gallery.html"        id="nav-gallery">Gallery</a></li>
                    <li><a href="index.html#contact"  id="nav-contact">Contact</a></li>
                </ul>
                <button id="theme-toggle" class="theme-toggle" aria-label="Toggle Theme">
                    <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="4"></circle>
                        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
                    </svg>
                    <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                    </svg>
                </button>
                <button class="burger-menu" id="burger-menu" aria-label="Toggle Menu">
                    <span></span><span></span><span></span>
                </button>
            </div>
        </div>
    </nav>
    <div class="nav-overlay" id="nav-overlay"></div>`;

    // Inject at start of body
    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // Highlight active link
    const map = {
        'index.html': 'nav-home',
        '':           'nav-home',
        'projects.html':     'nav-projects',
        'work.html':         'nav-work',
        'school.html':       'nav-school',
        'certification.html':'nav-cert',
        'gallery.html':      'nav-gallery',
    };

    const activeId = map[currentPage];
    if (activeId) {
        const el = document.getElementById(activeId);
        if (el) el.classList.add('active');
    }

    // Apply saved theme immediately
    if (localStorage.getItem('theme') === 'light') {
        document.documentElement.classList.add('light-mode');
    }
})();
