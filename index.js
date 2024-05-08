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
    this.level = setInterval(levelUp, 10000)


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
    this.vy = 4;
    this.gravity = Math.random() / 2;
    this.interval = setInterval(fallingPoop, 150);
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
poops.push(new Poop());

document.addEventListener("keydown", e => {
  switch (e.keyCode) {
    case 37:
      if(man.x > -125 && gameStatus !== "lost") {
        man.moveLeft();
        updateCanvas();
      }
      break;
    case 39:
      if(man.x < 1000 && gameStatus !== "lost") {
        man.moveRight();
        updateCanvas();
      }
      break;
    case 13:
      updateCanvas();
      level = 1;
      gameStatus = "";
      poops.forEach(poop => poops.splice(poop));
      poops.push(new Poop());
      break;
  }
});

function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  meadow.draw();
  man.draw();
  printLevel();
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
      poop.vy = 4;
      poop.gravity = Math.random() / 2;
    }
  });
}

let gameStatus = ""

function checkGameOver() {
  const gameOver = new Image();
  gameOver.src = "./images/gameover.jpg";

  poops.some(function (poop) {
    if (poop.y >= man.y && poop.x + 15 >= man.x + 145 && man.x + 255 >= poop.x - 15) {
      gameStatus = "lost"
      gameOver.addEventListener("load", () => {
        poops.forEach(poop => clearInterval(poop.interval));
        clearCanvas();
        ctx.drawImage(gameOver, 0, 0, canvas.width, canvas.height);
        clearInterval(clearInterval(man.level));
        printPlayAgain();
      })
    }
  });
}

let level = 1

function levelUp() {
  level += 1;
  poops.push(new Poop());
  updateCanvas();
}

function printLevel() {
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  ctx.fillText(`Level ${level}`, 50, 50);
}

function printPlayAgain() {
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText(`Level ${level}`, 50, 50);
  ctx.font = "60px Arial";
  ctx.textAlign = "center"
  ctx.fillText("Press enter to play again", canvas.width / 2, 700);
}
