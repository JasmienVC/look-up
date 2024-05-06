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
      updateCanvas();
    });
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, window.innerWidth, window.innerHeight);
  }
}

class Man {
  constructor() {
    this.x = 0;
    this.y = 500;

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
    this.x = Math.random() * canvas.width;
    this.y = 0;
    this.vy = 1;
    this.gravity = Math.random() / 4;
    this.interval = setInterval(fallingPoop, 50);
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
    ctx.fillStyle = "#622711";
    ctx.fill();
    ctx.closePath();
  }
}

const meadow = new Meadow();
const man = new Man();
const poops = [];

for (let i = 0; i < 3; i++) {
  poops.push(new Poop());
}

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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  meadow.draw();
  man.draw();
  checkGameOver();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function fallingPoop() {
  updateCanvas();
  poops.forEach(function(poop) {
    poop.draw();
    poop.y += poop.vy;
    poop.vy += poop.gravity;

    if (poop.y > canvas.height) {
      poop.x = Math.random() * canvas.width;
      poop.y = 0;
      poop.vy = 1;
      poop.gravity = Math.random() / 4;
    }
  });
}

function checkGameOver() {
  const gameOver = new Image();
  gameOver.src = "./images/gameover.jpg";

  poops.some(function (poop) {
    if (poop.y >= man.y && poop.x + 15 >= man.x + 145 && man.x + 255 >= poop.x - 15) {
      gameOver.addEventListener("load", () => {
        poops.forEach(poop => clearInterval(poop.interval));
        clearCanvas();
        ctx.drawImage(gameOver, 0, 0, canvas.width, canvas.height);
      })
    }
  });
}
