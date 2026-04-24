// 1. YOUR GAME DATABASE (Add your manual links here)
// Follow this format: { name: "Game Name", url: "The Link", bg: "The Image Link" }
const allGames = [
    { 
        name: "Tic Tac Toe", 
        url: "./TicTacToe/index.html", 
        bg: "https://images.unsplash.com/photo-1611996591156-66715d6018a1?q=80&w=2070&auto=format&fit=crop" 
    },
    // --- ADD YOUR GAME MONETIZE LINKS BELOW THIS LINE ---
    { 
        name: "Pop Ballon", 
        url: "https://html5.gamemonetize.co/kapfvra3zri06z6ohm6wm92s9yiwtpbi/", 
        bg: "https://example.com/image.jpg" 
    },
    { 
        name: "Stickman rush", 
        url: "https://html5.gamemonetize.co/34nwkjqmsl1gc36sefoqb52hxd2570ub/", 
        bg: "https://example.com/image.jpg" 
    },
    { 
        name: "Bullet shoot", 
        url: "https://html5.gamemonetize.co/tjsii5r6qlrfyf34b076syz13lzeq0x1/", 
        bg: "https://example.com/image.jpg" 
    },
    { 
        name: "Noob VS Zombies 2", 
        url: "https://html5.gamemonetize.co/mjcgbzq9z7xfzzwgsb15a1g3vn3r4m8t/", 
        bg: "https://example.com/image.jpg" 
    },
    { 
        name: "67 tap", 
        url: "https://html5.gamedistribution.com/f078134f39634ca78dcd4a8479a314a2/?gd_sdk_referrer_url=https://brine-2010.github.io/Game-Swipe/", 
        bg: "https://example.com/image.jpg" 
    },
    { 
        name: "FootBall", 
        url: "https://html5.gamedistribution.com/4a9c7ad53f7c48678b3b848390a62daa/?gd_sdk_referrer_url=https://brine-2010.github.io/Game-Swipe/", 
        bg: "https://example.com/image.jpg" 
    },
];

// 2. THE ACTUAL SHUFFLE FUNCTION (The "Secret Sauce")
// This randomly reorders your games list every time you start
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
    
    // Create a shuffled version of your list
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
        // Applying the background preview
        slot.style.backgroundImage = `radial-gradient(circle, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.9) 100%), url('${game.bg}')`;
        slot.dataset.name = game.name.toLowerCase();
        
        // Creating the frame
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
    // Scroll back to top after searching
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
    // Clear container to save battery/RAM
    document.getElementById('scroll-container').innerHTML = "";
}
