console.log("Javascript is running");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Width and height of the canvas
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Player's position and speed.
let playerX = WIDTH / 2 - 30; // Initial horizontal position of the player
const playerY = HEIGHT - 30; // Vertical position of the player
const playerWidth = 60;
const playerHeight = 30;
const playerSpeed = 5; // Define how fast the player can move

// Bullet speed (pixels per millisecond)
const bulletSpeed = 0.01;

// Create an array to store bullets fired by the player
const bullets = [];

// Create an array to store green squares
const greenSquares = [];

// Function to draw the player's yellow rectangle
function drawPlayer() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(playerX, playerY, playerWidth, playerHeight); // Draw the yellow rectangle
}

// Function to draw green squares and move them
function drawGreenSquares() {
  for (let i = 0; i < greenSquares.length; i++) {
    const greenSquare = greenSquares[i];
    ctx.fillStyle = greenSquare.color;
    ctx.fillRect(
      greenSquare.x,
      greenSquare.y,
      greenSquare.width,
      greenSquare.height
    );
    greenSquare.y += 2; // Move green squares down
  }
}

// Function to check for collision between bullets and green squares
function checkBulletCollision() {
  for (let i = 0; i < bullets.length; i++) {
    const bullet = bullets[i];
    for (let j = 0; j < greenSquares.length; j++) {
      const greenSquare = greenSquares[j];
      if (
        bullet.x + 10 >= greenSquare.x &&
        bullet.x <= greenSquare.x + greenSquare.width &&
        bullet.y <= greenSquare.y + greenSquare.height
      ) {
        // Remove the green square and the bullet upon collision
        greenSquares.splice(j, 1);
        bullets.splice(i, 1);
        i--; // Decrement i to check the next bullet
        break; // Break the inner loop
      }
    }
  }
}

// Function to add a green square to the game
function addGreenSquare() {
  const x = Math.random() * (WIDTH - 30); // Random horizontal position
  const greenSquare = {
    x: x,
    y: 0,
    width: 30,
    height: 30,
    color: "green",
    id: greenSquares.length,
  };
  greenSquares.push(greenSquare);
}

// Add an event listener to detect when the spacebar is pressed to fire a bullet
document.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    const bullet = {
      x: playerX + playerWidth / 2 - 5,
      y: playerY - 10,
      spawnTime: Date.now(),
    };
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

  drawGreenSquares(); // Draw green squares and move them
  checkBulletCollision(); // Check for collision between bullets and green squares

  // Draw player
  drawPlayer(); // Draw the player's yellow rectangle

  // Draw and update bullets
  ctx.fillStyle = "red";
  for (let i = 0; i < bullets.length; i++) {
    const bullet = bullets[i];
    const deltaTime = time - bullet.spawnTime; // Time since creation
    const y = bullet.y - bulletSpeed * deltaTime; // Bullet's vertical position
    ctx.fillRect(bullet.x, y, 10, 10); // Draw the red bullet
    bullet.y = y; // Update bullet position
  }

  // Request the next frame for animation
  requestAnimationFrame(display);
}

// Start the animation loop and add green squares at intervals
display();
setInterval(addGreenSquare, 5000); // Add a green square every 5 seconds
