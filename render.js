/*------------------------- RENDER FUNCTIONS -------------------------*/

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