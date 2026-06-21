// ==================== Projects List ====================

const projects = [
    {
        title: "SeedOfLife",
        description: "Contributed to building and enhancing an AI-powered mobile app for urban plant care in Malaysia. Features include tropical plant identification via PlantNet and Plant.id APIs, climate-adaptive care scheduling, community forums, and a GPS nursery locator.",
        tech: ["Flutter", "Firebase", "PlantNet API", "Plant.id API", "MySQL"],
        link: "#",
        image: "images/ShowtimeManager.jpeg",
        gradient: "linear-gradient(135deg, #1d976c 0%, #93f9b9 100%)"
    },
    {
        title: "Showtime Manager System",
        description: "Java desktop application for managing video content and creating broadcast schedules. Features a Gantt-style 24-hour drag-and-drop timeline, auto-reflow to eliminate gaps/overlaps, real-time search, and week navigation.",
        tech: ["JavaScript", "MySQL"],
        link: "#",
        image: "images/ShowtimeManager.jpeg",
        gradient: "linear-gradient(135deg, #4f00bc 0%, #290060 100%)"
    },
    {
        title: "Portfolio Website",
        description: "Personal responsive portfolio website built with clean vanilla HTML, CSS, and JS. Features a premium custom music player, an audio-reactive/simulated visualizer, dark/light mode, and separate sections for education, projects, and work experience.",
        tech: ["HTML", "CSS", "JavaScript"],
        link: "https://github.com/Killing4fun/WebsitePotfolio",
        image: "images/ProjectWebsitePortfolio.png",
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

    // Also render tools if the grid is present on this page
    renderTools();
};

// ==================== Tools & Technologies List ====================
// To add more tools in the future:
// Simply add a new item to this array.
// Example: { name: "Python", iconSlug: "python" }
// Find slugs on simpleicons.org (e.g. "figma", "visualstudio", "linux").
// For custom tools not on simpleicons, specify a customSvg string.
const tools = [
    { name: "Visual Studio", iconSlug: "visualstudio" },
    { name: "Visual Studio .NET", iconSlug: "dotnet" },
    { name: "Figma", iconSlug: "figma" },
    { name: "draw.io", iconSlug: "diagramsdotnet" },
    {
        name: "Antigravity IDE",
        iconSlug: "antigravity",
        customSvg: `
            <svg viewBox="0 0 24 24" class="custom-tool-icon" width="32" height="32" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display: block;">
                <path d="M12 2L4 10L12 18L20 10Z" fill="currentColor" fill-opacity="0.15"/>
                <ellipse cx="12" cy="18" rx="8" ry="2" stroke-dasharray="3 3"/>
                <ellipse cx="12" cy="21" rx="5" ry="1.2" opacity="0.6"/>
            </svg>
        `
    },
    { name: "GitHub", iconSlug: "github" },
    { name: "Android Studio", iconSlug: "androidstudio" },
    { name: "Photoshop", iconSlug: "adobephotoshop" },
    { name: "Illustrator", iconSlug: "adobeillustrator" },
    { name: "Linux", iconSlug: "linux" },
    { name: "NetBeans", iconSlug: "apachenetbeanside" },
    { name: "Gemini", iconSlug: "googlegemini" },
    { name: "ChatGPT", iconSlug: "openai" },
    { name: "DeepSeek", iconSlug: "deepseek" },
    {
        name: "Blackbox AI",
        iconSlug: "blackbox",
        customSvg: `
            <svg viewBox="0 0 24 24" class="custom-tool-icon" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display: block;">
                <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" fill-opacity="0.08"/>
                <path d="M8 8L4 12L8 16" stroke-width="2"/>
                <path d="M16 8L20 12L16 16" stroke-width="2"/>
                <line x1="13.5" y1="7" x2="10.5" y2="17" stroke-width="1.5"/>
            </svg>
        `
    },
    { name: "Acrobat", iconSlug: "adobeacrobatreader" }
];

// ==================== Auto-Render Tools ====================
const renderTools = () => {
    const grid = document.getElementById('tools-grid');
    if (!grid) return;

    grid.innerHTML = '';

    tools.forEach((tool, index) => {
        const card = document.createElement('div');
        card.className = 'tool-card';
        card.style.animationDelay = `${index * 0.05}s`;

        let iconHTML = '';
        if (tool.customSvg) {
            iconHTML = tool.customSvg;
        } else {
            iconHTML = `<img src="https://cdn.jsdelivr.net/npm/simple-icons/icons/${tool.iconSlug}.svg" alt="${tool.name} Logo" loading="lazy">`;
        }

        card.innerHTML = `
            <div class="tool-icon-wrapper">
                ${iconHTML}
            </div>
            <span class="tool-name">${tool.name}</span>
        `;

        grid.appendChild(card);
    });
};

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', renderProjects);

window.renderProjects = renderProjects;
window.renderTools = renderTools;

