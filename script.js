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
        name: "Going roll balls", 
        url: "https://html5.gamemonetize.co/ozbxx1p7gw04eauwlp3vqf2ejimwkfqc/", 
        bg: "https://example.com/image.jpg" 
    },
    { 
        name: "Bullet shoot", 
        url: "https://html5.gamemonetize.co/tjsii5r6qlrfyf34b076syz13lzeq0x1/", 
        bg: "https://example.com/image.jpg" 
    },
    { 
        name: "Falling Ball", 
        url: "https://html5.gamemonetize.co/zqcxs1myrlq2m2rc6tz45jbxfdvs9n06/", 
        bg: "https://example.com/image.jpg" 
    },
    { 
        name: "Santa rope", 
        url: "https://html5.gamemonetize.co/w6npanu26kj9ieqeg5kclckgedc79kyw/", 
        bg: "https://example.com/image.jpg" 
    },
    { 
        name: "Angry Birds", 
        url: "https://html5.gamemonetize.co/ndzip7ly7bm2y13d6avy9v253zn81hk8/", 
        bg: "https://example.com/image.jpg" 
    },
     { 
        name: "Flappy Dunk", 
        url: "https://html5.gamemonetize.co/3bluguo5w49s3ybpsd1u7h4jk7xmrtjv/", 
        bg: "https://example.com/image.jpg" 
    },
     { 
        name: "Ludo", 
        url: "https://html5.gamemonetize.co/luqaexjt6itsaz00dfeooewpgm14xs9j/", 
        bg: "https://example.com/image.jpg" 
    },
     { 
        name: "Chess Master", 
        url: "https://html5.gamemonetize.co/0j27h8fp1no93ybdnpp61khjmpgubcqb/", 
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
