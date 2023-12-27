import { clearAllBullets } from "./function.js";

//All enemies are put in a parent container which moves down with each hit to the wall
export class Enemy {
  //Type may be added in the future
  #element;
  /**
   * Initializes a new instance of the Enemy class.
   *
   * @param {Element} container - The container element where the enemy will be created.
   * @param {string} style - The CSS style to be applied to the enemy element.
   * @param {number} enemiesInRow - The number of enemies in each row.
   * @param {number} numberOfRows - The number of rows of enemies.
   */
  constructor(container, style, enemiesInRow, numberOfRows) {
    this.enemiesInRow = enemiesInRow;
    this.numberOfRows = numberOfRows;
    this.#element = this.#createEnemy(container, style);
    this.width = this.#element.offsetWidth;
    this.height = this.#element.offsetHeight;
    this.container = container;
    this.movementDirection = "right";
  }
  /**
   * Get the offsetLeft value of the element.
   * @return {number} The offsetLeft value of the element.
   */
  get left() {
    return this.#element.offsetLeft;
  }
  get top() {
    return this.#element.offsetTop;
  }
  /**
   * Get the HTMLElement of the enemy.
   * @return {HTMLDivElement}
   */
  get element() {
    return this.#element;
  }

  /**
   *
   * @param {HTMLElement} container
   * @param {object} style
   * @returns {HTMLElement} The created enemy Row
   */
  #createEnemy(container, style) {
    let enemiesRow = document.createElement("div");
    enemiesRow.classList.add("enemiesRow");
    enemiesRow.style.position = "relative";
    enemiesRow.style.justifyContent = "space-between";
    enemiesRow.style.width = "max-content";
    for (let i = 0; i < this.enemiesInRow; i++) {
      let enemy = document.createElement("div");
      enemy.style.width = "60px";
      enemy.style.height = "60px";
      enemy.style.display = "inline-block";
      enemy.style.position = " relative";
      enemy.style.marginLeft = "40px";
      enemy.classList.add("enemies");
      enemy.classList.add("a");
      enemiesRow.appendChild(enemy);
    }
    for (let i = 0; i < this.numberOfRows; i++) {
      container.appendChild(enemiesRow.cloneNode(true));
    }
    return container;
  }

  #moveEnemiesDown() {
    let currentTop = parseInt(this.#element.style.top) || 0;
    this.#element.style.top = currentTop + 20 + "px";
  }

  addEnemyMovement() {
    if (this.movementDirection === "right") {
      this.#element.style.left = `${this.left + 3}px`;
      if (this.left + this.width >= this.#element.parentElement.offsetWidth) {
        this.movementDirection = "left";
        this.#moveEnemiesDown();
      }
    } else {
      this.#element.style.left = `${this.left - 3}px`;
      // console.log(this.#element.offsetLeft);
      if (this.left <= 0) {
        this.movementDirection = "right";
        this.#moveEnemiesDown();
      }
    }
  }

  /**
   * Determines if the enemy wave is cleared. by checking if there are any
   * enemies left in the container. (iteratively)
   * @memberof Enemy
   * @return {boolean} True if the enemy wave is cleared, false otherwise.
   */
  isEnemyWaveCleared() {
    const enemyDivs = document.querySelectorAll(".enemies");
    if (enemyDivs.length === 0) return true;
    return false;
  }

  /**
   * Resets the enemy wave if it is cleared.
   * Removes the dead enemies from the container.(class removal) and adds enemies class
   * then moves the enemies to the top of the screen.
   * @memberof Enemy
   * @return {void} No return value.
   */
  resetTheEnemyWave() {
    if (this.isEnemyWaveCleared()) {
      const bullets = document.querySelectorAll(".bullet");
      clearAllBullets(bullets);
      const enemyDivs = document.querySelectorAll(".deadEnemy");
      this.container.style.top = "0px";
      for (let i = 0; i < enemyDivs.length; i++) {
        enemyDivs[i].classList.remove("deadEnemy");
        enemyDivs[i].classList.add("enemies");
        enemyDivs[i].classList.add("a");
      }
      this.createRandomBombs();
    }
  }
  createRandomBombs() {
    const placesOfBombs = generateRandomNumbersLessThan(
      5,
      this.enemiesInRow * this.numberOfRows
    );
    console.log(placesOfBombs);
    const allEnemies = document.querySelectorAll(".enemies");
    // console.log(this.#element.children[0]);
    for (let i = 0; i < placesOfBombs.length; i++) {
      let currentNumber = placesOfBombs[i];
      console.log("shit");
      allEnemies[currentNumber].classList.add("bomb");
      allEnemies[currentNumber].classList.remove("enemies");
    }
  }
}
function generateRandomNumbersLessThan(arrLength, maxNumber) {
  const randomNumbers = [];

  for (let i = 0; i < arrLength; i++) {
    const randomNumber = Math.floor(Math.random() * maxNumber);
    randomNumbers.push(randomNumber);
  }

  return randomNumbers;
}
