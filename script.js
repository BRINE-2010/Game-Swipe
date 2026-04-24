let currentPlayer = "X";
let gameState = [];
let gameActive = false;
let mode = 'friend';
let gridSize = 3;

const board = document.getElementById('board');
const statusText = document.getElementById('status');
const goalPopup = document.getElementById('goal-popup');
const bgMusic = document.getElementById('bg-music');

// Load scores from storage
let userWins = localStorage.getItem('userWins') || 0;
let aiWins = localStorage.getItem('aiWins') || 0;

function showGridSelect(m) {
    mode = m;
    bgMusic.play().catch(() => {});
    document.getElementById('menu-screen').style.display = 'none';
    document.getElementById('grid-screen').style.display = 'flex';
}

function startGame(size) {
    gridSize = size;
    document.getElementById('grid-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'flex';
    
    // Dynamic Goal Note
    goalPopup.innerText = `GET ${size} IN A ROW!`;
    goalPopup.style.display = 'block';
    
    createBoard();
    resetGame();
}

function createBoard() {
    board.innerHTML = '';
    board.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    const containerSize = 320; 
    const cellSize = (containerSize / gridSize) - 8;
    
    gameState = Array(gridSize * gridSize).fill("");
    
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.width = cellSize + 'px';
        cell.style.height = cellSize + 'px';
        cell.style.fontSize = (cellSize * 0.6) + 'px';
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

function handleCellClick(e) {
    const idx = e.target.dataset.index;
    if (gameState[idx] !== "" || !gameActive) return;

    document.getElementById('click-sfx').play();
    makeMove(idx);

    if (gameActive && mode === 'ai' && currentPlayer === "O") {
        setTimeout(aiMove, 600);
    }
}

function makeMove(idx) {
    gameState[idx] = currentPlayer;
    const cell = board.children[idx];
    cell.innerText = currentPlayer;
    cell.style.color = currentPlayer === "X" ? "var(--main)" : "#fff";

    const winningCombo = checkWin();
    if (winningCombo) {
        document.getElementById('win-sfx').play();
        statusText.innerText = `PLAYER ${currentPlayer} WINS! 🏆`;
        gameActive = false;
        winningCombo.forEach(i => board.children[i].classList.add('win-anim'));
        saveWin(currentPlayer);
        return;
    }

    if (!gameState.includes("")) {
        statusText.innerText = "DRAW! 🤝";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = `Player ${currentPlayer}'s Turn`;
}

function saveWin(p) {
    if (mode !== 'ai') return;
    if (p === "X") {
        userWins++;
        localStorage.setItem('userWins', userWins);
    } else {
        aiWins++;
        localStorage.setItem('aiWins', aiWins);
    }
}

function showLeaderboard() {
    document.getElementById('menu-screen').style.display = 'none';
    document.getElementById('score-screen').style.display = 'flex';
    document.getElementById('saved-user-wins').innerText = localStorage.getItem('userWins') || 0;
    document.getElementById('saved-ai-wins').innerText = localStorage.getItem('aiWins') || 0;
}

function aiMove() {
    const wins = getWinConditions();
    let move = findMove(wins, "O") || findMove(wins, "X") || gameState.indexOf("");
    if (move !== -1) makeMove(move);
}

function findMove(wins, p) {
    for (let combo of wins) {
        let values = combo.map(i => gameState[i]);
        if (values.filter(v => v === p).length === gridSize - 1 && values.filter(v => v === "").length === 1) {
            return combo[values.indexOf("")];
        }
    }
    return null;
}

function getWinConditions() {
    let wins = [];
    for (let i = 0; i < gridSize; i++) {
        let row = [], col = [];
        for (let j = 0; j < gridSize; j++) {
            row.push(i * gridSize + j);
            col.push(j * gridSize + i);
        }
        wins.push(row, col);
    }
    let d1 = [], d2 = [];
    for (let i = 0; i < gridSize; i++) {
        d1.push(i * gridSize + i);
        d2.push(i * gridSize + (gridSize - 1 - i));
    }
    wins.push(d1, d2);
    return wins;
}

function checkWin() {
    const wins = getWinConditions();
    for (let w of wins) {
        if (w.every(i => gameState[i] === currentPlayer)) return w;
    }
    return null;
}

function resetGame() {
    gameState.fill("");
    gameActive = true;
    currentPlayer = "X";
    statusText.innerText = "Player X's Turn";
    Array.from(board.children).forEach(c => { c.innerText = ""; c.classList.remove('win-anim'); });
    goalPopup.style.display = 'none';
}

function goToMenu() {
    document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
    document.getElementById('menu-screen').style.display = 'flex';
}

function setTheme(t) { document.body.className = 'theme-' + t; }
function toggleThemeMenu() {
    const opt = document.getElementById('theme-options');
    opt.style.display = opt.style.display === 'none' ? 'flex' : 'none';
}