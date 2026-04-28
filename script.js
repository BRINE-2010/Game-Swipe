// 1. YOUR GAME DATABASE (Add your manual links here)
// Follow this format: { name: "Game Name", url: "The Link", bg: "The Image Link" }
const allGames = [
    // --- ADDING GAME LINKS BELOW THIS LINE ---
    { 
        name: "Three Cups Game",
        url: "https://play.gamepix.com/three-cups-game/embed?sid=77517", 
        bg: "https://img.gamepix.com/games/three-cups-game/icon/three-cups-game.png?w=105" 
    },
    { 
        name: "TenTrix", 
        url: "https://play.gamepix.com/tentrix/embed?sid=77517", 
        bg: "https://img.gamepix.com/games/tentrix/icon/tentrix.png?w=105" 
    },
    { 
        name: "Slope Racing 3D", 
        url: "https://play.gamepix.com/slope-racing-3d/embed?sid=77517", 
        bg: "https://img.gamepix.com/games/slope-racing-3d/icon/slope-racing-3d.png?w=105" 
    },
    { 
        name: "Kobadoo Flags", 
        url: "https://play.gamepix.com/kobadoo-flags/embed?sid=77517", 
        bg: "https://img.gamepix.com/games/kobadoo-flags/icon/kobadoo-flags.png?w=105" 
    },
    { 
        name: "Mincraft Cube Puzzle", 
        url: "https://play.gamepix.com/minecraft-cube-puzzle/embed?sid=77517", 
        bg: "https://img.gamepix.com/games/minecraft-cube-puzzle/icon/minecraft-cube-puzzle.png?w=105" 
    },
    { 
        name: "Angry Flappy", 
        url: "https://play.gamepix.com/angry-flappy/embed?sid=1", 
        bg: "https://img.gamepix.com/games/angry-flappy/icon/angry-flappy.png?w=105" 
    },
     { 
        name: "Flappy Bird 2D Game", 
        url: "https://play.gamepix.com/flappy-bird-2d-game/embed?sid=1", 
        bg: "https://img.gamepix.com/games/flappy-bird-2d-game/icon/flappy-bird-2d-game.png?w=105" 
    },
     { 
        name: "Ludo Legend", 
        url: "https://play.gamepix.com/ludo-legend/embed?sid=1", 
        bg: "https://img.gamepix.com/games/ludo-legend/icon/ludo-legend.png?w=105" 
    },
     { 
        name: "Master Chess Multiplayer", 
        url: "https://play.gamepix.com/master-chess-multiplayer/embed?sid=1", 
        bg: "https://img.gamepix.com/games/master-chess-multiplayer/icon/master-chess-multiplayer.png?w=105" 
    },
    { 
        name: "Minecraft Drift Simulator", 
        url: "https://play.gamepix.com/minecraft-drift-simulator/embed?sid=77517", 
        bg: "https://img.gamepix.com/games/minecraft-drift-simulator/icon/minecraft-drift-simulator.png?w=105" 
    },
    { 
        name: "MR RACER - Car Racing", 
        url: "https://play.gamepix.com/mr-racer-car-racing-game/embed?sid=1", 
        bg: "https://img.gamepix.com/games/mr-racer-car-racing-game/icon/mr-racer-car-racing-game.png?w=105" 
    },
];

// 2. THE ACTUAL SHUFFLE FUNCTION (The "Secret Sauce")
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// 3. SHUFFLE & START
function startScrolling() {
    document.getElementById('menu-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    
    const shuffledList = shuffle([...allGames]); 
    
    renderGames(shuffledList); 
    initRestartObserver();
}

// 4. RENDER TO SCREEN (Optimized for Landscape)
function renderGames(gameArray) {
    const container = document.getElementById('scroll-container');
    container.innerHTML = ""; 
    
    gameArray.forEach((game, index) => {
        const slot = document.createElement('div');
        slot.className = 'game-slot';
        slot.style.backgroundImage = `radial-gradient(circle, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.9) 100%), url('${game.bg}')`;
        slot.dataset.name = game.name.toLowerCase();
        
        slot.innerHTML = `<iframe src="${game.url}" id="game-frame-${index}" allowfullscreen loading="lazy"></iframe>`;
        container.appendChild(slot);
    });
}

// 5. THE SEARCH LOGIC
function searchGames() {
    let input = document.getElementById('gameSearch').value.toLowerCase();
    let slots = document.getElementsByClassName('game-slot');
    
    for (let i = 0; i < slots.length; i++) {
        let name = slots[i].dataset.name;
        slots[i].style.display = name.includes(input) ? "flex" : "none";
    }
    document.getElementById('scroll-container').scrollTop = 0;
}

// 6. AUTO-RESTART ON SCROLL (High performance fix)
function initRestartObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const iframe = entry.target.querySelector('iframe');
            if (!entry.isIntersecting && iframe) {
                const currentUrl = iframe.src;
                iframe.src = ""; 
                setTimeout(() => { iframe.src = currentUrl; }, 150);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.game-slot').forEach(slot => observer.observe(slot));
} 

// 7. BACK TO MENU
function backToMenu() {
    document.getElementById('menu-screen').style.display = 'flex';
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('scroll-container').innerHTML = "";
}

// --- 8. ABOUT MODAL LOGIC ---
function showAbout() {
    document.getElementById("aboutModal").style.display = "flex";
}

function closeAbout() {
    document.getElementById("aboutModal").style.display = "none";
}

// Close the modal if the user clicks the dark background area
window.onclick = function(event) {
    const modal = document.getElementById("aboutModal");
    if (event.target == modal) {
        closeAbout();
    }
}
