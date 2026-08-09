// Persistent Romantic Background Music Player
document.addEventListener("DOMContentLoaded", () => {
    const musicBtn = document.getElementById("musicBtn");
    const path = window.location.pathname.toLowerCase();
    
    const isNoMusicPage = path.endsWith("index.html") || 
                          path.endsWith("video.html") || 
                          path.endsWith("/") || 
                          path === "" ||
                          (!path.includes(".html") && !path.includes("reasons") && !path.includes("message") && !path.includes("video") && !path.includes("heart") && !path.includes("cake") && !path.includes("memories"));

    if (isNoMusicPage) {
        if (musicBtn) musicBtn.style.display = "none";
        const bgAudio = document.getElementById("bgMusic");
        if (bgAudio) bgAudio.pause();
        return;
    }

    // Determine the song and volume for the current page
    let songSrc = "";
    let volume = 0.8;
    
    if (path.endsWith("message.html")) {
        songSrc = "music/friendship.mp3";
        volume = 0.5;
    } else if (path.endsWith("memories.html")) {
        songSrc = "music/jodinilave.mp3";
        volume = 0.6;
    } else if (path.endsWith("cake.html")) {
        songSrc = "music/birthday_bgm.m4a";
        volume = 0.8;
    } else if (path.endsWith("reasons.html") || path.endsWith("heart.html")) {
        songSrc = "music/theri.mp3";
        volume = 0.8;
    }

    if (!songSrc) return;

    // Set up HTML5 audio element
    let bgAudio = document.getElementById("bgMusic");
    if (!bgAudio || bgAudio.tagName.toLowerCase() !== "audio") {
        if (bgAudio) bgAudio.remove();
        bgAudio = document.createElement("audio");
        bgAudio.id = "bgMusic";
        document.body.appendChild(bgAudio);
    }
    
    // Clear any hardcoded source tags that might interfere
    while (bgAudio.firstChild) {
        bgAudio.removeChild(bgAudio.firstChild);
    }
    
    // Set song source and options
    bgAudio.src = songSrc;
    bgAudio.loop = true;
    bgAudio.volume = volume;
    bgAudio.load();

    // Try playing on load if it was active
    const isPlaying = localStorage.getItem("bgMusicPlaying") === "true";
    if (isPlaying) {
        bgAudio.play().then(() => {
            if (musicBtn) musicBtn.classList.add("playing");
        }).catch(() => {
            // Autoplay blocked by browser
        });
    }

    // Fallback for browser autoplay policies: trigger play on first interaction
    const startAutoplay = () => {
        if (bgAudio.paused && localStorage.getItem("bgMusicPlaying") === "true") {
            bgAudio.play().then(() => {
                if (musicBtn) musicBtn.classList.add("playing");
            });
        }
        window.removeEventListener('click', startAutoplay);
        window.removeEventListener('touchstart', startAutoplay);
    };

    window.addEventListener('click', startAutoplay);
    window.addEventListener('touchstart', startAutoplay);

    if (musicBtn) {
        musicBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (bgAudio.paused) {
                bgAudio.play();
                musicBtn.classList.add("playing");
                localStorage.setItem("bgMusicPlaying", "true");
                createMusicNotes(musicBtn);
            } else {
                bgAudio.pause();
                musicBtn.classList.remove("playing");
                localStorage.setItem("bgMusicPlaying", "false");
            }
        });
    }

    function createMusicNotes(target) {
        for (let i = 0; i < 5; i++) {
            const note = document.createElement("span");
            note.innerHTML = i % 2 === 0 ? "🎵" : "🎶";
            note.className = "floating-note";
            const rect = target.getBoundingClientRect();
            note.style.left = `${rect.left + Math.random() * 40}px`;
            note.style.top = `${rect.top}px`;
            document.body.appendChild(note);
            setTimeout(() => note.remove(), 2000);
        }
    }
});
