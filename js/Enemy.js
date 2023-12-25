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
//All enemies are put in a parent container which moves down with each hit to the wall
export class Enemy {
  //Type may be added in the future
  #element;
  constructor(container, style, type, enemiesInRow) {
    this.enemiesInRow = enemiesInRow;
    this.#element = this.#createEnemy(container, style);
    this.width = this.#element.offsetWidth;
    this.height = this.#element.offsetHeight;
    this.container = container;
    this.movementDirection = "right";
    //console.log(this.left, this.width, this.height);
    //console.log(enemiesInRow);
  }

  get left() {
    return this.#element.offsetLeft;
  }
  get top() {
    return this.#element.offsetTop;
  }
  get element() {
    return this.#element;
  }
  #createEnemy(container, style) {
    let enemiesRow = document.createElement("div");
    enemiesRow.classList.add('enemiesRow');
    enemiesRow.style.border = "1px solid red";
    enemiesRow.style.position = "relative";
    enemiesRow.style.display = "flex";
    enemiesRow.style.justifyContent = "space-between";
    enemiesRow.style.width = "70%";
    let enemy = document.createElement("div");
    enemy.style = style;
    enemy.style.display = "inline-block";
    enemy.classList.add("enemies");
    //console.log(this.enemiesInRow);
    for (let i = 0; i < this.enemiesInRow; i++) {
      enemiesRow.appendChild(enemy.cloneNode(true));
    }

    container.appendChild(enemiesRow);
    return enemiesRow;
  }
  #moveEnemiesDown() {
    let currentTop = parseInt(this.#element.style.top) || 0;
    this.#element.style.top = currentTop + 5 + "px";
    //console.log(this.#element);
    // console.log(this.#element);
  }

  horizontalMovement() {
    // If element reaches the end of container, move it back to the beginning
    if (this.movementDirection === "right") {
      this.#element.style.left = `${this.left + 5}px`;
      if (this.left + this.width >= this.container.offsetWidth) {
        this.movementDirection = "left";
        this.#moveEnemiesDown();
      }
    } else {
      this.#element.style.left = `${this.left - 5}px`;
      // console.log(this.#element.offsetLeft);
      if (this.left <= 0) {
        this.movementDirection = "right";
        this.#moveEnemiesDown();
      }
    }
  }

  destroy(container) {
    container.removeChild(this.element);
  }
}
