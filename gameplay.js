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

