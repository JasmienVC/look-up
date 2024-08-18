export default class Meadow {
  constructor(game) {
    this.game = game;
    this.img = new Image();
    this.img.src = "./images/meadow.jpg";

    this.img.addEventListener("load", () => {
      this.draw();
      this.game.update();
    });
  }

  draw() {
    this.game.ctx.drawImage(this.img, 0, 0, this.game.canvas.width, this.game.canvas.height);
  }
}
