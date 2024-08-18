export default class Poop {
  constructor(game) {
    this.game = game;
    this.x = Math.random() * (game.canvas.width - 50);
    this.y = 0;
    this.vy = 3;
    this.gravity = Math.random() / 2;
    this.interval = setInterval(() => this.fallingPoop(), 150);
    this.img = new Image();
    this.img.src = "./images/poop.png";

    this.img.addEventListener("load", () => {
      this.draw();
      this.game.update();
    });
  }

  fallingPoop() {
    this.y += this.vy;

    if (this.y > this.game.canvas.height) {
      this.reset();
    }
  }

  reset() {
    this.x = Math.random() * (this.game.canvas.width - 50);
    this.y = 0;
    this.vy = 3;
    this.gravity = Math.random() / 2;
  }

  update() {
    this.draw();
    this.fallingPoop();
  }

  draw() {
    this.game.ctx.drawImage(this.img, this.x, this.y, 50, 50);
  }
}
