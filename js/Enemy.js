import { clearAllBullets } from "./function.js";
//All enemies are put in a parent container which moves down with each hit to the wall
export class Enemy {
  #element;
  /**
   * Initializes a new instance of the Enemy class.
   *
   * @param {Element} container - The container element where the enemy will be created.
   * @param {string} style - The CSS style to be applied to the enemy element.
   * @param {number} enemiesInRow - The number of enemies in each row.
   * @param {number} numberOfRows - The number of rows of enemies.
   * @param {number} verticalSpeed - The vertical speed of the enemies. (level of difficulty)
   */
  constructor(container, style, enemiesInRow, numberOfRows, verticalSpeed) {
    this.enemiesInRow = enemiesInRow;
    this.numberOfRows = numberOfRows;
    this.#element = this.#createEnemy(container, style);
    this.width = this.#element.offsetWidth;
    this.height = this.#element.offsetHeight;
    this.container = container;
    this.movementDirection = "right";
    this.verticalSpeed = verticalSpeed || 20;
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
   * Get the HTMLElement of the enemy container.
   * @return {HTMLDivElement}
   */
  get element() {
    return this.#element;
  }

  /**
   * Creates an enemy row and adds it to the container.
   * Each enemy is created with a margin of 40px.
   * Each enemy has a width of 60px and a height of 60px.
   * The enemies are positioned relative to the container.
   * The enemies are positioned in a row with a margin of 40px.
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
      if (i == 0) {
        enemy.style.marginLeft = "0px";
      }
      enemy.classList.add("enemies");
      enemy.classList.add("a");
      enemiesRow.appendChild(enemy);
    }
    for (let i = 0; i < this.numberOfRows; i++) {
      container.appendChild(enemiesRow.cloneNode(true));
    }
    this.#createRandomBombs();
    return container;
  }

  #moveEnemiesDown() {
    let currentTop = parseInt(this.#element.style.top) || 0;
    this.#element.style.top = currentTop + this.verticalSpeed + "px";
  }

  /**
   * Adds movement to the enemy.
   * the enemy moves right or left depending on the movementDirection
   * if the enemy reaches the edge of the container, it changes direction
   * and moves down a step depending on the level of the game
   * @return {void}
   * @memberof Enemy
   */
  addEnemyMovement() {
    if (this.movementDirection === "right") {
      this.#element.style.left = `${this.left + 3}px`;
      if (this.left + this.width >= this.#element.parentElement.offsetWidth) {
        this.movementDirection = "left";
        this.#moveEnemiesDown();
      }
    } else {
      this.#element.style.left = `${this.left - 3}px`;
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
  #isEnemyWaveCleared() {
    const enemyDivs = document.querySelectorAll(".a");
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
    if (this.#isEnemyWaveCleared()) {
      const bullets = document.querySelectorAll(".bullet");
      clearAllBullets(bullets);
      const enemyDivs = document.querySelectorAll(".deadEnemy");
      this.container.style.top = "0px";
      for (let i = 0; i < enemyDivs.length; i++) {
        enemyDivs[i].classList.remove("deadEnemy");
        enemyDivs[i].classList.add("enemies");
        enemyDivs[i].classList.add("a");
      }
      this.#createRandomBombs();
    }
  }
  #createRandomBombs() {
    const placesOfBombs = generateRandomNumbersLessThan(
      5,
      this.enemiesInRow * this.numberOfRows
    );
    const allEnemies = document.querySelectorAll(".a");
    // console.log(this.#element.children[0]);
    for (let i = 0; i < placesOfBombs.length; i++) {
      let currentNumber = placesOfBombs[i];
      allEnemies[currentNumber].classList.remove("enemies");
      allEnemies[currentNumber].classList.add("bomb");
    }
  }
}
/**
 * Generates an array of random numbers less than a given maximum number.
 * The generated numbers are unique and at least are 1 number apart from each other.
 * @param {number} arrLength - The length of the array to be generated.
 * @param {number} maxNumber - The maximum number for the random numbers.
 * @return {number[]} The array of random numbers less than the maximum number.
 */
function generateRandomNumbersLessThan(arrLength, maxNumber) {
  const randomNumbers = [];
  do {
    const randomNumber = Math.floor(Math.random() * maxNumber);
    if (
      !randomNumbers.includes(randomNumber) &&
      !randomNumbers.includes(randomNumber + 1) &&
      !randomNumbers.includes(randomNumber - 1)
    ) {
      randomNumbers.push(randomNumber);
    }
  } while (randomNumbers.length < arrLength);
  return randomNumbers;
}
