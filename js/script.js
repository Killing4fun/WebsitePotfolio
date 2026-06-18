// ==================== Theme Toggle ====================
const themeToggleBtn = document.getElementById('theme-toggle');

const toggleTheme = () => {
    const isLight = document.documentElement.classList.contains('light-mode');
    if (isLight) {
        document.documentElement.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    }
};

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
}

// ==================== Burger Menu ====================
const burger = document.getElementById('burger-menu');
const navLinks = document.querySelector('.nav-links');
const navOverlay = document.getElementById('nav-overlay');

if (burger) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        navLinks.classList.toggle('mobile-open');
        navOverlay.classList.toggle('visible');
        document.body.classList.toggle('menu-open');
    });
}

if (navOverlay) {
    navOverlay.addEventListener('click', () => {
        burger.classList.remove('open');
        navLinks.classList.remove('mobile-open');
        navOverlay.classList.remove('visible');
        document.body.classList.remove('menu-open');
    });
}

// Close burger on nav link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (burger) burger.classList.remove('open');
        if (navLinks) navLinks.classList.remove('mobile-open');
        if (navOverlay) navOverlay.classList.remove('visible');
        document.body.classList.remove('menu-open');
    });
});

// ==================== Smooth Scrolling ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ==================== Typing Animation (Hero) ====================
let typingTimeoutId = null;
const initTypingAnimation = () => {
    const typingEl = document.getElementById('typing-subtitle');
    if (!typingEl) return;

    if (typingTimeoutId) {
        clearTimeout(typingTimeoutId);
        typingTimeoutId = null;
    }

    const phrases = [
        'Software Engineer',
        'IT Specialist',
        'Flutter Developer',
        'Problem Solver',
        'Project Manager'
    ];
    let pi = 0, ci = 0, deleting = false;

    const typeLoop = () => {
        const currentEl = document.getElementById('typing-subtitle');
        if (!currentEl) return; // Abort if element is gone

        const current = phrases[pi];
        if (deleting) {
            currentEl.textContent = current.substring(0, ci - 1);
            ci--;
        } else {
            currentEl.textContent = current.substring(0, ci + 1);
            ci++;
        }

        let speed = deleting ? 60 : 100;

        if (!deleting && ci === current.length) {
            speed = 1800;
            deleting = true;
        } else if (deleting && ci === 0) {
            deleting = false;
            pi = (pi + 1) % phrases.length;
            speed = 400;
        }
        typingTimeoutId = setTimeout(typeLoop, speed);
    };
    typingTimeoutId = setTimeout(typeLoop, 800);
};

// ==================== Parallax Hero Scroll ====================
const handleHeroScroll = () => {
    const heroLayout = document.querySelector('.hero-layout');
    if (!heroLayout) return;

    const scrolled = window.pageYOffset;
    if (scrolled < window.innerHeight) {
        heroLayout.style.transform = `translateY(${scrolled * 0.45}px)`;
        heroLayout.style.opacity = 1 - (scrolled / (window.innerHeight * 0.75));
    } else {
        heroLayout.style.transform = `translateY(0px)`;
        heroLayout.style.opacity = 1;
    }
};

window.addEventListener('scroll', handleHeroScroll);

// ==================== Background Real-Time Date & Time ====================
let bgDateTimeInterval = null;
const initBgDateTime = () => {
    const timeEl = document.getElementById('bg-time');
    const dateEl = document.getElementById('bg-date');
    if (!timeEl || !dateEl) {
        if (bgDateTimeInterval) {
            clearInterval(bgDateTimeInterval);
            bgDateTimeInterval = null;
        }
        return;
    }

    const updateClock = () => {
        const currentT = document.getElementById('bg-time');
        const currentD = document.getElementById('bg-date');
        if (!currentT || !currentD) {
            clearInterval(bgDateTimeInterval);
            bgDateTimeInterval = null;
            return;
        }

        // Use Malaysia timezone (UTC+8)
        const now = new Date();
        const malaysiaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kuala_Lumpur' }));

        let hours = malaysiaTime.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const minutes = String(malaysiaTime.getMinutes()).padStart(2, '0');
        const seconds = String(malaysiaTime.getSeconds()).padStart(2, '0');
        currentT.textContent = `${hours}:${minutes}:${seconds}${ampm}`;

        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'Asia/Kuala_Lumpur'
        };
        const dateStr = malaysiaTime.toLocaleDateString('en-US', options).toUpperCase();
        currentD.textContent = dateStr;
    };

    updateClock();
    if (!bgDateTimeInterval) {
        bgDateTimeInterval = setInterval(updateClock, 1000);
    }
};

// ==================== Scroll Animation ====================
const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// ==================== Gallery Lightbox ====================
let lightboxIndex = 0;

const getGalleryList = () => {
    return window.galleryItems || [];
};

const openLightbox = (index) => {
    const modal = document.getElementById('lightbox-modal');
    if (!modal) return;

    const items = getGalleryList();
    if (!items.length) return;

    lightboxIndex = index;
    const item = items[index];

    const title = document.getElementById('lightbox-title');
    const img = document.getElementById('lightbox-img');
    let video = document.getElementById('lightbox-video');

    if (title) title.textContent = item.title || '';

    if (item.type === 'video') {
        if (img) img.style.display = 'none';

        if (!video) {
            video = document.createElement('video');
            video.id = 'lightbox-video';
            video.controls = true;
            video.autoplay = true;
            video.style.maxWidth = '100%';
            video.style.maxHeight = '75vh';
            video.style.borderRadius = '10px';
            video.style.boxShadow = '0 0 50px rgba(var(--accent-rgb), 0.25)';
            img.parentNode.insertBefore(video, img);
        }

        video.src = item.src;
        video.style.display = 'block';
        video.play().catch(e => console.log('Video play error:', e));
    } else {
        if (video) {
            video.pause();
            video.style.display = 'none';
        }
        if (img) {
            img.src = item.src;
            img.style.display = 'block';
        }
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
    const modal = document.getElementById('lightbox-modal');
    if (!modal) return;

    modal.classList.remove('active');
    document.body.style.overflow = '';

    const video = document.getElementById('lightbox-video');
    if (video) {
        video.pause();
        video.src = '';
    }
};

const lightboxNext = () => {
    const items = getGalleryList();
    if (!items.length) return;
    lightboxIndex = (lightboxIndex + 1) % items.length;
    openLightbox(lightboxIndex);
};

const lightboxPrev = () => {
    const items = getGalleryList();
    if (!items.length) return;
    lightboxIndex = (lightboxIndex - 1 + items.length) % items.length;
    openLightbox(lightboxIndex);
};

// Event delegation for lightbox clicks
document.addEventListener('click', (e) => {
    if (e.target.closest('#lightbox-close')) {
        closeLightbox();
    } else if (e.target.closest('#lightbox-next')) {
        lightboxNext();
    } else if (e.target.closest('#lightbox-prev')) {
        lightboxPrev();
    } else if (e.target.id === 'lightbox-modal') {
        closeLightbox();
    }
});

document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('lightbox-modal');
    if (!modal?.classList.contains('active')) return;
    if (e.key === 'ArrowRight') lightboxNext();
    if (e.key === 'ArrowLeft') lightboxPrev();
    if (e.key === 'Escape') closeLightbox();
});

// Build gallery clickable items (fallback for static layouts)
const buildGallery = () => {
    const cards = document.querySelectorAll('.gallery-card');
    if (!cards.length) return;

    // If dynamic gallery is not used, populate items array from DOM
    if (!window.galleryItems || window.galleryItems.length === 0) {
        window.galleryItems = [];
        cards.forEach((card, i) => {
            const img = card.querySelector('img');
            const video = card.querySelector('video');
            const title = card.querySelector('.gallery-caption')?.textContent || '';
            const type = video ? 'video' : 'image';
            const src = type === 'video' ? video.src : (img ? img.src : '');
            window.galleryItems.push({ title, src, type, category: card.dataset.category || 'all' });

            card.addEventListener('click', () => openLightbox(i));
        });
    }
};

// Gallery Filter
const setupGalleryFilter = () => {
    const filterBtns = document.querySelectorAll('.gallery-filter-btn');
    const allCards = document.querySelectorAll('.gallery-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.dataset.filter;
            allCards.forEach(card => {
                card.style.display = (cat === 'all' || card.dataset.category === cat)
                    ? 'inline-block' : 'none';
            });
        });
    });
};

// ==================== Form Handling (Google Sheets Integration) ====================
const GOOGLE_SHEET_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbxmhoSoKlQ7yTv8REjNLIIZqCF20VQMeEVvOdhQtNRfP5Wd0UH9_ZZxjHb_8DLfQfM/exec'; // Paste your Google Apps Script URL here

const initContactForm = () => {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        const nameVal = this.querySelector('input[type="text"]').value.trim();
        const emailVal = this.querySelector('input[type="email"]').value.trim();
        const msgVal = this.querySelector('textarea').value.trim();
        const formData = { name: nameVal, email: emailVal, message: msgVal };

        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="btn-spinner"></span> Sending...`;

        if (!GOOGLE_SHEET_WEBAPP_URL) {
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                showFormAlert(contactForm, 'success', 'Demo mode: Add your Google Sheets URL in js/script.js to save messages!');
                this.reset();
            }, 1000);
            return;
        }

        try {
            const response = await fetch(GOOGLE_SHEET_WEBAPP_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            if (result.result === 'success') {
                showFormAlert(contactForm, 'success', 'Message sent! I will get back to you soon.');
                this.reset();
            } else {
                showFormAlert(contactForm, 'error', 'Error: ' + (result.error || 'Unknown'));
            }
        } catch {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            showFormAlert(contactForm, 'success', 'Message submitted! (Network note: check your Google Sheets setup)');
            this.reset();
        }
    });
};

const showFormAlert = (form, type, message) => {
    let box = form.parentNode.querySelector('.form-alert');
    if (!box) {
        box = document.createElement('div');
        box.className = 'form-alert';
        form.parentNode.insertBefore(box, form);
    }
    box.className = `form-alert ${type}`;
    box.textContent = message;
    box.style.display = 'block';
    setTimeout(() => { box.style.display = 'none'; }, 6000);
};

// ==================== AJAX Routing Engine ====================
const runPageInitializers = (pathname, hash) => {
    const filename = pathname.split('/').pop() || 'index.html';

    // 1. Close mobile navigation menu if open
    const burgerMenu = document.getElementById('burger-menu');
    const navLinksList = document.querySelector('.nav-links');
    const navOverlayBg = document.getElementById('nav-overlay');
    if (burgerMenu) burgerMenu.classList.remove('open');
    if (navLinksList) navLinksList.classList.remove('mobile-open');
    if (navOverlayBg) navOverlayBg.classList.remove('visible');
    document.body.classList.remove('menu-open');

    // 2. Update active link in the navbar
    const map = {
        'index.html': 'nav-home',
        '': 'nav-home',
        'projects.html': 'nav-projects',
        'work.html': 'nav-work',
        'school.html': 'nav-school',
        'certification.html': 'nav-cert',
        'gallery.html': 'nav-gallery',
    };

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });

    const activeId = map[filename];
    if (activeId) {
        const el = document.getElementById(activeId);
        if (el) el.classList.add('active');
    }

    // 3. Page specific rendering and scripts
    if (filename === 'index.html' || filename === '') {
        initTypingAnimation();
        initContactForm();
        initBgDateTime();
    } else if (filename === 'projects.html') {
        if (typeof window.renderProjects === 'function') {
            window.renderProjects();
        }
    } else if (filename === 'certification.html') {
        if (typeof window.renderCertifications === 'function') {
            window.renderCertifications();
        }
    } else if (filename === 'gallery.html') {
        if (typeof window.renderGallery === 'function') {
            window.renderGallery();
        } else {
            buildGallery();
        }
        setupGalleryFilter();
    }

    // 4. Re-observe fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // 5. Scroll behavior
    if (hash) {
        const target = document.querySelector(hash);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
            return;
        }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
};

const navigateToPage = async (urlStr) => {
    // Resolve absolute URL
    const url = new URL(urlStr, window.location.origin);
    const pathname = url.pathname;
    const hash = url.hash;

    // Prevent reloading if we are already on this page (and it's not just a hash change)
    if (window.location.pathname === pathname && !hash) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    try {
        const response = await fetch(pathname);
        if (!response.ok) throw new Error(`Failed to fetch ${pathname}`);
        const htmlText = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');

        const newContent = doc.getElementById('page-content');
        const currentContent = document.getElementById('page-content');
        if (newContent && currentContent) {
            currentContent.innerHTML = newContent.innerHTML;
        } else {
            throw new Error('No page content element found');
        }

        document.title = doc.title || 'Amirul Ehsan';
        window.history.pushState({}, '', urlStr);
        runPageInitializers(pathname, hash);

    } catch (err) {
        console.warn('AJAX routing failed, falling back to standard redirect:', err);
        window.location.href = urlStr;
    }
};

// Event delegation for internal links
document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href) return;

    // Bypass external links, targets, protocol triggers
    if (anchor.target === '_blank' || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
        return;
    }

    // Hash navigation on the same page
    if (href.startsWith('#')) {
        return;
    }

    // Intercept navigation
    e.preventDefault();
    navigateToPage(href);
});

// Popstate handling
window.addEventListener('popstate', async () => {
    const pathname = window.location.pathname;
    const hash = window.location.hash;

    try {
        const response = await fetch(pathname);
        if (!response.ok) throw new Error(`Failed to fetch ${pathname}`);
        const htmlText = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');

        const newContent = doc.getElementById('page-content');
        const currentContent = document.getElementById('page-content');
        if (newContent && currentContent) {
            currentContent.innerHTML = newContent.innerHTML;
        }

        document.title = doc.title || 'Amirul Ehsan';
        runPageInitializers(pathname, hash);
    } catch (err) {
        console.warn('AJAX back/forward history navigation failed, reloading:', err);
        window.location.reload();
    }
});

// ==================== Page Init (runs on initial load) ====================
document.addEventListener('DOMContentLoaded', () => {
    runPageInitializers(window.location.pathname, window.location.hash);
});

// Expose tools globally
window.buildGallery = buildGallery;
window.setupGalleryFilter = setupGalleryFilter;
window.initContactForm = initContactForm;
window.initTypingAnimation = initTypingAnimation;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
