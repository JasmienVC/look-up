const game = {
  canvas: document.getElementById("canvas"),
  status: "",
  level: 1,
  poops: [],
  setup: function () {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext("2d");
    this.meadow = new Meadow();
    this.man = new Man();
  },
  start: function () {
    this.setup();
    this.poops.push(new Poop());
  },
  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  update: function () {
    this.clear();
    this.meadow.draw();
    this.man.draw();
    this.printLevel();
    checkGameOver();
  },
  printLevel: function () {
    this.ctx.fillStyle = "black";
    this.ctx.font = "30px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText(`Level ${  this.level}`, 75, 50);
  },
  printPlayAgain: function () {
    this.ctx.fillStyle = "white";
    this.ctx.font = "30px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText(`Level ${this.level}`, 75, 50);
    this.ctx.font = "60px Arial";
    this.ctx.textAlign = "center"
    this.ctx.fillText(
      "Press enter to play again", this.canvas.width / 2, this.canvas.height - 100
    );
  },
}

class Meadow {
  constructor() {
    const img = new Image();
    img.src = "./images/meadow.jpg";

    img.addEventListener("load", () => {
      this.img = img;
      this.draw();
      game.update();
    });
  }

  draw() {
    game.ctx.drawImage(this.img, 0, 0, game.canvas.width, game.canvas.height);
  }
}

class Man {
  constructor() {
    this.x = 0;
    this.y = game.canvas.height - 300;
    this.level = setInterval(levelUp, 10000)

    const img = new Image();
    img.src = "./images/man.svg";

    img.addEventListener("load", () => {
      this.img = img;
      this.draw();
      game.update();
    });
  }

  moveLeft() {
    this.x -= 25;
  }
  moveRight() {
    this.x += 25;
  }

  draw() {
    game.ctx.drawImage(this.img, this.x, this.y, 400, 300);
  }
}

class Poop {
  constructor() {
    this.x = Math.random() * game.canvas.width;
    this.y = 0;
    this.vy = 4;
    this.gravity = Math.random() / 2;
    this.interval = setInterval(fallingPoop, 150);
    const img = new Image();
    img.src = "./images/poop.png";
    img.addEventListener("load", () => {
      this.img = img;
    });
  }

  draw() {
    game.ctx.drawImage(this.img, this.x, this.y, 50, 50);
  }
}

game.start();

document.addEventListener("keydown", e => {
  switch (e.keyCode) {
    case 37:
      if(game.man.x > -125 && game.status !== "lost") {
        game.man.moveLeft();
        game.update();
      }
      break;
    case 39:
      if(game.man.x < game.canvas.width - 300 && game.status !== "lost") {
        game.man.moveRight();
        game.update();
      }
      break;
    case 13:
      game.level = 1;
      game.status = "";
      game.poops.forEach(poop => game.poops.splice(poop));
      game.poops.push(new Poop());
      game.man.level = setInterval(levelUp, 10000)
      game.update();
      break;
  }
});

function fallingPoop() {
  game.update();
  game.poops.forEach(function(poop) {
    poop.draw();
    poop.y += poop.vy;
    poop.vy += poop.gravity;

    if (poop.y > game.canvas.height) {
      poop.x = Math.random() * game.canvas.width;
      poop.y = 0;
      poop.vy = 4;
      poop.gravity = Math.random() / 2;
    }
  });
}

function checkGameOver() {
  const gameOver = new Image();
  gameOver.src = "./images/gameover.jpg";

  game.poops.some(function (poop) {
    if (poop.y >= game.man.y && poop.x + 15 >= game.man.x + 145 && game.man.x + 255 >= poop.x - 15) {
      game.status = "lost"
      gameOver.addEventListener("load", () => {
        game.poops.forEach(poop => clearInterval(poop.interval));
        game.clear();
        game.ctx.drawImage(gameOver, 0, 0, game.canvas.width, game.canvas.height);
        clearInterval(clearInterval(game.man.level));
        game.printPlayAgain();
      })
    }
  });
}

function levelUp() {
  game.level += 1;
  game.poops.push(new Poop());
  game.update();
}
