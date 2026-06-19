// ==================== Shared Music Player + Side Visualizer Injector ====================

(function () {
    const playerHTML = `
    <!-- Floating Audio Player -->
    <div class="audio-player-container" id="audio-player-container">
        <audio id="bg-music"></audio>
        <button class="music-disc-trigger" id="music-disc-trigger" aria-label="Toggle music player">
            <div class="disc-face" id="disc-face">
                <img id="disc-album-art" src="" alt="Album Art">
                <div class="disc-center"></div>
            </div>
            <div class="mini-visualizer" id="mini-visualizer">
                <span class="bar"></span><span class="bar"></span><span class="bar"></span>
            </div>
        </button>

        <div class="music-card-panel" id="music-card-panel">
            <button class="music-close-btn" id="music-close-btn" aria-label="Close">&times;</button>
            <div class="panel-album-art-container">
                <img id="panel-album-art" class="panel-album-art" src="" alt="Album Art">
                <div class="panel-visualizer" id="panel-visualizer">
                    <span class="p-bar"></span><span class="p-bar"></span><span class="p-bar"></span>
                    <span class="p-bar"></span><span class="p-bar"></span>
                </div>
            </div>
            <div class="song-details">
                <h4 class="song-title-display" id="song-title-display"></h4>
                <p class="song-artist-display" id="song-artist-display"></p>
            </div>
            <div class="player-controls">
                <button class="ctrl-btn loop-btn" id="ctrl-loop" title="Loop: All">
                    <svg class="loop-icon loop-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                        <polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                    </svg>
                    <svg class="loop-icon loop-one" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;">
                        <polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                        <polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                        <text x="11" y="14" font-size="7" fill="currentColor" stroke="none" font-weight="bold">1</text>
                    </svg>
                    <svg class="loop-icon loop-shuffle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;">
                        <polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line>
                        <polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line>
                        <line x1="4" y1="4" x2="9" y2="9"></line>
                    </svg>
                </button>
                <button class="ctrl-btn" id="ctrl-prev" aria-label="Previous">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line>
                    </svg>
                </button>
                <button class="ctrl-btn play-pause-btn" id="ctrl-play-pause" aria-label="Play / Pause">
                    <svg class="play-icon" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    <svg class="pause-icon" viewBox="0 0 24 24" fill="currentColor" style="display:none;">
                        <rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>
                    </svg>
                </button>
                <button class="ctrl-btn" id="ctrl-next" aria-label="Next">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line>
                    </svg>
                </button>
            </div>
            <div class="volume-control">
                <svg class="vol-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
                <input type="range" id="volume-slider" min="0" max="1" step="0.02" value="0.5" class="volume-slider-input">
            </div>
            <div class="playlist-container">
                <ul class="playlist-list" id="playlist-list"></ul>
            </div>
        </div>
    </div>

    <!-- Side Visualizers -->
    <div class="side-visualizer side-visualizer-left" id="side-visualizer-left">
        <div class="side-vis-bars" id="side-vis-bars-left"></div>
    </div>
    <div class="side-visualizer side-visualizer-right" id="side-visualizer-right">
        <div class="side-vis-bars" id="side-vis-bars-right"></div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', playerHTML);
})();
