/*------------------------- CONSTANTS -------------------------*/

const GRID_SIZE = 30;
const POINTS_FOR_LEVEL_UP = 100;

// Starting values
const STARTING_WORM_LENGTH = 7;
const STARTING_GLOW_AREA = 5;
const STARTING_SPEED = 150;
const STARTING_SPEED_CHANGE_INCREMENT = 25;
const STARTING_NUM_OF_FOOD = 2;

// Direction change to X,Y coordinates
const D = {
    up: [0, 1],
    right: [1, 0],
    down: [0, -1],
    left: [-1, 0],
};

const actions = {
    ' ': { action: pauseGame, buttonId: 'pause' },
    'ArrowUp': { action: () => changeDirection(D.up), buttonId: 'arrow-up' },
    'ArrowRight': { action: () => changeDirection(D.right), buttonId: 'arrow-right' },
    'ArrowDown': { action: () => changeDirection(D.down), buttonId: 'arrow-down' },
    'ArrowLeft': { action: () => changeDirection(D.left), buttonId: 'arrow-left' },
    'w': { action: () => changeDirection(D.up), buttonId: 'arrow-up' },
    'd': { action: () => changeDirection(D.right), buttonId: 'arrow-right' },
    's': { action: () => changeDirection(D.down), buttonId: 'arrow-down' },
    'a': { action: () => changeDirection(D.left), buttonId: 'arrow-left' },
};

// Sound
const backgroundMusic = new Audio('Sound/background-music.mp3');
backgroundMusic.loop = true;

const eatSound = new Audio('Sound/eat-sound.mp3')

/*------------------------- STATE VARIABLES -------------------------*/

// Player
let playerName;

// Stats
let leaderBoardScores;
let level;
let highScore;
let currentScore;
let time;
let timerInterval;

// Worm
let wormHeadCoords;
let wormHead;
let wormTail;
let glowArea;
let moveInterval;
let wormSpeed;
let wormDirection;
let newWormId;
let justAte;

// Food
let numOfFood;
let foodPosition;
let food;
let points;


/*------------------------- CACHED ELEMENTS -------------------------*/

// Content
const main = document.querySelector('main');
const footer = document.querySelector('footer')

// Stats
const levelEl = document.getElementById('level');
const highScoreEl = document.getElementById('high-score-val');
const currentScoreEl = document.getElementById('current-score-val');
const timeEl = document.getElementById('time-val');
const leaderboardEl = document.getElementById('leaderboard');

// Grid
const grid = document.getElementById('grid');

// Message Containers
const startCont = document.getElementById('start-game-container');
const restartCont = document.getElementById('restart-game-container');
// const foodTable = document.getElementById('food-table');

// Buttons
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const quitBtn = document.getElementById('quit-reset-btn');

const pauseBtn = document.getElementById('pause');

const upArrow = document.getElementById('arrow-up');
const rightArrow = document.getElementById('arrow-right');
const downArrow = document.getElementById('arrow-down');
const leftArrow = document.getElementById('arrow-left');


/*------------------------- EVENT LISTENERS -------------------------*/

// Start/Restart/Quit Game Buttons
if (startBtn) {
    startBtn.addEventListener('click', startGame);
}

restartBtn.addEventListener('click', startGame);

quitBtn.addEventListener('click', function () {
    restartCont.style.display = 'none';
    init();
});

// Event listener for keyboard
document.addEventListener('keydown', function (event) {
    handleInput(event.key);
});

// Event listeners for mouse
document.getElementById('pause').addEventListener('click', () => handleInput(' '));
document.getElementById('arrow-up').addEventListener('click', () => handleInput('ArrowUp'));
document.getElementById('arrow-right').addEventListener('click', () => handleInput('ArrowRight'));
document.getElementById('arrow-down').addEventListener('click', () => handleInput('ArrowDown'));
document.getElementById('arrow-left').addEventListener('click', () => handleInput('ArrowLeft'));

/*------------------------- INIT FUNCTIONS -------------------------*/

// Initialize Functions
function fadeInPage() {
    main.style.opacity = 1;
    footer.style.opacity = 1;
}

function init() {
    setHighScore(0);
    resetStats();
    renderGrid();
    startCont.style.display = 'flex';
}

function resetStats() {
    setCurrentScore(0);
    resetTimer();
    setLevel(1);
}

function initWorm() {
    // Initialize Worm Head
    let xStart = randomCoord('leftHalf');
    let yStart = randomCoord();
    wormHeadCoords = [xStart, yStart];

    // Initialize Worm Tail
    wormTail = [];
    for (let i = 1; i <= STARTING_WORM_LENGTH; i++) {
        wormTail.unshift([xStart - i, yStart]);
    }

    // Initialize Glow Area
    glowArea = STARTING_GLOW_AREA;

    // Initialize Speed & Direction
    moveInterval = null;
    wormSpeed = STARTING_SPEED;
    wormDirection = D.right;
}

// Randomizers
function randomCoord(condition) {
    if (condition === 'leftHalf') {
        return Math.floor(Math.random() * (GRID_SIZE / 2) + STARTING_WORM_LENGTH + 1);
    } else {
        return Math.floor(Math.random() * GRID_SIZE) + 1;
    }
}


/*------------------------- INITIALIZE GAME -------------------------*/

fadeInPage();
init();