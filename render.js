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
    wormHead = document.getElementById(`x${wormHeadCoords[0]}y${wormHeadCoords[1]}`);
    wormHead.className = 'worm-head';
    renderGlow(wormHeadCoords);
}

function renderGlow(wormHeadCoords) {
    document.querySelectorAll('.glow').forEach(el => el.classList.remove('glow'));

    let adjacentIds = getAdjacentSquares(wormHeadCoords);
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
    // Clear previous tail classes
    document.querySelectorAll('.worm-tail').forEach(el => el.classList.remove('worm-tail'));

    wormTail.forEach((tailSegId) => {
        let [x, y] = tailSegId;
        let tailSeg = document.getElementById(`x${x}y${y}`);
        if (tailSeg) {
            tailSeg.className = 'worm-tail';
        }
    });
}



/*------------------------- FOOD -------------------------*/