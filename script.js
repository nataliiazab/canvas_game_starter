console.log("Javascript is running");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContex("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

//DRAW A RECTANGLE

ctx.fillStyle = "yellow";
ctx.fillReact(WIDTH / 2 - 30, HEIGHT - 30, 60, 30); //left,top,width,height

document.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    const bullet = new Bullet(x, y);
  }
});
