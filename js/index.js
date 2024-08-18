import Game from './game.js';
import Poop from './poop.js';

const game = new Game();
game.start();

document.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowLeft":
      if (game.man.x > -125 && game.status !== "lost") {
        game.man.moveLeft();
        game.update();
      }
      break;
    case "ArrowRight":
      if (game.man.x < game.canvas.width - 300 && game.status !== "lost") {
        game.man.moveRight();
        game.update();
      }
      break;
    case "Enter":
      if (game.status === "lost") {
        game.level = 1;
        game.status = "";
        game.poops = [new Poop(game)]; // Reset poops
        game.man.level = setInterval(() => game.levelUp(), 10000);
        game.run(); // Restart the game loop
      }
      break;
  }
});
