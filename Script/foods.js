/*------------------------- MAKE FOODS -------------------------*/

class Food {
    static allFoods = [];
    
    constructor(name, className, iconPath, points) {
        this.name = name;
        this.class = className;
        this.icon = `<img src="${iconPath}">`;
        this.points = points;
        Food.allFoods.push(this); 
    }
    effect() {
        justAte = 'food';
    }
}

class GlowFood extends Food {
    constructor(name, className, iconPath, points, glowEffect) {
        super(name, className, iconPath, points);
        this.glowEffect = glowEffect;
    }
    effect() {
        glowArea += this.glowEffect;
        justAte = this.glowEffect === -1 ? 'dimmer' : 'food';
    }
}

class SpeedFood extends Food {
    constructor(name, className, iconPath, points, speedEffect) {
        super(name, className, iconPath, points);
        this.speedEffect = speedEffect;
    }
    effect() {
        wormSpeed += (this.speedEffect * STARTING_SPEED_CHANGE_INCREMENT);
        justAte = 'food';
    }
}

class PoisonFood extends Food {
    constructor(name, className, iconPath, points) {
        super(name, className, iconPath, points);
    }
    effect() {
        justAte = 'poison';
    }
}

const smallFood = new Food('Small Food', 'small-food', 'FoodIcons/smallFood.svg', 10);
const largeFood = new Food('Large Food', 'large-food', 'FoodIcons/largeFood.svg', 20);
const poisonFood = new PoisonFood('Poison!', 'poison-food', 'FoodIcons/poison.svg', -20);
const brighter = new GlowFood('Brighter', 'brighter-food', 'FoodIcons/brighter.svg', 0, 1);
const dimmer = new GlowFood('Dimmer', 'dimmer-food', 'FoodIcons/dimmer.svg', 20, -1);
const faster = new SpeedFood('Faster', 'faster-food', 'FoodIcons/faster.svg', 20, -1);
const slower = new SpeedFood('Slower', 'slower-food', 'FoodIcons/slower.svg', 0, 1);


// Make food table
const foodTable = document.getElementById('food-table');

function makeFoodTable() {
    Food.allFoods.forEach((food) => {
        let foodEntry = document.createElement('div');
        foodEntry.innerHTML = `${food.name} ${food.icon} pts: <strong>${food.points}</strong>`
        foodTable.appendChild(foodEntry);
    });
}

makeFoodTable();