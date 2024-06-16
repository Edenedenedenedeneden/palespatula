
function preload() {

}
let grid;
let rows, cols;
let cellSize = 10;
let paletteColors = ['green', 'blue', 'pink', 'yellow', 'orange'];
let selectedColor = 'green';
let paletteHeight =40;
let flowerpotHeight = 190; // Increased the height of the flowerpot
let flowerpotWidth = 170; // Width of the flowerpot
let randomizeButtonWidth, randomizeButtonHeight, randomizeButtonX, randomizeButtonY;

function setup() {
  createCanvas(600,500);
  rows = (height - paletteHeight - flowerpotHeight) / cellSize;
  cols = width / cellSize;
  grid = create2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = color(255); // Initialize all cells as white
    }
  }

  randomizeButtonWidth = 150;
  randomizeButtonHeight = 30;
  randomizeButtonX = (width - randomizeButtonWidth) / 2;
  randomizeButtonY = height - paletteHeight - flowerpotHeight + (flowerpotHeight - randomizeButtonHeight) / 2; // Place the button in the middle of the flowerpot
}

function draw() {
  
  background(255,20);
  drawGrid();
  drawPalette();
  drawFlowerpot();
  drawRandomizeButton();
}

function drawGrid() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      fill(grid[i][j]);
      stroke(200);
      rect(i * cellSize, j * cellSize, cellSize, cellSize);
    }
  }
}

function drawPalette() {
  let paletteY = height - paletteHeight;
  for (let i = 0; i < paletteColors.length; i++) {
    fill(paletteColors[i]);
    rect(i * (width / paletteColors.length), paletteY, width / paletteColors.length, paletteHeight);
  }
}

function drawFlowerpot() {
  fill('brown');
  let flowerpotX = (width - flowerpotWidth) / 2;
  rect(flowerpotX, height - paletteHeight - flowerpotHeight, flowerpotWidth, flowerpotHeight);
}

function drawRandomizeButton() {
  fill(200);
  rect(randomizeButtonX, randomizeButtonY, randomizeButtonWidth, randomizeButtonHeight);
  fill(0);
  textAlign(CENTER, CENTER);
  text('Randomize Colors', randomizeButtonX + randomizeButtonWidth / 2, randomizeButtonY + randomizeButtonHeight / 2);
}

function mousePressed() {
  let paletteY = height - paletteHeight;
  let flowerpotY = height - paletteHeight - flowerpotHeight;

  // Check if the click is within the palette
  if (mouseY > paletteY) {
    let index = floor(mouseX / (width / paletteColors.length));
    if (index >= 0 && index < paletteColors.length) {
      selectedColor = paletteColors[index];
    }
  } else if (mouseY < flowerpotY) { 
    // Check if the click is within the grid
    let col = floor(mouseX / cellSize);
    let row = floor(mouseY / cellSize);
    if (col >= 0 && col < cols && row >= 0 && row < rows) {
      if (grid[col][row].toString() === color(selectedColor).toString()) {
        grid[col][row] = color(255); // Erase the color
      } else {
        grid[col][row] = color(selectedColor);
      }
    }
  } else if (mouseX > randomizeButtonX && mouseX < randomizeButtonX + randomizeButtonWidth &&
             mouseY > randomizeButtonY && mouseY < randomizeButtonY + randomizeButtonHeight) {
    randomizePaletteColors();
  }
}

function randomizePaletteColors() {
  let oldColors = [...paletteColors];
  for (let i = 1; i < paletteColors.length; i++) { // Skip the first color (green)
    paletteColors[i] = color(random(255), random(180), random(255));
  }

  // Update the grid colors to match the new palette colors
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let currentColor = grid[i][j];
      for (let k = 1; k < oldColors.length; k++) { // Skip the first color (green)
        if (currentColor.toString() === color(oldColors[k]).toString()) {
          grid[i][j] = color(paletteColors[k]);
        }
      }
    }
  }
}

function create2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < cols; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}
