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
};

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    renderTools();
});

window.renderProjects = renderProjects;
window.renderTools = renderTools;

// ==================== Tools & Technologies List ====================
const tools = [
    { name: "Visual Studio", logo: "https://cdn.simpleicons.org/visualstudio" },
    { name: "Visual Studio .NET", logo: "https://cdn.simpleicons.org/dotnet" },
    { name: "Figma", logo: "https://cdn.simpleicons.org/figma" },
    { name: "Draw.io", logo: "https://cdn.jsdelivr.net/gh/jgraph/drawio-desktop@dev/build/icon.svg" },
    {
        name: "Antigravity",
        logo: `svg:<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="antigravityGrad" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="#880808" /><stop offset="100%" stop-color="#ff4444" /></linearGradient></defs><ellipse cx="16" cy="18" rx="12" ry="5" fill="none" stroke="url(#antigravityGrad)" stroke-width="2" transform="rotate(-15 16 18)" opacity="0.8"/><circle cx="16" cy="10" r="5" fill="url(#antigravityGrad)"><animate attributeName="cy" values="10;12;10" dur="2s" repeatCount="indefinite" /></circle></svg>`
    },
    { name: "GitHub", logo: "https://cdn.simpleicons.org/github" },
    { name: "Android Studio", logo: "https://cdn.simpleicons.org/androidstudio" },
    { name: "Photoshop", logo: "https://cdn.simpleicons.org/adobephotoshop" },
    { name: "Illustrator", logo: "https://cdn.simpleicons.org/adobeillustrator" },
    { name: "Linux", logo: "https://cdn.simpleicons.org/linux" },
    { name: "NetBeans", logo: "https://cdn.simpleicons.org/apachenetbeanside" },
    { name: "Gemini", logo: "https://cdn.simpleicons.org/googlegemini" },
    { name: "ChatGPT", logo: "https://cdn.simpleicons.org/openai" },
    { name: "DeepSeek", logo: "https://cdn.simpleicons.org/deepseek" },
    {
        name: "Blackbox AI",
        logo: `svg:<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="blackboxGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#2b0c0c" /><stop offset="100%" stop-color="#880808" /></linearGradient></defs><rect x="5" y="5" width="22" height="22" rx="4" fill="url(#blackboxGrad)" stroke="#ff4444" stroke-width="1.5" /><path d="M11 12l4 4-4 4M17 20h4" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>`
    },
    { name: "Adobe Acrobat", logo: "https://cdn.simpleicons.org/adobeacrobatreader" }
];

// ==================== Auto-Render Tools Grid ====================
const renderTools = () => {
    const grid = document.getElementById('tools-grid');
    if (!grid) return;

    grid.innerHTML = '';

    tools.forEach((tool, index) => {
        const item = document.createElement('div');
        item.className = 'tool-item fade-in';
        item.style.animationDelay = `${index * 0.05}s`;

        let logoHTML = '';
        if (tool.logo.startsWith('svg:')) {
            logoHTML = tool.logo.substring(4);
        } else {
            logoHTML = `<img src="${tool.logo}" alt="${tool.name}" class="tool-logo-img">`;
        }

        item.innerHTML = `
            <div class="tool-logo-wrapper">${logoHTML}</div>
            <span class="tool-name">${tool.name}</span>
        `;

        grid.appendChild(item);
    });
};

