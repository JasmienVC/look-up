import Meadow from './meadow.js';
import Man from './man.js';
import Poop from './poop.js';

export default class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.status = "";
    this.level = 1;
    this.poops = [];
  }

  setup() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.meadow = new Meadow(this);
    this.man = new Man(this);
  }

  start() {
    this.setup();
    this.poops.push(new Poop(this));
    this.run();
  }

  run() {
    this.update();
    if (this.status !== "lost") {
      requestAnimationFrame(() => this.run());
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  update() {
    this.clear();
    this.meadow.draw();
    this.man.draw();
    this.poops.forEach(poop => poop.update());
    this.printLevel();
    this.checkGameOver();
  }

  printLevel() {
    this.ctx.fillStyle = "black";
    this.ctx.font = "30px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText(`Level ${this.level}`, 75, 50);
  }

  printPlayAgain() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "30px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText(`Level ${this.level}`, 75, 50);
    this.ctx.font = "60px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "Press enter to play again",
      this.canvas.width / 2,
      this.canvas.height - 100
    );
  }

  levelUp() {
    this.level += 1;
    this.poops.push(new Poop(this));
  }

  checkGameOver() {
    const gameOver = new Image();
    gameOver.src = "./images/gameover.jpg";

    this.poops.some(poop => {
      if (poop.y >= this.man.y && poop.x + 15 >= this.man.x + 120 && this.man.x + 240 >= poop.x - 15) {
        this.status = "lost";
        gameOver.addEventListener("load", () => {
          this.poops.forEach(poop => clearInterval(poop.interval));
          this.clear();
          this.ctx.drawImage(gameOver, 0, 0, this.canvas.width, this.canvas.height);
          clearInterval(this.man.level);
          this.printPlayAgain();
        });
        return true; // Stop the loop once the game is over
      }
      return false;
    });
  }
}
