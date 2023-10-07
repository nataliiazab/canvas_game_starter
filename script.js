console.log("Javascript is running!!");
let score = 0;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Width and height of the canvas
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Player's position and speed
let playerX = WIDTH / 2 - 30; // Initial horizontal position of the player
const playerY = HEIGHT - 30; // Vertical position of the player
const playerWidth = 60;
const playerHeight = 30;
const playerSpeed = 18; // how fast the player can move

const bulletSpeed = 0.01; // Bullet speed (pixels per millisecond)

// Array to store bullets fired by the player
const bullets = [];

// Array to store green squares
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
    greenSquare.y += 2; // Move green squares down, to change speed for levels later
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

        // Increase the score
        score += 10; // score increment
        document.getElementById("score").textContent = `Score: ${score}`; // Update the score display
        break; // Break the inner loop
      }
    }
  }
}

// Function to check for game over when a green square touches the bottom of the canvas
function checkGameOver() {
  for (let i = 0; i < greenSquares.length; i++) {
    const greenSquare = greenSquares[i];
    if (greenSquare.y + greenSquare.height >= HEIGHT) {
      // Green square reached the bottom
      gameOver();
      return;
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

let animationId;

// Function to display everything on the canvas
function display() {
  const time = Date.now(); // Get the current time

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  drawGreenSquares(); // Draw green squares and move them
  checkBulletCollision(); // Check for collision between bullets and green squares
  checkGameOver(); // Check for game over condition

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

  // Request the next frame for animation and store the animation frame ID
  animationId = requestAnimationFrame(display);
}

// Function to stop the game and display "Game Over"
function gameOver() {
  cancelAnimationFrame(animationId); // Stop the animation loop
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  ctx.fillStyle = "red";
  ctx.font = "30px Arial";
  ctx.fillText("Game Over", WIDTH / 2 - 80, HEIGHT / 2);
}

// Start the animation loop and add green squares at intervals
const addGreenSquareInterval = setInterval(addGreenSquare, 5000); // Add a green square every 5 seconds
display(); // Start the animation loop
