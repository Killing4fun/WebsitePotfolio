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
        currentT.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;

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

// ==================== Hero Background Parallax ====================
const initHeroBackgroundParallax = () => {
    const heroBg = document.querySelector('.hero-background');
    if (!heroBg) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrolled * 0.3}px) scale(1.02)`;
        }
    });
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
// Updated lightbox functions with YouTube-style design
let lightboxIndex = 0;
let lightboxSubIndex = 0; // which page/photo within a grouped item is showing

// Returns the full gallery items array (indices must match gallery.js's render order)
const getGalleryList = () => (window.galleryItems || []);

// Uses gallery.js's normalizer so both files agree on what counts as a "group"
const getItemGroupImages = (item) => (typeof window.getGroupImages === 'function' ? window.getGroupImages(item) : null);

const openLightbox = (index, subIndex = 0) => {
    const modal = document.getElementById('lightbox-modal');
    if (!modal) return;

    const items = getGalleryList();
    if (!items.length) return;

    lightboxIndex = index;
    const item = items[index];
    const groupImages = getItemGroupImages(item);
    lightboxSubIndex = groupImages ? Math.max(0, Math.min(subIndex, groupImages.length - 1)) : 0;

    const title = document.getElementById('lightbox-title');
    const img = document.getElementById('lightbox-img');
    const counter = document.getElementById('lightbox-counter');
    const inner = document.querySelector('.lightbox-inner');

    // ── YouTube embed (real YouTube player chrome, like deltarune.com) ──
    if (item.type === 'youtube') {
        if (img) img.style.display = 'none';

        const oldVideoContainer = document.getElementById('video-container');
        if (oldVideoContainer) oldVideoContainer.style.display = 'none';

        let ytContainer = document.getElementById('youtube-container');
        if (!ytContainer) {
            ytContainer = document.createElement('div');
            ytContainer.id = 'youtube-container';
            ytContainer.className = 'youtube-container';

            const iframe = document.createElement('iframe');
            iframe.id = 'youtube-iframe';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            iframe.allowFullscreen = true;
            iframe.frameBorder = '0';
            iframe.referrerPolicy = 'strict-origin-when-cross-origin';

            ytContainer.appendChild(iframe);
            if (inner) inner.insertBefore(ytContainer, img);
        }

        ytContainer.style.display = 'block';
        document.getElementById('youtube-iframe').src =
            `https://www.youtube-nocookie.com/embed/${item.videoId}?autoplay=1&rel=0`;

        if (counter) counter.style.display = 'none';
        if (title) title.textContent = item.title || 'Untitled';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        return;
    }

    // ── Native mp4 / image handling below ──
    const ytContainerExisting = document.getElementById('youtube-container');
    if (ytContainerExisting) {
        ytContainerExisting.style.display = 'none';
        const ytIframeExisting = document.getElementById('youtube-iframe');
        if (ytIframeExisting) ytIframeExisting.src = '';
    }

    let videoContainer = document.getElementById('video-container');

    // Build the video player UI
    if (item.type === 'video') {
        // Hide image
        if (img) img.style.display = 'none';

        // Check if video container exists, if not create it
        if (!videoContainer) {
            videoContainer = document.createElement('div');
            videoContainer.id = 'video-container';
            videoContainer.className = 'video-container';

            // Video element
            const video = document.createElement('video');
            video.id = 'lightbox-video';
            video.preload = 'metadata';
            video.playsInline = true;
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.display = 'block';

            // Play overlay (big play button)
            const playOverlay = document.createElement('div');
            playOverlay.className = 'play-overlay';
            playOverlay.innerHTML = `
                <svg viewBox="0 0 24 24">
                    <polygon points="5,3 19,12 5,21" />
                </svg>
            `;

            // Controls overlay
            const controlsOverlay = document.createElement('div');
            controlsOverlay.className = 'video-controls-overlay';
            controlsOverlay.innerHTML = `
                <div class="progress-bar">
                    <div class="progress-fill" id="progress-fill"></div>
                </div>
                <div style="display:flex;align-items:center;gap:16px;margin-top:8px;color:#fff;font-size:13px;">
                    <span id="current-time">0:00</span>
                    <span style="color:#aaa;">/</span>
                    <span id="duration">0:00</span>
                    <button id="play-pause-btn" style="background:none;border:none;color:#fff;cursor:pointer;font-size:18px;margin-left:auto;">▶</button>
                    <button id="mute-btn" style="background:none;border:none;color:#fff;cursor:pointer;font-size:16px;">🔊</button>
                    <button id="fullscreen-btn" style="background:none;border:none;color:#fff;cursor:pointer;font-size:16px;">⛶</button>
                </div>
            `;

            // Video end overlay
            const endOverlay = document.createElement('div');
            endOverlay.className = 'video-end-overlay';
            endOverlay.innerHTML = `
                <h3 style="font-size:22px;margin-bottom:8px;">▶️ Watch Again</h3>
                <p style="color:#aaa;font-size:14px;">Replay this video</p>
                <button class="replay-btn" id="replay-btn">↻ Replay</button>
            `;

            videoContainer.appendChild(video);
            videoContainer.appendChild(playOverlay);
            videoContainer.appendChild(controlsOverlay);
            videoContainer.appendChild(endOverlay);

            // Insert after title bar or at beginning
            const titleBar = inner.querySelector('.video-title-bar');
            if (titleBar) {
                titleBar.after(videoContainer);
            } else {
                inner.prepend(videoContainer);
            }
        }

        const video = document.getElementById('lightbox-video');
        const playOverlay = videoContainer.querySelector('.play-overlay');
        const controlsOverlay = videoContainer.querySelector('.video-controls-overlay');
        const endOverlay = videoContainer.querySelector('.video-end-overlay');

        // Set video source and play
        video.src = item.src;
        video.load();
        video.play().catch(e => console.log('Video play error:', e));

        // Show play overlay initially, hide on play
        playOverlay.style.display = 'flex';

        // Show controls on hover
        videoContainer.addEventListener('mouseenter', () => {
            controlsOverlay.style.opacity = '1';
            controlsOverlay.style.pointerEvents = 'auto';
        });

        videoContainer.addEventListener('mouseleave', () => {
            if (!video.paused) {
                controlsOverlay.style.opacity = '0';
                controlsOverlay.style.pointerEvents = 'none';
            }
        });

        // Play/Pause toggle
        const playPauseBtn = document.getElementById('play-pause-btn');
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (video.paused) {
                    video.play();
                    playPauseBtn.textContent = '⏸';
                    playOverlay.style.display = 'none';
                } else {
                    video.pause();
                    playPauseBtn.textContent = '▶';
                    playOverlay.style.display = 'flex';
                }
            });
        }

        // Click on video to toggle play/pause
        video.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                if (playPauseBtn) playPauseBtn.textContent = '⏸';
                playOverlay.style.display = 'none';
            } else {
                video.pause();
                if (playPauseBtn) playPauseBtn.textContent = '▶';
                playOverlay.style.display = 'flex';
            }
        });

        // Click on play overlay to play
        if (playOverlay) {
            playOverlay.addEventListener('click', (e) => {
                e.stopPropagation();
                video.play();
                playOverlay.style.display = 'none';
                if (playPauseBtn) playPauseBtn.textContent = '⏸';
                controlsOverlay.style.opacity = '1';
                controlsOverlay.style.pointerEvents = 'auto';
                setTimeout(() => {
                    controlsOverlay.style.opacity = '0';
                    controlsOverlay.style.pointerEvents = 'none';
                }, 3000);
            });
        }

        // Update progress bar
        const progressFill = document.getElementById('progress-fill');
        const currentTimeEl = document.getElementById('current-time');
        const durationEl = document.getElementById('duration');

        video.addEventListener('timeupdate', () => {
            if (video.duration) {
                const percent = (video.currentTime / video.duration) * 100;
                if (progressFill) progressFill.style.width = percent + '%';
                if (currentTimeEl) {
                    const mins = Math.floor(video.currentTime / 60);
                    const secs = Math.floor(video.currentTime % 60);
                    currentTimeEl.textContent = mins + ':' + (secs < 10 ? '0' : '') + secs;
                }
            }
        });

        video.addEventListener('loadedmetadata', () => {
            if (durationEl) {
                const mins = Math.floor(video.duration / 60);
                const secs = Math.floor(video.duration % 60);
                durationEl.textContent = mins + ':' + (secs < 10 ? '0' : '') + secs;
            }
        });

        // Video end
        video.addEventListener('ended', () => {
            if (playPauseBtn) playPauseBtn.textContent = '▶';
            if (playOverlay) playOverlay.style.display = 'flex';
            if (endOverlay) endOverlay.classList.add('show');
        });

        // Replay button
        const replayBtn = document.getElementById('replay-btn');
        if (replayBtn) {
            replayBtn.addEventListener('click', () => {
                video.currentTime = 0;
                video.play();
                if (endOverlay) endOverlay.classList.remove('show');
                if (playOverlay) playOverlay.style.display = 'none';
                if (playPauseBtn) playPauseBtn.textContent = '⏸';
            });
        }

        // Mute toggle
        const muteBtn = document.getElementById('mute-btn');
        if (muteBtn) {
            muteBtn.addEventListener('click', () => {
                video.muted = !video.muted;
                muteBtn.textContent = video.muted ? '🔇' : '🔊';
            });
        }

        // Fullscreen
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => {
                if (videoContainer.requestFullscreen) {
                    videoContainer.requestFullscreen();
                }
            });
        }

        // Progress bar click to seek
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.addEventListener('click', (e) => {
                const rect = progressBar.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                if (video.duration) {
                    video.currentTime = pos * video.duration;
                }
            });
        }

        videoContainer.style.display = 'block';
        if (counter) counter.style.display = 'none';

    } else {
        // Image handling (single image OR a grouped multi-image item)
        const videoContainer = document.getElementById('video-container');
        if (videoContainer) videoContainer.style.display = 'none';

        if (groupImages) {
            const page = groupImages[lightboxSubIndex];
            if (img) {
                img.src = page.src;
                img.style.display = 'block';
            }
            if (counter) {
                counter.style.display = 'inline-block';
                counter.textContent = `${lightboxSubIndex + 1} / ${groupImages.length}`;
            }
            if (title) {
                title.textContent = page.title || item.title || 'Untitled';
            }
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            return;
        }

        if (img) {
            img.src = item.src;
            img.style.display = 'block';
        }
        if (counter) counter.style.display = 'none';
    }

    // Update title
    if (title) {
        title.textContent = item.title || 'Untitled';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

// Updated close function
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

    const ytIframe = document.getElementById('youtube-iframe');
    if (ytIframe) ytIframe.src = '';

    // Reset overlays
    const endOverlay = document.querySelector('.video-end-overlay');
    if (endOverlay) endOverlay.classList.remove('show');
};

const showNextLightboxItem = () => {
    const items = getGalleryList();
    if (!items.length) return;

    const item = items[lightboxIndex];
    const groupImages = getItemGroupImages(item);
    if (groupImages && lightboxSubIndex < groupImages.length - 1) {
        openLightbox(lightboxIndex, lightboxSubIndex + 1);
        return;
    }

    const nextIndex = (lightboxIndex + 1) % items.length;
    openLightbox(nextIndex, 0);
};

const showPrevLightboxItem = () => {
    const items = getGalleryList();
    if (!items.length) return;

    const item = items[lightboxIndex];
    const groupImages = getItemGroupImages(item);
    if (groupImages && lightboxSubIndex > 0) {
        openLightbox(lightboxIndex, lightboxSubIndex - 1);
        return;
    }

    const prevIndex = (lightboxIndex - 1 + items.length) % items.length;
    // Land on the previous card's LAST page — feels more natural than
    // jumping straight to page 1 when stepping backwards.
    const prevItem = items[prevIndex];
    const prevGroupImages = getItemGroupImages(prevItem);
    const prevSubIndex = prevGroupImages ? prevGroupImages.length - 1 : 0;
    openLightbox(prevIndex, prevSubIndex);
};

// Wire up lightbox controls (close button, arrows, backdrop click, Escape key)
const initLightboxControls = () => {
    const modal = document.getElementById('lightbox-modal');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    const inner = document.querySelector('.lightbox-inner');
    if (!modal) return;

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', showPrevLightboxItem);
    if (nextBtn) nextBtn.addEventListener('click', showNextLightboxItem);

    // Click outside the media (on the dark backdrop) closes the lightbox
    modal.addEventListener('click', (e) => {
        if (inner && !inner.contains(e.target) && e.target !== closeBtn && e.target !== prevBtn && e.target !== nextBtn) {
            closeLightbox();
        }
    });

    // Keyboard shortcuts (bind once globally, not per page-load):
    // Escape closes, Left/Right flips through pages/cards
    if (!window.__lightboxEscapeBound) {
        document.addEventListener('keydown', (e) => {
            const m = document.getElementById('lightbox-modal');
            if (!m || !m.classList.contains('active')) return;

            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                showNextLightboxItem();
            } else if (e.key === 'ArrowLeft') {
                showPrevLightboxItem();
            }
        });
        window.__lightboxEscapeBound = true;
    }
};
document.addEventListener('DOMContentLoaded', initLightboxControls);

// ==================== Form Handling (Google Sheets Integration) ====================
const GOOGLE_SHEET_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbxqd8lmy5-lhRVd9IZZPLdWh3OCnE9oKd-9jmNlX3EIbSZwfDzrgYpsEVEYcO0pLUw/exec'; // Ensure this is your latest URL


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
        initHeroBackgroundParallax();
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
        initLightboxControls();
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

// ==================== Gallery Build/Filter Helpers ====================
// gallery.js's renderGallery() is the actual card builder and calls this
// as a post-render hook. Keep this a no-op stub to avoid re-triggering
// renderGallery (which would cause infinite recursion).
const buildGallery = () => { };

// Wires up the "All / Magazine Covers / UI/UX Design" filter buttons
const setupGalleryFilter = () => {
    const filterBtns = document.querySelectorAll('.gallery-filter-btn');
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            document.querySelectorAll('.gallery-card').forEach(card => {
                card.style.display = (filter === 'all' || card.dataset.category === filter) ? '' : 'none';
            });
        });
    });
};

// Expose tools globally
window.buildGallery = buildGallery;
window.setupGalleryFilter = setupGalleryFilter;
window.initContactForm = initContactForm;
window.initTypingAnimation = initTypingAnimation;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.initHeroBackgroundParallax = initHeroBackgroundParallax;