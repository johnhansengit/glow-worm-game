/*------------------------- CONSTANTS -------------------------*/

const GRID_SIZE = 30;
const POINTS_FOR_LEVEL_UP = 100;

// Starting values
const STARTING_WORM_LENGTH = 7;
const STARTING_GLOW_AREA = 5;
const STARTING_SPEED = 150;
const STARTING_SPEED_CHANGE_INCREMENT = 25;
const STARTING_NUM_OF_FOOD = 2;

// Direction changes to X,Y coordinates
const D = {
    up: [0, 1],
    right: [1, 0],
    down: [0, -1],
    left: [-1, 0],
};


/*------------------------- STATE VARIABLES -------------------------*/

let glowArea;
let wormSpeed;


/*------------------------- CACHED ELEMENTS -------------------------*/

//Hamburger Nav Menu
const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks = document.getElementById('hamburger-nav-links');
const startBtn = document.getElementById('start-game');


/*------------------------- EVENT LISTENERS -------------------------*/

// Hamburger Nav Menu Functionality
hamburgerBtn.addEventListener('click', function () {
    if (navLinks.style.opacity == '0' || navLinks.style.opacity == '') {
        navLinks.style.opacity = '1';
        navLinks.style.visibility = 'visible';
    } else {
        navLinks.style.opacity = '0';
        setTimeout(() => { navLinks.style.visibility = 'hidden'; }, 500);
    }
});

// Start Game Button
if (startBtn) {
    startBtn.addEventListener('click', function () {
        window.location.href = 'game.html';
    });
}


/*------------------------- INIT FUNCTIONS -------------------------*/

// Make different foods
class Food {
    constructor(name, symb, points) {
        this.name = name;
        this.symb = symb;
        this.points = points;
    }
}

class GlowFood extends Food {
    constructor(name, symb, points, glowEffect) {
        super(name, symb, points);
        this.glowEffect = glowEffect;
    }
    changeGlow() {
        glowArea += this.glowEffect;
    }
}

class SpeedFood extends Food {
    constructor(name, symb, points, speedEffect) {
        super(name, symb, points);
        this.speedEffect = speedEffect;
    }
    changeSpeed() {
        wormSpeed += this.speedEffect * STARTING_SPEED_CHANGE_INCREMENT;
    }
}

const smallFood = new Food('Small Food', 'f', 10);
const largeFood = new Food('Large Food', '(F)', 20);
const poisonFood = new Food('Poison!', 'x', -20);
const brighter = new GlowFood('Brighter', 'O', 0, 1);
const dimmer = new GlowFood('Dimmer', '•', 10, -1);
const faster = new SpeedFood('Faster', '↑', 10, 1);
const slower = new SpeedFood('Slower', '↓', 0, -1);

