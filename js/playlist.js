// ==================== Shared Song List (Tracks) ====================
const tracks = [
    {
        title: "TAKE ME",
        artist: "Amirul Ehsan",
        src: "music/TAKE ME.mp3",
        cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=300&fit=crop",
        extractedCover: ""
    },
    {
        title: "meaningful love",
        artist: "Amirul Ehsan",
        src: "music/meaningful love (instrumental).mp3",
        cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&h=300&fit=crop",
        extractedCover: ""
    }
    // TO ADD A NEW SONG:
    // Copy the block above, add a comma after the closing brace, and fill in:
    // {
    //     title: "Song Title",
    //     artist: "Singer/Artist Name",
    //     src: "music/YourAudioFile.mp3",
    //     cover: "URL to album picture or local path",
    //     extractedCover: ""
    // }
];
window.tracks = tracks;
