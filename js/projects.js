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

    // Automatically render the toolbox on the same page
    renderToolbox();
};

// ==================== Toolbox / Tools List ====================
const toolboxTools = [
    { name: "Visual Studio", icon: "visualstudio", category: "IDE" },
    { name: "Visual Studio .NET", icon: "dotnet", category: "IDE / Framework" },
    { name: "Figma", icon: "figma", category: "Design Tool" },
    { name: "Draw.io", icon: "diagramsdotnet", category: "Diagramming" },
    { name: "Antigravity", icon: "antigravity", category: "AI Coding Agent" },
    { name: "GitHub", icon: "github", category: "Version Control" },
    { name: "Android Studio", icon: "androidstudio", category: "Mobile IDE" },
    { name: "Photoshop", icon: "adobephotoshop", category: "Graphic Design" },
    { name: "Illustrator", icon: "adobeillustrator", category: "Vector Design" },
    { name: "Linux", icon: "linux", category: "OS / Server" },
    { name: "NetBeans", icon: "apachenetbeans", category: "Java IDE" },
    { name: "Gemini", icon: "googlegemini", category: "AI Assistant" },
    { name: "ChatGPT", icon: "openai", category: "AI Assistant" },
    { name: "DeepSeek", icon: "deepseek", category: "AI Assistant" },
    { name: "Blackbox AI", icon: "blackbox", category: "AI Coding Assistant" },
    { name: "Acrobat", icon: "adobeacrobatreader", category: "PDF Editor" }
];

const customToolIcons = {
    antigravity: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3" fill="currentColor"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><ellipse cx="12" cy="12" rx="9" ry="5" stroke="currentColor" transform="rotate(-30 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="5" stroke="currentColor" transform="rotate(30 12 12)"/></svg>`,
    blackbox: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`
};

const getToolIconHtml = (iconKey, name) => {
    const key = iconKey.toLowerCase();
    if (customToolIcons[key]) {
        return customToolIcons[key];
    }
    // Fetch official colored SVG logo from Simple Icons CDN
    return `<img src="https://cdn.simpleicons.org/${key}" alt="${name}" onerror="this.onerror=null; this.src='https://cdn.jsdelivr.net/npm/lucide-static@0.321.0/icons/box.svg';">`;
};

const renderToolbox = () => {
    const grid = document.getElementById('toolbox-grid');
    if (!grid) return;

    grid.innerHTML = '';

    toolboxTools.forEach((tool, index) => {
        const card = document.createElement('div');
        card.className = 'tool-card';
        card.style.animationDelay = `${index * 0.05}s`;

        const iconHtml = getToolIconHtml(tool.icon, tool.name);

        card.innerHTML = `
            <div class="tool-logo-container">
                ${iconHtml}
            </div>
            <div class="tool-info">
                <span class="tool-name">${tool.name}</span>
                <span class="tool-category">${tool.category}</span>
            </div>
        `;

        grid.appendChild(card);
    });
    
    // Wire up intersection observer for toolbox section if needed
    if (typeof window.observer === 'object' && window.observer.observe) {
        document.querySelectorAll('.toolbox-section, .tool-card').forEach(el => window.observer.observe(el));
    }
};

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
});

window.renderProjects = renderProjects;
window.renderToolbox = renderToolbox;

