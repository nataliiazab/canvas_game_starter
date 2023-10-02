console.log("Javascript is running");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// width and height of the canvas
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

//  player's position and speed.
let playerX = WIDTH / 2 - 30; // initial horizontal position of the player
const playerY = HEIGHT - 30; //  vertical position of the player
const playerWidth = 60;
const playerHeight = 30;
const playerSpeed = 5; // Define how fast the player can move

// Function to draw the player's yellow rectangle
function drawPlayer() {
  ctx.fillStyle = "yellow"; 
  ctx.fillRect(playerX, playerY, playerWidth, playerHeight); // Draw the yellow rectangle
}

// class for bullets fired by the player
class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.spawnTime = Date.now(); // Record the time when the bullet was created
  }

  // Method to draw a red bullet
  draw(time) {
    ctx.fillStyle = "red"; 
    const timePassed = (time - this.spawnTime) / 1000; // time since creation
    const y = this.y - timePassed * 100; // bullet's vertical position
    ctx.fillRect(this.x, y, 10, 10); // Draw the red bullet
  }
}

// Create an array to store bullets fired by the player
const bullets = [];

// Create an array to store green squares
const greenSquares = [];

// Function to add a green square to the game
function addGreenSquare() {
  const x = Math.random() * (WIDTH - 30); // Random horizontal position
  const greenSquare = { x: x, y: 0, width: 30, height: 30 };
  greenSquares.push(greenSquare);
}

// Add an event listener to detect when the spacebar is pressed to fire a bullet
document.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    const bullet = new Bullet(playerX + playerWidth / 2 - 5, playerY - 10); // Create a new bullet
    bullets.push(bullet); // Add the bullet to the array
  }
});

// Add an event listener to detect arrow key presses to move the player left or right
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && playerX > 0) {
    playerX -= playerSpeed; // Move the player left
  } else if (event.key === "ArrowRight" && playerX < WIDTH - playerWidth) {
    playerX += playerSpeed; // Move the player right 
  }
});

// Function to display everything on the canvas
function display() {
  const time = Date.now(); // Get the current time

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  // Draw green squares.
  ctx.fillStyle = "green"; 
  greenSquares.forEach((greenSquare) => {
    ctx.fillRect(
      greenSquare.x,
      greenSquare.y,
      greenSquare.width,
      greenSquare.height
    );
    greenSquare.y += 2; // Move green squares down
  });

  // Draw player and bullets
  drawPlayer(); // Draw the player's yellow rectangle
  bullets.forEach((bullet) => bullet.draw(time)); // Draw all bullets

  // Request the next frame for animation
  requestAnimationFrame(display);
}

// Start the animation loop and add green squares at intervals
display();
setInterval(addGreenSquare, 5000); // Add a green square every 5 sec
