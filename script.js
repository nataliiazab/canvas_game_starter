console.log("Javascript is running");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

//DRAW A RECTANGLE
let playerX = WIDTH / 2 - 30;
let playerY = HEIGHT - 30;
ctx.fillStyle = "yellow";
ctx.fillReact(playerX, playerY, 60, 30); //left,top,width,height

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.spawnTime = Date.now();
  }

  draw() {
    ctx.fillStyle = "red";
    //find new current position
    fillReact(this.x, this.y, 10, 10);
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    const bullet = new Bullet(playerX + 25, playerY - 10);
    bullet.draw();
  }
});

function display() {
  //find the current time
  const tome = Date.now()
  //update positions

  //draw everything
  //call itself again later
}

display();
