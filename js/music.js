// ==================== Premium Music Player Logic ====================
// ── Restore persisted state ──────────────────────────────────────────────────
let currentIndex = parseInt(sessionStorage.getItem('mp_index') || '0', 10);
let isPlaying = sessionStorage.getItem('mp_playing') === 'true';
let loopMode = parseInt(sessionStorage.getItem('mp_loop') || '0', 10);
let savedTime = parseFloat(sessionStorage.getItem('mp_time') || '0');

// Safety bounds check
if (currentIndex >= tracks.length || currentIndex < 0) currentIndex = 0;

// ── DOM Elements ─────────────────────────────────────────────────────────────
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
const loopBtn = document.getElementById('ctrl-loop');
const volumeSlider = document.getElementById('volume-slider');
const panelAlbumArt = document.getElementById('panel-album-art');
const songTitleDisplay = document.getElementById('song-title-display');
const songArtistDisplay = document.getElementById('song-artist-display');
const miniVisualizer = document.getElementById('mini-visualizer');
const panelVisualizer = document.getElementById('panel-visualizer');
const playlistList = document.getElementById('playlist-list');
const sideVisLeft = document.getElementById('side-vis-bars-left');
const sideVisRight = document.getElementById('side-vis-bars-right');

// ── Persist state on page unload ─────────────────────────────────────────────
window.addEventListener('pagehide', () => {
    sessionStorage.setItem('mp_index', currentIndex);
    sessionStorage.setItem('mp_playing', isPlaying);
    sessionStorage.setItem('mp_loop', loopMode);
    sessionStorage.setItem('mp_time', audio.currentTime || 0);
});

// Also persist periodically while playing so seekbar is accurate
setInterval(() => {
    if (isPlaying && !audio.paused) {
        sessionStorage.setItem('mp_time', audio.currentTime);
    }
}, 1000);

// ── Web Audio API ─────────────────────────────────────────────────────────────
let audioContext = null;
let analyser = null;
let audioSource = null;
let sideVisAnimId = null;
let simVisAnimId = null;
let audioContextReady = false;

const SIDE_BAR_COUNT = 40;

// ── Build side bars (horizontal) ─────────────────────────────────────────────
const buildSideBars = () => {
    sideVisLeft.innerHTML = '';
    sideVisRight.innerHTML = '';
    for (let i = 0; i < SIDE_BAR_COUNT; i++) {
        const barL = document.createElement('div');
        barL.className = 'sv-bar';
        sideVisLeft.appendChild(barL);

        const barR = document.createElement('div');
        barR.className = 'sv-bar';
        sideVisRight.appendChild(barR);
    }
};

// ── AudioContext (bypass on file://) ─────────────────────────────────────────
const initAudioContext = () => {
    if (audioContextReady) return;

    if (window.location.protocol === 'file:') {
        console.log('file:// — bypassing Web Audio API to preserve sound.');
        audioContextReady = true;
        analyser = null;
        return;
    }

    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        audioSource = audioContext.createMediaElementSource(audio);
        audioSource.connect(analyser);
        analyser.connect(audioContext.destination);
        audioContextReady = true;
    } catch (e) {
        console.warn('AudioContext init failed:', e);
        audioContextReady = true;
        analyser = null;
    }
};

const resumeAudioContext = async () => {
    if (audioContext && audioContext.state === 'suspended') {
        try { await audioContext.resume(); } catch (e) { }
    }
};

// ── Simulated visualizer (wave animation when no real analyser) ───────────────
const startSimulatedSideVis = () => {
    if (simVisAnimId) return;
    const leftBars = Array.from(sideVisLeft.querySelectorAll('.sv-bar'));
    const rightBars = Array.from(sideVisRight.querySelectorAll('.sv-bar'));
    let phase = 0;

    const draw = () => {
        simVisAnimId = requestAnimationFrame(draw);
        phase += 0.08;

        // Calculate a simulated beat pulse at 120 BPM (500ms per beat)
        const beatMs = 500;
        const timeInBeat = Date.now() % beatMs;
        const beatPulse = Math.exp(-timeInBeat / 120); // Exponential decay (sharp attack, smooth decay)

        leftBars.forEach((bar, i) => {
            // mi represents distance from bottom (0 at bottom, SIDE_BAR_COUNT-1 at top)
            const mi = SIDE_BAR_COUNT - 1 - i;
            const isBass = mi < 12; // Bottom 12 bars are bass
            const wave = Math.sin(phase + mi * 0.25) * 0.35 + 0.45;
            const noise = Math.random() * 0.12;

            let val = wave + noise;
            if (isBass) {
                // Bass frequencies pulse strongly on the simulated kick beat
                val += beatPulse * 0.45;
            } else {
                // Mid/Highs react with a slight delay/wave shift
                val += beatPulse * 0.18 * Math.sin(phase - mi * 0.15);
            }

            const pct = Math.min(100, Math.max(4, val * 100));
            bar.style.width = pct + '%';
            const l = 35 + (pct / 100) * 25;
            bar.style.background = `hsl(0,100%,${l}%)`;
            bar.style.boxShadow = pct > 75 ? `0 0 6px hsl(0,100%,${l}%)` : 'none';
        });

        rightBars.forEach((bar, i) => {
            const mi = SIDE_BAR_COUNT - 1 - i;
            const isBass = mi < 12;
            const wave = Math.sin(phase + mi * 0.25) * 0.35 + 0.45;
            const noise = Math.random() * 0.12;

            let val = wave + noise;
            if (isBass) {
                val += beatPulse * 0.45;
            } else {
                val += beatPulse * 0.18 * Math.sin(phase - mi * 0.15);
            }

            const pct = Math.min(100, Math.max(4, val * 100));
            bar.style.width = pct + '%';
            const l = 35 + (pct / 100) * 25;
            bar.style.background = `hsl(0,100%,${l}%)`;
            bar.style.boxShadow = pct > 75 ? `0 0 6px hsl(0,100%,${l}%)` : 'none';
        });
    };
    draw();
};

const stopSimulatedSideVis = () => {
    if (simVisAnimId) { cancelAnimationFrame(simVisAnimId); simVisAnimId = null; }
};

// ── Real analyser visualizer ──────────────────────────────────────────────────
const startSideVis = () => {
    if (sideVisAnimId || simVisAnimId) return;
    if (!analyser) { startSimulatedSideVis(); return; }

    const leftBars = Array.from(sideVisLeft.querySelectorAll('.sv-bar'));
    const rightBars = Array.from(sideVisRight.querySelectorAll('.sv-bar'));
    const bufLen = analyser.frequencyBinCount; // 128 (fftSize = 256)
    const dataArray = new Uint8Array(bufLen);
    const step = Math.max(1, Math.floor(bufLen / SIDE_BAR_COUNT)); // 128 / 40 = 3

    const draw = () => {
        sideVisAnimId = requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);

        // Symmetric mapping: Bass is at the bottom (mi = 0, index = 39)
        // and Treble is at the top (mi = 39, index = 0)
        leftBars.forEach((bar, i) => {
            const mi = (SIDE_BAR_COUNT - 1 - i) * step;
            const v = dataArray[mi] || 0;
            const pct = Math.max(4, (v / 255) * 100);
            bar.style.width = pct + '%';
            const l = 35 + (v / 255) * 25;
            bar.style.background = `hsl(0,100%,${l}%)`;
            bar.style.boxShadow = v > 100 ? `0 0 6px hsl(0,100%,${l}%)` : 'none';
        });
        rightBars.forEach((bar, i) => {
            const mi = (SIDE_BAR_COUNT - 1 - i) * step;
            const v = dataArray[mi] || 0;
            const pct = Math.max(4, (v / 255) * 100);
            bar.style.width = pct + '%';
            const l = 35 + (v / 255) * 25;
            bar.style.background = `hsl(0,100%,${l}%)`;
            bar.style.boxShadow = v > 100 ? `0 0 6px hsl(0,100%,${l}%)` : 'none';
        });
    };
    draw();
};

const stopSideVis = () => {
    if (sideVisAnimId) { cancelAnimationFrame(sideVisAnimId); sideVisAnimId = null; }
    stopSimulatedSideVis();
    document.querySelectorAll('.sv-bar').forEach(bar => {
        bar.style.width = '4%';
        bar.style.background = 'rgba(179,0,0,0.3)';
        bar.style.boxShadow = 'none';
    });
};

// ── Loop Button ───────────────────────────────────────────────────────────────
const updateLoopBtn = () => {
    const icons = loopBtn.querySelectorAll('.loop-icon');
    icons.forEach(icon => icon.style.display = 'none');
    loopBtn.classList.remove('loop-active', 'loop-one-active', 'loop-shuffle-active');

    if (loopMode === 0) {
        loopBtn.querySelector('.loop-all').style.display = '';
        loopBtn.title = 'Loop: All';
        loopBtn.classList.add('loop-active');
    } else if (loopMode === 1) {
        loopBtn.querySelector('.loop-one').style.display = '';
        loopBtn.title = 'Loop: One';
        loopBtn.classList.add('loop-one-active');
    } else {
        loopBtn.querySelector('.loop-shuffle').style.display = '';
        loopBtn.title = 'Loop: Shuffle';
        loopBtn.classList.add('loop-shuffle-active');
    }
};

const cycleLoopMode = () => {
    loopMode = (loopMode + 1) % 3;
    sessionStorage.setItem('mp_loop', loopMode);
    updateLoopBtn();
};

// ── Playlist Render ───────────────────────────────────────────────────────────
const renderPlaylist = () => {
    if (!playlistList) return;
    playlistList.innerHTML = '';
    tracks.forEach((track, index) => {
        const li = document.createElement('li');
        li.className = `playlist-item ${index === currentIndex ? 'active' : ''}`;
        const coverSrc = track.cover || '';
        li.innerHTML = `
            <img class="playlist-item-art" src="${coverSrc}" alt="${track.title}"
                onerror="this.src='https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=50&h=50&fit=crop'">
            <div class="playlist-item-details">
                <div class="playlist-item-title">${track.title}</div>
                <div class="playlist-item-artist">${track.artist}</div>
            </div>
            <div class="playlist-item-status">${index === currentIndex && isPlaying ? '♫' : ''}</div>
        `;
        li.addEventListener('click', () => {
            if (currentIndex === index) { togglePlayPause(); }
            else { currentIndex = index; loadTrack(currentIndex); playTrack(); }
        });
        playlistList.appendChild(li);
    });
};

// ── Load Track ────────────────────────────────────────────────────────────────
const loadTrack = (index) => {
    const track = tracks[index];
    audio.src = track.src;

    discAlbumArt.src = track.cover || '';
    panelAlbumArt.src = track.cover || '';
    songTitleDisplay.textContent = track.title;
    if (songArtistDisplay) songArtistDisplay.textContent = track.artist;

    sessionStorage.setItem('mp_index', index);
    sessionStorage.setItem('mp_time', 0);
};

// ── Play / Pause ──────────────────────────────────────────────────────────────
const playTrack = () => {
    if (!audioContextReady) initAudioContext();
    resumeAudioContext().then(() => {
        audio.play()
            .then(() => {
                isPlaying = true;
                sessionStorage.setItem('mp_playing', 'true');
                updateUI(true);
                removeInteractionListeners();
                startSideVis();
            })
            .catch(err => console.log('Playback failed:', err));
    });
};

const pauseTrack = () => {
    audio.pause();
    isPlaying = false;
    sessionStorage.setItem('mp_playing', 'false');
    updateUI(false);
};

const togglePlayPause = () => {
    if (isPlaying) pauseTrack();
    else playTrack();
};

// ── Next / Prev ───────────────────────────────────────────────────────────────
const getRandomIndex = () => {
    if (tracks.length <= 1) return 0;
    let idx;
    do { idx = Math.floor(Math.random() * tracks.length); } while (idx === currentIndex);
    return idx;
};

const nextTrack = () => {
    // Always advance to next song (never repeat unless Loop One is active)
    currentIndex = loopMode === 2 ? getRandomIndex() : (currentIndex + 1) % tracks.length;
    loadTrack(currentIndex);
    isPlaying = true;
    playTrack();
};

const prevTrack = () => {
    if (audio.currentTime > 3) { audio.currentTime = 0; if (isPlaying) audio.play(); return; }
    currentIndex = loopMode === 2 ? getRandomIndex() : (currentIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentIndex);
    isPlaying = true;
    playTrack();
};

// ── Track End ─────────────────────────────────────────────────────────────────
const handleTrackEnd = () => {
    if (loopMode === 1) {
        // Loop One: replay current
        audio.currentTime = 0;
        audio.play()
            .then(() => updateUI(true))
            .catch(err => console.log('Loop one error:', err));
    } else {
        // Loop All or Shuffle: advance to next (never stops)
        currentIndex = loopMode === 2 ? getRandomIndex() : (currentIndex + 1) % tracks.length;
        loadTrack(currentIndex);
        isPlaying = true;
        audio.play()
            .then(() => { updateUI(true); startSideVis(); })
            .catch(err => console.log('Auto-next error:', err));
    }
};

// ── Update UI ─────────────────────────────────────────────────────────────────
const updateUI = (playing) => {
    const sideLeft = document.getElementById('side-visualizer-left');
    const sideRight = document.getElementById('side-visualizer-right');

    if (playing) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        discFace.classList.add('playing');
        miniVisualizer.classList.add('active');
        panelVisualizer.classList.add('active');
        if (sideLeft) sideLeft.classList.add('active');
        if (sideRight) sideRight.classList.add('active');
    } else {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        discFace.classList.remove('playing');
        miniVisualizer.classList.remove('active');
        panelVisualizer.classList.remove('active');
        if (sideLeft) sideLeft.classList.remove('active');
        if (sideRight) sideRight.classList.remove('active');
        stopSideVis();
    }
    renderPlaylist();
};

// ── Panel ─────────────────────────────────────────────────────────────────────
const toggleControlsPanel = () => cardPanel.classList.toggle('active');

// ── Autoplay / Interaction Listeners ─────────────────────────────────────────
const playOnFirstInteraction = () => playTrack();

const addInteractionListeners = () => {
    document.addEventListener('click', playOnFirstInteraction, { once: true });
    document.addEventListener('keydown', playOnFirstInteraction, { once: true });
    document.addEventListener('touchstart', playOnFirstInteraction, { once: true });
};

const removeInteractionListeners = () => {
    document.removeEventListener('click', playOnFirstInteraction);
    document.removeEventListener('keydown', playOnFirstInteraction);
    document.removeEventListener('touchstart', playOnFirstInteraction);
};

const attemptAutoplay = () => {
    audio.play().then(() => {
        isPlaying = true;
        sessionStorage.setItem('mp_playing', 'true');
        updateUI(true);
    }).catch(() => {
        console.log('Autoplay blocked — waiting for interaction...');
        if (isPlaying) {
            // Was playing on previous page — prompt user once
            addInteractionListeners();
        }
        updateUI(false);
    });
};

// ── Initialize ────────────────────────────────────────────────────────────────
const initPlayer = () => {
    buildSideBars();

    // Load the track that was playing before navigation
    const track = tracks[currentIndex];
    audio.src = track.src;
    discAlbumArt.src = track.cover || '';
    panelAlbumArt.src = track.cover || '';
    songTitleDisplay.textContent = track.title;
    if (songArtistDisplay) songArtistDisplay.textContent = track.artist;

    // Restore volume
    const savedVol = sessionStorage.getItem('mp_vol');
    audio.volume = savedVol !== null ? parseFloat(savedVol) : 0.5;
    volumeSlider.value = audio.volume;

    // Button listeners
    discTrigger.addEventListener('click', toggleControlsPanel);
    closeBtn.addEventListener('click', (e) => { e.stopPropagation(); cardPanel.classList.remove('active'); });
    playPauseBtn.addEventListener('click', togglePlayPause);
    prevBtn.addEventListener('click', prevTrack);
    nextBtn.addEventListener('click', nextTrack);
    loopBtn.addEventListener('click', cycleLoopMode);
    volumeSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value;
        sessionStorage.setItem('mp_vol', e.target.value);
    });

    // Close panel on outside click
    document.addEventListener('click', (e) => {
        if (cardPanel.classList.contains('active')) {
            if (!cardPanel.contains(e.target) && !discTrigger.contains(e.target)) {
                cardPanel.classList.remove('active');
            }
        }
    });

    audio.addEventListener('ended', handleTrackEnd);

    renderPlaylist();
    updateLoopBtn();

    // Restore playback position then play if was playing
    const onCanPlay = () => {
        audio.removeEventListener('canplay', onCanPlay);
        if (savedTime > 0) {
            try { audio.currentTime = savedTime; } catch (e) { }
        }
        if (isPlaying) {
            attemptAutoplay();
            startSideVis();
        } else {
            updateUI(false);
        }
    };
    audio.addEventListener('canplay', onCanPlay);
    audio.load();
};

document.addEventListener('DOMContentLoaded', initPlayer);
