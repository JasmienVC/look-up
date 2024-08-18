export default class Man {
  constructor(game) {
    this.game = game;
    this.x = 0;
    this.y = game.canvas.height - 300;
    this.level = setInterval(() => this.game.levelUp(), 10000);

    this.img = new Image();
    this.img.src = "./images/man.svg";

    this.img.addEventListener("load", () => {
      this.draw();
      this.game.update();
    });
  }

  moveLeft() {
    this.x -= 25;
  }

  moveRight() {
    this.x += 25;
  }

  draw() {
    this.game.ctx.drawImage(this.img, this.x, this.y, 400, 300);
  }
}
