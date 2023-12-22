//on load
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".main-container");
  const enemy = new Enemy(container, {}, "type");
  const enemy2 = new Enemy(container, {}, "type");

  const enemy3 = new Enemy(container, {}, "type");

  setInterval(() => {
    //TODO: Should be moved to game function DEVELOPMENT
    enemy.horizontalMovement(container);
    enemy2.horizontalMovement(container);
    enemy3.horizontalMovement(container);
  }, 100);
});
