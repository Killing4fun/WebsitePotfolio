// ==================== Projects List ====================

const projects = [
    {
        title: "SeedOfLife",
        description: "Contributed to building and enhancing an AI-powered mobile app for urban plant care in Malaysia. Features include tropical plant identification via PlantNet and Plant.id APIs, climate-adaptive care scheduling, community forums, and a GPS nursery locator.",
        tech: ["Flutter", "Firebase", "PlantNet API", "Plant.id API", "MySQL"],
        link: "#",
        image: "",
        gradient: "linear-gradient(135deg, #1d976c 0%, #93f9b9 100%)"
    },
    {
        title: "Showtime Manager System",
        description: "Java desktop application for managing video content and creating broadcast schedules. Features a Gantt-style 24-hour drag-and-drop timeline, auto-reflow to eliminate gaps/overlaps, real-time search, and week navigation.",
        tech: ["Java", "MySQL"],
        link: "#",
        image: "",
        gradient: "linear-gradient(135deg, #4f00bc 0%, #290060 100%)"
    },
    {
        title: "Portfolio Website",
        description: "Personal responsive portfolio website built with clean vanilla HTML, CSS, and JS. Features a premium custom music player, an audio-reactive/simulated visualizer, dark/light mode, and separate sections for education, projects, and work experience.",
        tech: ["HTML", "CSS", "JavaScript"],
        link: "#",
        image: "images/Opera Snapshot_2026-06-20_020530.png",
        gradient: "linear-gradient(135deg, #880808 0%, #4a0000 100%)"
    }
];

// ==================== Auto-Render Project Cards ====================
const renderProjects = () => {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = '';

    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        // Stagger animation delay
        card.style.animationDelay = `${index * 0.1}s`;

        // Build image/gradient header
        let imageHTML = '';
        if (project.image) {
            imageHTML = `<div class="project-image" style="background-image: url('${project.image}'); background-size: cover; background-position: center;"></div>`;
        } else {
            imageHTML = `<div class="project-image" style="background: ${project.gradient};"></div>`;
        }

        // Build tech tags
        const techHTML = project.tech
            .map(t => `<span class="tech">${t}</span>`)
            .join('');

        card.innerHTML = `
            ${imageHTML}
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">${techHTML}</div>
                <a href="${project.link}" class="link-btn" target="${project.link !== '#' ? '_blank' : '_self'}" rel="noopener noreferrer">View Project →</a>
            </div>
        `;

        grid.appendChild(card);
    });
};

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', renderProjects);

window.renderProjects = renderProjects;

