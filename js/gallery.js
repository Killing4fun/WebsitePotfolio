
const galleryCategories = [
    { id: "all", label: "All Assets" },
    { id: "magazine", label: "Magazine Covers" },
    { id: "design", label: "UI/UX Design" }
    // { id: "video", label: "Video Demos" },
];

const galleryItems = [
    {
        title: "Magazine Cover Design Diploma Assignment",
        src: "images/magazine_cover.png",
        category: "magazine",
        type: "image"
    },
    {
        title: "SeedOfLife Mobile App Logo",
        src: "images/LogoSeedOfLife.png",
        category: "design",
        type: "image"
    },
    {
        title: "Showtime Manager Desktop UI Layout",
        src: "images/ShowtimeManager.jpeg",
        category: "design",
        type: "image"
    },
    {
        title: "Mandarin Project Assignment",
        src: "https://www.youtube.com/watch?v=fwvtLHILbgs",
        videoId: "fwvtLHILbgs",
        category: "video",
        type: "youtube"
    },
    {
        title: "Magazine Design Degree Assignment",
        category: "magazine",
        type: "group",
        images: [
            "images/Assignment 2 AmirulEhsanBinRoslan_SafirahBintiTajulAriffin_Page_1.jpg",
            "images/Assignment 2 AmirulEhsanBinRoslan_SafirahBintiTajulAriffin_Page_2.jpg",
            "images/Assignment 2 AmirulEhsanBinRoslan_SafirahBintiTajulAriffin_Page_3.jpg",
            "images/Assignment 2 AmirulEhsanBinRoslan_SafirahBintiTajulAriffin_Page_4.jpg",
            "images/Assignment 2 AmirulEhsanBinRoslan_SafirahBintiTajulAriffin_Page_5.jpg",
            "images/Assignment 2 AmirulEhsanBinRoslan_SafirahBintiTajulAriffin_Page_6.jpg",
            "images/Assignment 2 AmirulEhsanBinRoslan_SafirahBintiTajulAriffin_Page_7.jpg"
        ]
    },
    {
        title: "Magazine Design Shotphoto",
        src: "images/_MG_5713.JPG",
        category: "gallery",
        type: "image"
    },
    {
        title: "Project TechnoFeist",
        src: "images/IMG-20251210-WA0127.jpg",
        category: "gallery",
        type: "image"
    },
    {
        title: "Logo Assignment Digital",
        src: "images/Magic Chorrus.png",
        category: "desing",
        type: "image"
    },
    {
        title: "Volunteer Event Petronas Energy Asia",
        src: "images/IMG-20250618-WA0049.jpg",
        category: "gallery",
        type: "image"
    },
    {
        title: "Brochure Design Degree Assignment",
        category: "magazine",
        type: "group",
        images: [
            "images/brochure_Mesa1.png",
            "images/brochure_Mesa2.png"
        ]
    },
    {
        title: "Hometown Sabah, Tawau",
        category: "gallery",
        type: "group",
        images: [
            "images/20250802_113830.jpg",
            "images/20250802_113450.jpg"
        ]
    },
    {
        title: "Setup Firewall and Managing Network",
        category: "gallery",
        type: "group",
        images: [
            "images/IMG_20220815_201643.jpg",
            "images/IMG_20220817_110608.jpg",
            "images/IMG_20221017_131049.jpg"
        ]
    }
];

// ==================== Group Helper ====================
// Normalizes an item's "images" array (strings or {src,title} objects) into
// a consistent [{src, title}] shape. Returns null if the item isn't a group.
const getGroupImages = (item) => {
    if (!Array.isArray(item.images) || item.images.length === 0) return null;
    return item.images.map(img => (typeof img === 'string') ? { src: img, title: '' } : img);
};
window.getGroupImages = getGroupImages;

// ==================== Filter Tabs Renderer ====================
// Turns a category id like "ui-mockups" or "brand_assets" into a readable
// label ("Ui Mockups", "Brand Assets") when it hasn't been given a custom
// label in galleryCategories above.
const titleizeCategory = (id) => id
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());

const renderGalleryFilters = () => {
    const container = document.getElementById('gallery-filters');
    if (!container) return;

    const usedCategories = [...new Set(galleryItems.map(i => i.category))];
    const declaredIds = new Set(galleryCategories.map(c => c.id));

    // Tabs you've manually labeled in galleryCategories, but only if
    // something actually uses them (or it's "all").
    const tabs = galleryCategories.filter(cat => cat.id === 'all' || usedCategories.includes(cat.id));

    // Any category used on an item but NOT declared above gets its own tab
    // automatically, with an auto-generated label — no editing required.
    usedCategories.forEach(catId => {
        if (catId && !declaredIds.has(catId)) {
            tabs.push({ id: catId, label: titleizeCategory(catId) });
        }
    });

    container.innerHTML = tabs
        .map(cat => `<button class="gallery-filter-btn${cat.id === 'all' ? ' active' : ''}" data-filter="${cat.id}">${cat.label}</button>`)
        .join('');

    if (typeof window.setupGalleryFilter === 'function') {
        window.setupGalleryFilter();
    }
};
window.galleryCategories = galleryCategories;
window.renderGalleryFilters = renderGalleryFilters;

// ==================== Gallery Renderer ====================
const renderGallery = () => {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;

    grid.innerHTML = '';

    galleryItems.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'gallery-card';
        card.dataset.category = item.category;
        card.style.animationDelay = `${index * 0.1}s`;

        const groupImages = getGroupImages(item);

        let mediaHTML = '';
        if (item.type === 'video') {
            mediaHTML = `
                <div class="gallery-video-preview">
                    <video src="${item.src}" muted loop playsinline></video>
                    <div class="play-button-overlay">
                        <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    </div>
                </div>
            `;
        } else if (item.type === 'youtube') {
            mediaHTML = `
                <div class="gallery-video-preview">
                    <img src="https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg" alt="${item.title}">
                    <div class="play-button-overlay">
                        <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    </div>
                </div>
            `;
        } else if (groupImages) {
            // Cover = first image in the group; the rest appear in the lightbox
            mediaHTML = `<img src="${groupImages[0].src}" alt="${item.title}">`;
        } else {
            mediaHTML = `<img src="${item.src}" alt="${item.title}">`;
        }

        const groupBadge = (groupImages && groupImages.length > 1)
            ? `<div class="gallery-group-badge" title="${groupImages.length} images in this set">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                     <rect x="3" y="3" width="13" height="13" rx="2"></rect>
                     <path d="M16 3h2a2 2 0 0 1 2 2v2M21 16v2a2 2 0 0 1-2 2h-2"></path>
                 </svg>
                 <span>${groupImages.length}</span>
               </div>`
            : '';

        card.innerHTML = `
            ${mediaHTML}
            ${groupBadge}
            <div class="gallery-overlay">
                <div class="gallery-caption">${item.title}</div>
            </div>
            <div class="gallery-zoom-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
            </div>
        `;

        card.addEventListener('click', () => {
            if (typeof window.openLightbox === 'function') {
                window.openLightbox(index);
            }
        });

        // Hover video play preview (native mp4 only — YouTube thumbnails are static)
        if (item.type === 'video') {
            const videoEl = card.querySelector('video');
            card.addEventListener('mouseenter', () => {
                videoEl.play().catch(() => { });
            });
            card.addEventListener('mouseleave', () => {
                videoEl.pause();
                videoEl.currentTime = 0;
            });
        }

        grid.appendChild(card);
    });

    if (typeof window.buildGallery === 'function') {
        window.buildGallery();
    }

    renderGalleryFilters();
};

window.galleryItems = galleryItems;
window.renderGallery = renderGallery;

// Run on load
document.addEventListener('DOMContentLoaded', renderGallery);