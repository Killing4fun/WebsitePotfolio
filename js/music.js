// ==================== Premium Music Player Logic ====================
// Access the shared tracks from playlist.js directly (already declared in playlist.js)
let currentIndex = 0;
let isPlaying = false;
// DOM Elements
const audio = document.getElementById('bg-music');
const discTrigger = document.getElementById('music-disc-trigger');
const discFace = document.getElementById('disc-face');
const discAlbumArt = document.getElementById('disc-album-art');
const cardPanel = document.getElementById('music-card-panel');
const closeBtn = document.getElementById('music-close-btn');
const playPauseBtn = document.getElementById('ctrl-play-pause');
const playIcon = playPauseBtn.querySelector('.play-icon');
const pauseIcon = playPauseBtn.querySelector('.pause-icon');
const prevBtn = document.getElementById('ctrl-prev');
const nextBtn = document.getElementById('ctrl-next');
const volumeSlider = document.getElementById('volume-slider');
const panelAlbumArt = document.getElementById('panel-album-art');
const songTitleDisplay = document.getElementById('song-title-display');
const miniVisualizer = document.getElementById('mini-visualizer');
const panelVisualizer = document.getElementById('panel-visualizer');
const playlistList = document.getElementById('playlist-list');
// Initialize Player
const initPlayer = () => {
    loadTrack(currentIndex);
    
    // Set initial volume
    audio.volume = volumeSlider.value;
    // Event Listeners
    discTrigger.addEventListener('click', toggleControlsPanel);
    closeBtn.addEventListener('click', closeControlsPanel);
    
    playPauseBtn.addEventListener('click', togglePlayPause);
    prevBtn.addEventListener('click', prevTrack);
    nextBtn.addEventListener('click', nextTrack);
    
    volumeSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value;
    });
    // When audio ends, auto-play next track
    audio.addEventListener('ended', () => {
        nextTrack();
    });
    // Render playlist items initially
    renderPlaylist();
    // Try Autoplay
    attemptAutoplay();
};
// Render Playlist dynamically
const renderPlaylist = () => {
    if (!playlistList) return;
    playlistList.innerHTML = '';
    
    tracks.forEach((track, index) => {
        const li = document.createElement('li');
        li.className = `playlist-item ${index === currentIndex ? 'active' : ''}`;
        
        let statusIcon = '';
        if (index === currentIndex && isPlaying) {
            statusIcon = '🔊';
        }
        
        // Use extracted cover if ready, otherwise fallback local folder path
        const coverSrc = track.extractedCover || track.cover;
        
        li.innerHTML = `
            <img class="playlist-item-art" src="${coverSrc}" alt="${track.title} Cover" onerror="this.src='https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=50&h=50&fit=crop'">
            <div class="playlist-item-details">
                <div class="playlist-item-title">${track.title}</div>
                <div class="playlist-item-artist">${track.artist}</div>
            </div>
            <div class="playlist-item-status">${statusIcon}</div>
        `;
        
        li.addEventListener('click', () => {
            if (currentIndex === index) {
                togglePlayPause();
            } else {
                currentIndex = index;
                loadTrack(currentIndex);
                playTrack();
            }
        });
        
        playlistList.appendChild(li);
    });
};
// Load track details
const loadTrack = (index) => {
    const track = tracks[index];
    audio.src = track.src;
    discAlbumArt.src = track.cover;
    panelAlbumArt.src = track.cover;
    songTitleDisplay.textContent = track.title;
    
    // Maintain playing state if it was playing
    if (isPlaying) {
        audio.play().then(() => {
            updateUI(true);
        }).catch(err => {
            console.log("Play interrupted on track switch:", err);
        });
    } else {
        updateUI(false);
    }
};
// Play music
const playTrack = () => {
    audio.play().then(() => {
        isPlaying = true;
        updateUI(true);
        removeInteractionListeners();
    }).catch(err => {
        console.log("Playback failed or blocked:", err);
    });
};
// Pause music
const pauseTrack = () => {
    audio.pause();
    isPlaying = false;
    updateUI(false);
};
// Toggle Play/Pause
const togglePlayPause = () => {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
};

// Player actions

// Next track
const nextTrack = () => {
    currentIndex = (currentIndex + 1) % tracks.length;
    loadTrack(currentIndex);
    isPlaying = true;
    audio.play().then(() => {
        updateUI(true);
    }).catch(err => {
        console.log("Play blocked on next:", err);
    });
};
// Previous track
const prevTrack = () => {
    currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentIndex);
    isPlaying = true;
    audio.play().then(() => {
        updateUI(true);
    }).catch(err => {
        console.log("Play blocked on prev:", err);
    });
};
// Update UI States
const updateUI = (playing) => {
    if (playing) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        discFace.classList.add('playing');
        miniVisualizer.classList.add('active');
        panelVisualizer.classList.add('active');
    } else {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        discFace.classList.remove('playing');
        miniVisualizer.classList.remove('active');
        panelVisualizer.classList.remove('active');
    }
    
    // Refresh playlist highlights and speaker icons
    renderPlaylist();
};
// Panel visibility toggles
const toggleControlsPanel = (e) => {
    // If clicking inside the disc-trigger button itself but not the close button
    cardPanel.classList.toggle('active');
};
const closeControlsPanel = (e) => {
    e.stopPropagation(); // prevent triggering outer panel toggle
    cardPanel.classList.remove('active');
};
// Autoplay handler with fallback for browser restriction policies
const attemptAutoplay = () => {
    // Attempt play immediately
    audio.play().then(() => {
        isPlaying = true;
        updateUI(true);
    }).catch(err => {
        console.log("Autoplay blocked by browser. Setup interaction fallback...");
        // Setup interaction listeners on page
        addInteractionListeners();
    });
};
const playOnFirstInteraction = () => {
    playTrack();
};
const addInteractionListeners = () => {
    document.addEventListener('click', playOnFirstInteraction, { once: true });
    document.addEventListener('keydown', playOnFirstInteraction, { once: true });
    document.addEventListener('touchstart', playOnFirstInteraction, { once: true });
    document.addEventListener('scroll', playOnFirstInteraction, { once: true });
};
const removeInteractionListeners = () => {
    document.removeEventListener('click', playOnFirstInteraction);
    document.removeEventListener('keydown', playOnFirstInteraction);
    document.removeEventListener('touchstart', playOnFirstInteraction);
    document.removeEventListener('scroll', playOnFirstInteraction);
};
// Run after DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    initPlayer();
    // Simulate programmatic click on load/refresh to trigger autoplay fallback safely
    try {
        if (document.body) {
            document.body.click();
        }
    } catch (e) {
        console.warn("Programmatic click failed or was blocked:", e);
    }
});
