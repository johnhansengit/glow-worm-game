/*------------------------- GRID -------------------------*/

function renderGrid() {
    grid.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${GRID_SIZE}, 1fr)`;
    grid.innerHTML = '';
    for (let y = GRID_SIZE; y >= 1; y--) {
        for (let x = 1; x <= GRID_SIZE; x++) {
            const gridSquare = document.createElement('div');
            gridSquare.id = `x${x}y${y}`;
            grid.appendChild(gridSquare);
        }
    }
}


/*------------------------- WORM -------------------------*/

function renderWorm() {
    renderWormHead();
    renderWormTail();
}

function renderWormHead() {
    wormHead = document.getElementById(`x${wormHeadId[0]}y${wormHeadId[1]}`);
    wormHead.className = 'worm-head';
    renderGlow(wormHeadId);
}

function renderGlow(wormHeadId) {
    document.querySelectorAll('.glow').forEach(el => el.classList.remove('glow'));

    let adjacentIds = getAdjacentSquares(wormHeadId);
    adjacentIds.forEach(id => {
        let square = document.getElementById(id);
        if (square && !square.classList.contains('worm-tail')) {
            square.classList.add('glow');
        }
    });
}

function getAdjacentSquares([x, y]) {
    let arrAdjacentSquares = [];

    for (let xOffset = -1 * glowArea; xOffset <= glowArea; xOffset++) {
        for (let yOffset = -1 * glowArea; yOffset <= glowArea; yOffset++) {
            // Skip the center square
            if (xOffset === 0 && yOffset === 0) continue;

            arrAdjacentSquares.push(`x${x + xOffset}y${y + yOffset}`);
        }
    }

    return arrAdjacentSquares;
}

function renderWormTail() {

}



/*------------------------- FOOD -------------------------*/