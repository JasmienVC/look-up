const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

class Meadow {
  constructor() {
    this.x = 0;
    this.y = 0

    const img = new Image();
    img.src = "./images/meadow.jpg";

    img.addEventListener("load", () => {
      this.img = img;
      this.draw();
    });
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, window.innerWidth, window.innerHeight);
  }
}

class Man {
  constructor() {
    this.x = 0;
    this.y = 390;

    const img = new Image();
    img.src = "./images/man.svg";

    img.addEventListener("load", () => {
      this.img = img;
      this.draw();
      updateCanvas();
    });
  }

  moveLeft() {
    this.x -= 25;
  }
  moveRight() {
    this.x += 25;
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, 400, 300);
  }
}

class Poop {
  constructor() {
    this.x = 20;
    this.y = 20;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 20, 0, Math.PI * 2);
    ctx.fillStyle = "#622711";
    ctx.fill();
    ctx.closePath();
  }
}

const meadow = new Meadow();
const man = new Man();
const poop = new Poop();

document.addEventListener("keydown", e => {
  switch (e.keyCode) {
    case 37:
      man.moveLeft();
      break;
    case 39:
      man.moveRight();
      break;
  }
  updateCanvas();
});

function updateCanvas() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  meadow.draw();
  man.draw();
  poop.draw();
}
