// 1. YOUR LOCAL GAMES (These show up first)
let localGames = [
    { name: "Tic Tac Toe", url: "./TicTacToe/index.html", bg: "https://images.unsplash.com/photo-1611996591156-66715d6018a1?q=80&w=2070&auto=format&fit=crop" }
];

let allGames = [...localGames];

// 2. AUTO-FETCH 50 GAMES FROM GAMEMONETIZE
async function fetchGames() {
    try {
        // Fetching 50 games from the 'Best' category
        const response = await fetch('https://gamemonetize.com/rssfeed.php?format=json&category=Best&type=newest&amount=50');
        const data = await response.json();
        
        const fetchedGames = data.map(game => ({
            name: game.title,
            url: game.url,
            bg: game.thumb // Using game thumbnail as background
        }));

        allGames = [...localGames, ...fetchedGames];
        console.log("50 Games Loaded, Boss!");
    } catch (error) {
        console.log("Fetch failed, using local list only.");
    }
}

// 3. SHUFFLE & START
function startScrolling() {
    document.getElementById('menu-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    
    // We render whatever we have fetched
    renderGames(allGames); 
    initRestartObserver();
}

// 4. RENDER TO SCREEN
function renderGames(gameArray) {
    const container = document.getElementById('scroll-container');
    container.innerHTML = ""; 
    
    gameArray.forEach((game, index) => {
        const slot = document.createElement('div');
        slot.className = 'game-slot';
        slot.style.backgroundImage = `radial-gradient(circle, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.9) 100%), url('${game.bg}')`;
        slot.dataset.name = game.name.toLowerCase();
        slot.innerHTML = `<iframe src="${game.url}" id="game-frame-${index}" allowfullscreen></iframe>`;
        container.appendChild(slot);
    });
}

// 5. THE SEARCH LOGIC (Filtered by Button or Enter Key)
function searchGames() {
    let input = document.getElementById('gameSearch').value.toLowerCase();
    let slots = document.getElementsByClassName('game-slot');
    
    for (let i = 0; i < slots.length; i++) {
        let name = slots[i].dataset.name;
        slots[i].style.display = name.includes(input) ? "flex" : "none";
    }
    // Scroll back to top after search
    document.getElementById('scroll-container').scrollTop = 0;
}

// 6. AUTO-RESTART ON SCROLL
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

function backToMenu() {
    document.getElementById('menu-screen').style.display = 'flex';
    document.getElementById('game-screen').style.display = 'none';
}

// Fetch games in the background as soon as page loads
fetchGames();