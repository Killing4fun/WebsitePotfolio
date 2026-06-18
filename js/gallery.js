// ==================== Gallery Items List ====================
// HOW TO ADD A NEW MEDIA ASSET:
// Copy one of the objects below and add it to the array.
// The gallery grid will arrange them automatically in a masonry flow.
//
// Fields:
//   title    - Caption shown on hover and in lightbox
//   src      - Image file path or video file path
//   category - "magazine" | "design"
//   type     - "image" | "video"
// ============================================================

const galleryItems = [
    {
        title: "Magazine Cover Design Diploma Assignment",
        src: "images/magazine_cover.png",
        category: "magazine",
        type: "image"
    },
    {
        title: "SeedOfLife Mobile App Interface",
        src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=800&fit=crop",
        category: "design",
        type: "image"
    },
    {
        title: "Showtime Manager Desktop UI Layout",
        src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=500&fit=crop",
        category: "design",
        type: "image"
    },
    {
        title: "SeedOfLife Urban App Demo Video",
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
        category: "design",
        type: "video"
    }
];

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
        } else {
            mediaHTML = `<img src="${item.src}" alt="${item.title}">`;
        }

        card.innerHTML = `
            ${mediaHTML}
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

        // Hover video play preview
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
};

window.galleryItems = galleryItems;
window.renderGallery = renderGallery;

// Run on load
document.addEventListener('DOMContentLoaded', renderGallery);
