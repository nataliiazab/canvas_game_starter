console.log("Javascript is running, Yeah! :)");

let score = 0;
let record = localStorage.getItem("record") || 0; // Keep player's record in the browser between reloads

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

const bulletSpeed = 4; // Bullet speed (pixels per frame)

// Function to update and display the score
function updateScore() {
  document.getElementById("score").textContent = `Score: ${score}`;
  document.getElementById("record").textContent = `Record: ${record}`; // Update the record display
}
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
    greenSquare.y += 2; // Move green squares down, adjust the speed for levels in the future
  }
}

// Function to check for collision between bullets and green squares using the SAT method
function checkBulletCollision() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    const bullet = bullets[i];
    for (let j = greenSquares.length - 1; j >= 0; j--) {
      const greenSquare = greenSquares[j];

      // Calculate the half-widths and half-heights of the rectangles
      const halfBulletWidth = 5;
      const halfBulletHeight = 5;
      const halfGreenWidth = greenSquare.width / 2;
      const halfGreenHeight = greenSquare.height / 2;

      // Calculate the centers of the rectangles
      const bulletCenterX = bullet.x + halfBulletWidth;
      const bulletCenterY = bullet.y + halfBulletHeight;
      const greenCenterX = greenSquare.x + halfGreenWidth;
      const greenCenterY = greenSquare.y + halfGreenHeight;

      // Calculate the minimum distances between centers before collision
      const dx = Math.abs(bulletCenterX - greenCenterX);
      const dy = Math.abs(bulletCenterY - greenCenterY);

      if (
        dx <= halfBulletWidth + halfGreenWidth &&
        dy <= halfBulletHeight + halfGreenHeight
      ) {
        // Collision detected, remove the green square and the bullet
        greenSquares.splice(j, 1);
        bullets.splice(i, 1);

        // Increase the score
        score += 10;
        document.getElementById("score").textContent = `Score: ${score}`;

        // Break to avoid checking further collisions for this bullet
        break;
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
    bullet.y -= bulletSpeed; // Update bullet position
    ctx.fillRect(bullet.x, bullet.y, 10, 10); // Draw the red bullet
  }
  // Update and display the score
  updateScore();

  // Request the next frame for animation
  requestAnimationFrame(display);
}

let animationId;

// Function to stop the game
function gameOver() {
  cancelAnimationFrame(animationId); // Stop the animation loop
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  ctx.fillStyle = "red";
  ctx.font = "30px Arial";
  ctx.fillText(`Game Over`, WIDTH / 2 - 80, HEIGHT / 2);
  // Update and display the high score
  if (score > record) {
    record = score;
    localStorage.setItem("record", record); // Save the new record in localStorage
  }

  // Update and display the score
  updateScore();
}

// Start the animation loop
display();
// Add green squares at intervals
const addGreenSquareInterval = setInterval(addGreenSquare, 5000); // Add a green square every 5 seconds

// use this for restart button:
// // Reset the score
// score = 0;
// document.getElementById("score").textContent = `Score: ${score}`;
