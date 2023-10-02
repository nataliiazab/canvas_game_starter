// This line logs a message to the browser console.
console.log("Javascript is running");

// Get a reference to the HTML canvas element and create a 2D drawing context.
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Define constants for the width and height of the canvas.
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Initialize variables for the player's position and speed.
let playerX = WIDTH / 2 - 30; // Set the initial horizontal position of the player.
let playerY = HEIGHT - 30; // Set the initial vertical position of the player.
const playerSpeed = 5; // Define how fast the player can move.

// Function to draw the player's yellow rectangle and the green square on top of it.
function drawPlayer() {
  ctx.fillStyle = "yellow"; // Set the fill color to yellow.
  ctx.fillRect(playerX, playerY, 60, 30); // Draw the yellow rectangle.
}

// Define a class for bullets fired by the player.
class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.spawnTime = Date.now(); // Record the time when the bullet was created.
  }

  // Method to draw a red bullet.
  draw(time) {
    ctx.fillStyle = "red"; // Set the fill color to red.
    const timePassed = (time - this.spawnTime) / 1000; // Calculate time since creation.
    const y = this.y - timePassed * 100; // Calculate bullet's vertical position.
    ctx.fillRect(this.x, y, 10, 10); // Draw the red bullet.
  }
}

// Create an array to store bullets fired by the player.
const bullets = [];

// Add an event listener to detect when the spacebar is pressed to fire a bullet.
document.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    const bullet = new Bullet(playerX + 25, playerY - 10); // Create a new bullet.
    bullets.push(bullet); // Add the bullet to the array.
  }
});

// Add an event listener to detect arrow key presses to move the player left or right.
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && playerX > 0) {
    playerX -= playerSpeed; // Move the player left if within canvas bounds.
  } else if (event.key === "ArrowRight" && playerX < WIDTH - 60) {
    playerX += playerSpeed; // Move the player right if within canvas bounds.
  }
});

// Function to display everything on the canvas.
function display() {
  const time = Date.now(); // Get the current time.

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas.

  // Draw player and bullets.
  drawPlayer(); // Draw the player's yellow rectangle and green square.
  bullets.forEach((bullet) => bullet.draw(time)); // Draw all bullets.

  // Request the next frame for animation.
  requestAnimationFrame(display);
}

// Start the animation loop.
display();
