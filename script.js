//your code here
// Game Constants
const GAME_CONTAINER = document.getElementById("gameContainer");
const GAME_WIDTH = 400;
const GAME_HEIGHT = 400;
const PIXEL_SIZE = 40;
const ROWS = GAME_HEIGHT / PIXEL_SIZE;
const COLS = GAME_WIDTH / PIXEL_SIZE;
const TOTAL_PIXELS = ROWS * COLS;

// Snake Constants
const INITIAL_LENGTH = 3;
const INITIAL_ROW = 20;
const INITIAL_COL = 1;
const INITIAL_DIRECTION = "right";

// Game Variables
let snake = [];
let direction = INITIAL_DIRECTION;
let foodPixel;
let score = 0;

// Generate Game Pixels
for (let i = 0; i < TOTAL_PIXELS; i++) {
  const pixel = document.createElement("div");
  pixel.classList.add("pixel");
  pixel.setAttribute("id", `pixel${i}`);
  GAME_CONTAINER.appendChild(pixel);
}

// Generate Snake
for (let i = 0; i < INITIAL_LENGTH; i++) {
  const snakePixel = document.getElementById(`pixel${i}`);
  snakePixel.classList.add("snakeBodyPixel");
  snake.push(snakePixel);
}

// Generate Food
function generateFood() {
  const randomIndex = Math.floor(Math.random() * TOTAL_PIXELS);
  const foodPixel = document.getElementById(`pixel${randomIndex}`);
  if (foodPixel.classList.contains("snakeBodyPixel") || foodPixel.classList.contains("food")) {
    generateFood();
  } else {
    foodPixel.classList.add("food");
  }
}

generateFood();

// Game Loop
setInterval(() => {
  // Move Snake
  const head = snake[snake.length - 1];
  let newHead;
  let newRow = parseInt(head.getAttribute("id").slice(5, 7));
  let newCol = parseInt(head.getAttribute("id").slice(7));
  if (direction === "up") {
    newRow = (newRow - 1 + ROWS) % ROWS;
    newHead = document.getElementById(`pixel${newRow}${newCol}`);
  } else if (direction === "down") {
    newRow = (newRow + 1) % ROWS;
    newHead = document.getElementById(`pixel${newRow}${newCol}`);
  } else if (direction === "left") {
    newCol = (newCol - 1 + COLS) %
