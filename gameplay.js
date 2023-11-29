/*------------------------- GAMEPLAY FUNCTIONS -------------------------*/

// Set Stats

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