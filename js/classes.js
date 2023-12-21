//Enemy class
//Test css class
let style = {
  url: "./img/enemy.png",
  height: "100px",
  width: "100px",
  "background-image": `url('./img/enemy.png')`,
  "background-repeat": "no-repeat",
  "background-size": "cover",
};
class Enemy {
  //Type may be added in the future
  constructor(container, style, type) {
    this.element = this.#createEnemy(container, style);
  }

  #createEnemy(container, style) {
    let enemy = document.createElement("div");
    enemy.style = style;
    container.appendChild(enemy);
    return enemy;
  }
  movement(container) {
    //if element reaches the end of the screen, stop the movement
    if (
      this.element.offsetLeft >=
      container.offsetWidth - this.element.offsetWidth
    )
      return;
    else this.element.style.left = `${this.element.offsetLeft + 5}px`;
  }
  destroy(container) {
    container.removeChild(this.element);
  }
}
