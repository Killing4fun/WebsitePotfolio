// ==================== Certifications List ====================
// HOW TO ADD A CERTIFICATION:
// Copy one of the objects below and fill in the details.
// The card will appear automatically — no HTML editing required.
//
// Fields:
//   title      - Name of the certification/course
//   issuer     - Organization that issued it  
//   date       - Date completed (e.g. "Dec 2025")
//   credentialUrl - Link to verify the certificate (use "#" if none)
//   category   - "google" | "training" | "course" | "professional"
//   badge      - Emoji or short label shown on the card
// ============================================================

const certifications = [
    {
        title: "Google Project Management Professional Certificate",
        issuer: "Google / Coursera",
        date: "Dec 2025",
        credentialUrl: "https://coursera.org/verify/professional-cert/YW5A7LFMUQ11",
        category: "google",
        badge: "🏅",
        courses: [
            "Foundations of Project Management",
            "Project Initiation: Starting a Successful Project",
            "Project Planning: Putting It All Together",
            "Project Execution: Running the Project",
            "Agile Project Management",
            "Capstone: Applying Project Management in the Real World",
            "Accelerate Your Job Search with AI"
        ]
    }
    // ── ADD MORE CERTIFICATIONS BELOW ──────────────────────────────────────────
    // {
    //     title: "Your Certification Name",
    //     issuer: "Issuing Organization",
    //     date: "Month Year",
    //     credentialUrl: "https://link-to-verify.com",
    //     category: "training",   // or "google", "course", "professional"
    //     badge: "🎓",
    //     courses: []             // optional sub-courses list, leave empty [] if none
    // }
];

// ==================== Auto-Render Certification Cards ====================
const renderCertifications = () => {
    const grid = document.getElementById('certifications-grid');
    if (!grid) return;

    grid.innerHTML = '';

    certifications.forEach((cert, index) => {
        const card = document.createElement('div');
        card.className = 'cert-card';
        card.style.animationDelay = `${index * 0.15}s`;

        const coursesList = cert.courses && cert.courses.length > 0
            ? `<ul class="cert-courses">
                ${cert.courses.map(c => `<li>${c}</li>`).join('')}
               </ul>`
            : '';

        const verifyBtn = cert.credentialUrl && cert.credentialUrl !== '#'
            ? `<a href="${cert.credentialUrl}" target="_blank" rel="noopener noreferrer" class="cert-verify-btn">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                 Verify Certificate
               </a>`
            : '';

        card.innerHTML = `
            <div class="cert-header">
                <span class="cert-badge">${cert.badge}</span>
                <div class="cert-meta">
                    <span class="cert-category cert-cat-${cert.category}">${cert.category.toUpperCase()}</span>
                    <span class="cert-date">${cert.date}</span>
                </div>
            </div>
            <h3 class="cert-title">${cert.title}</h3>
            <div class="cert-issuer">${cert.issuer}</div>
            ${coursesList}
            ${verifyBtn}
        `;

        grid.appendChild(card);
    });
};

window.renderCertifications = renderCertifications;
document.addEventListener('DOMContentLoaded', renderCertifications);
