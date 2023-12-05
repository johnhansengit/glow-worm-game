/*------------------------- SET STATS -------------------------*/

function setLevel(val) {
    level = val;
    levelEl.innerHTML = `Level: ${val}`;
}

function setHighScore(val) {
    highScore = val;
    highScoreEl.innerText = val;
}

function setCurrentScore(val) {
    currentScore = val;
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
    playerName = document.getElementById('player-name').value;
    leaderboardEl.innerHTML = '<tr><th>Rank</th><th>Player</th><th>Level</th><th>Time</th><th>Score</th></tr>';
    startCont.style.display = 'none';
    restartCont.style.display = 'none';
    gameIsInPlay = true;
    startScreen = false;
    numOfFood = STARTING_NUM_OF_FOOD;
    resetStats();
    renderGrid();
    initWorm();
    renderWorm();
    renderFood();
    moveWorm();
    runTimer();
    backgroundMusic.play();
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
    timeNow = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    return timeNow;
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
        newWormId = `x${newHeadX}y${newHeadY}`

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
        } else if (document.getElementById(newWormId).innerHTML) {
            eatFood();

            // Otherwise, move normally
        } else {
            // Remove and de-class last segment
            let lastSegId = wormTail.pop();
            let lastx = lastSegId[0];
            let lasty = lastSegId[1];
            let lastSeg = document.getElementById(`x${lastx}y${lasty}`)
            lastSeg.classList.remove('worm-tail');

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
    playSoundEffect(eatSound, 2.4, 500);
    let foodEaten = document.getElementById(newWormId);
    let foodEatenClasses = [...foodEaten.classList];

    Food.allFoods.forEach((food) => {
        if (foodEatenClasses.includes(food.class)) {

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
    document.getElementById(newWormId).innerHTML = '';
    document.getElementById(newWormId).classList.remove(`${food.class}`)
    renderFood();

    // Add new segment at current head position (before moving the head)
    wormTail.unshift([...wormHeadCoords]);

    // Clear justAte
    setTimeout(() => {
        justAte = null;
    }, 750);
}

function playSoundEffect(soundEffect, atTime, timeOut) {
    soundEffect.currentTime = atTime;
    soundEffect.play();
    setTimeout(function () {
        soundEffect.pause();
        soundEffect.currentTime = atTime;
    }, timeOut);
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

function updateLeaderBoard(player, level, time, score) {
    leaderBoardScores = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderBoardScores.push({player, level, time, score});
    localStorage.setItem('leaderboard', JSON.stringify(leaderBoardScores));
}

function displayLeaderBoard() {
    leaderBoardScores.sort((a, b) => {
        // Sort by score
        let scoreDifference = b.score - a.score;
        if (scoreDifference !== 0) {
            return scoreDifference;
        }

        // If scores are the same, sort by time
        return b.time - a.time;
    });
    
    let topTen = leaderBoardScores.slice(0,MAX_LEADERBOARD);

    let latestScores = document.querySelectorAll('.latest-score');
    latestScores.forEach(el => el.classList.remove('latest-score'));

    let isLatestScoreAssigned = false;

    topTen.forEach((score, idx) => {
        let scoreDisplay = document.createElement('tr')

        scoreDisplay.innerHTML = 
            `<td>${idx + 1}.</td>
            <td>${score.player}</td>
            <td>lv. ${score.level}</td>
            <td>${score.time}</td>
            <td>${score.score}</td>`;

        if (score.score == highScore && !isLatestScoreAssigned) {
            scoreDisplay.className = 'latest-score';
            isLatestScoreAssigned = true;
        }

        leaderboardEl.appendChild(scoreDisplay);
    });
}

function resetLeaderboard() {
    localStorage.removeItem('leaderboard');
}

function levelUp() {
    level++;
    levelEl.innerHTML = '<span style="color: rgb(161, 249, 127);"><strong>LEVEL UP!</strong></span>';
    playSoundEffect(levelUpSound, 0, 500);
    let newSpeedInc = STARTING_SPEED_CHANGE_INCREMENT * Math.pow(0.8, level - 1);
    adjustWormSpeed(wormSpeed - newSpeedInc);
    setTimeout(function updateLevel() {
        levelEl.innerHTML = `Level: ${level}`;
    }, 3000);
}

function adjustWormSpeed(newSpeed) {
    wormSpeed = newSpeed;
    resetMoveInterval();
}

function resetMoveInterval() {
    if (moveInterval) clearInterval(moveInterval);
    moveInterval = setInterval(moveWorm, wormSpeed);
}

function gameOver() {
    gameIsInPlay = false;
    clearInterval(moveInterval);
    clearInterval(timerInterval);
    playSoundEffect(gameOverSound, 0, 2000);
    backgroundMusic.pause();
    updateLeaderBoard(playerName, level, timeNow, currentScore);
    backgroundMusic.currentTime = 0;
    renderGrid();
    displayLeaderBoard();
    restartCont.style.display = 'flex';
}

/*------------------------- EVENT HANDLERS -------------------------*/

function handleInput(input) {
    const actionInfo = actions[input];
    if (!actionInfo) return;

    const { action, buttonId } = actionInfo;
    action();

    const button = document.getElementById(buttonId);
    if (button) {
        button.classList.add('button-clicked');
        setTimeout(() => button.classList.remove('button-clicked'), 100);
    }
}

function changeDirection(newDirection) {
    // Check if it's a valid direction change (no 180-degree turns)
    if (newDirection[0] !== -wormDirection[0] && newDirection[1] !== -wormDirection[1]) {
        wormDirection = newDirection;
    }
}

function pauseGame() {
    // Check if the game is not already paused
    if (moveInterval) {
        // Clear existing intervals to stop worm movement and timer
        clearInterval(moveInterval);
        clearInterval(timerInterval);

        // Set intervals to null to indicate the game is paused
        moveInterval = null;
        timerInterval = null;

        backgroundMusic.pause();
        pauseBtn.innerText = 'Resume';

    } else {
        // If game is paused, resume the game
        moveWorm();
        runTimer();

        backgroundMusic.play();
        pauseBtn.innerText = 'Pause';
    }
}