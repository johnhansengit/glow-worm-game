/*------------------------- SET STATS -------------------------*/

function setLevel(val) {
    levelEl.innerHTML = `Level: ${val}`;
}

function setHighScore(val) {
    highScoreEl.innerText = val;
}

function setCurrentScore(val) {
    currentScoreEl.innerText = val;
}

function resetTimer() {
    time = {
        min: 0,
        sec: 0
    }
    timeEl.innerText = '00:00';
}

/*------------------------- (RE)START GAME -------------------------*/

function startGame() {
    msgCont.style.display = 'none';
    numOfFood = STARTING_NUM_OF_FOOD;
    resetStats();
    initWorm();
    renderWorm();
    renderFood();
    moveWorm();
    runTimer();
}

function runTimer() {
    timerInterval = setInterval(function () {
        time.sec++;
        if (time.sec === 60) {
            time.min++;
            time.sec = 0;
        }
        timeEl.innerText = formatTime(time.min, time.sec);
    }, 1000);
}

function formatTime(min, sec) {
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

/*------------------------- GAME PLAY -------------------------*/

function moveWorm() {
    // Clear previous interval
    if (moveInterval) clearInterval(moveInterval);

    // Set new interval based on worm speed
    moveInterval = setInterval(function () {
        // Calculate new head position
        let newHeadX = wormHeadCoords[0] + wormDirection[0];
        let newHeadY = wormHeadCoords[1] + wormDirection[1];
        let newWormId = `x${newHeadX}y${newHeadY}`

        // Check if worm head is outside of grid
        if (
            newHeadX > GRID_SIZE ||
            newHeadY > GRID_SIZE ||
            newHeadX < 1 ||
            newHeadY < 1) {
            gameOver();
            return;

            // Check if worm is eating its own tail
        } else if (wormTail.some(segment => segment[0] === newHeadX && segment[1] === newHeadY)) {
            gameOver();
            return;

            // Check if worm head is on the food    
        } else if (document.getElementById(newWormId).innerText) {
            eatFood();

            // Otherwise, move normally
        } else {
            // Remove last segment
            wormTail.pop();

            // Add new segment at current head position (before moving the head)
            wormTail.unshift([...wormHeadCoords]);
        }

        // Update worm head position
        wormHeadCoords = [newHeadX, newHeadY];

        // Render new positions
        renderWorm();
    }, wormSpeed);
}

function eatFood() {
    let foodEaten = document.getElementById(newWormId).innerText;

    foods.forEach((food) => {
        if (food.symb === foodEaten) {

            // Update current score
            points = food.points;
            updateCurrentScore();

            // Run any food effects
            if (food.effect) {
                food.effect();
            }
        }
    })

    // Clear and generate new food position
    document.getElementById(newWormId).innerText = '';
    renderFood();

    // Add new segment at current head position (before moving the head)
    wormBody.unshift([...wormHeadCoords]);
}

function updateCurrentScore() {
    currentScore += points;
    currentScoreEl.innerText = currentScore;
    updateHighScore();
    if (currentScore >= level * POINTS_FOR_LEVEL_UP) {
        levelUp();
    }
}

function updateHighScore() {
    if (currentScore > highScore) {
        highScore = currentScore;
    }
    highScoreEl.innerText = highScore;
}

function levelUp() {
    level++;
    levelEl.innerHTML = '<span style="color: rgb(161, 249, 127);"><strong>LEVEL UP!</strong></span>';
    let newSpeedInc = SPEED_INCREMENT * Math.pow(0.8, level - 1);
    adjustWormSpeed(wormSpeed - newSpeedInc); 
    setTimeout(function updateLevel() {
        levelEl.innerHTML = `Level: ${level}`;
    }, 2000);
}

function adjustWormSpeed() {
    wormSpeed = newSpeed;
    resetMoveInterval();
}

function resetMoveInterval() {
    if (moveInterval) clearInterval(moveInterval);
    moveInterval = setInterval(moveWorm, wormSpeed);
}

function gameOver() {

}

/*------------------------- EVENT HANDLEFRS -------------------------*/

function changeDirection() {

}

function pauseGame() {

}