// let gunSound = new Audio("../soundEffects/gunSound.mp3");
const hitSound = new Audio("../soundEffects/invaderkilled.wav");
const gunFired = new Audio("../soundEffects/gunFired.wav");
export class Ship {
  /**
   *
   * Constructor function for creating a new instance of Ship class.
   * @param {HTMLElement} container - The HTML element that will contain the ship.
   * @param {object} style - The style object for configuring the ship's appearance.
   *   @property {string} [style.width="80px"] - The width of the ship.
   *   @property {string} [style.height="80px"] - The height of the ship.
   *   @property {string} [style.left="250px"] - The horizontal position of the ship.
   *   @property {string} [style.bottom="10px"] - The vertical position of the ship.
   *   @property {string} [style.border="1px solid red"] - The border style of the ship.
   */
  constructor(container, style) {
    this.gun = document.createElement("div");
    this.gun.classList.add("ship");
    this.gun.style.position = "absolute";
    this.gun.style.width = style.width || "80px";
    this.gun.style.height = style.height || "80px";
    this.gun.style.left = style.left || "250px";
    this.gun.style.bottom = style.bottom || "5px";
    // this.gun.style.border = style.border || "1px solid red";
    this.container = container;
    this.container.appendChild(this.gun);
    this.bullets = [];
    this.currentPosition = parseInt(this.gun.style.left);
  }
  /**
   * Moves an element to the right by a specified number of steps.
   *
   * @param {number} step - The number of steps to move to the right. Defaults to 20.
   */
  moveRight(step = 20) {
    if (
      this.currentPosition + step <
      this.container.clientWidth - parseInt(this.gun.style.width)
    ) {
      this.currentPosition += step;
      this.gun.style.left = `${this.currentPosition}px`;
    }
  }
  /**
   * Moves an element to the right by a specified number of steps.
   *
   * @param {number} step - The number of steps to move to the left. Defaults to 20.
   */
  moveLeft(step = 20) {
    if (this.currentPosition - step > 0) {
      this.currentPosition -= step;
      this.gun.style.left = `${this.currentPosition}px`;
    }
  }
  /**
   * @memberof Gun
   * @method createBullet
   * Creates a bullet element and adds it to the gun element.
   * The bullet moves up the screen until it goes off the screen.
   */
  createBullet() {
    let bullet = document.createElement("div");
    bullet.style.position = "fixed";
    bullet.style.top =
      parseInt(this.gun.getBoundingClientRect().top) + 8 + "px";
    bullet.style.left =
      parseInt(this.gun.getBoundingClientRect().left) + 35 + "px";
    bullet.classList.add("bullet");
    // bullet.style.backgroundColor = "red";
    this.gun.appendChild(bullet);
    this.bullets.push(bullet);

    const animate = () => {
      let newTop = parseInt(bullet.style.top) - 5;
      if (newTop > 2) {
        bullet.style.top = newTop + "px";
        requestAnimationFrame(animate);
      } else {
        bullet.remove();
        this.bullets.shift();
      }
    };
    requestAnimationFrame(animate);
  }
  /**
   * Removes the gun element from the container.
   *
   * @memberof Gun
   * @method destroy
   * @return {void} No return value, as it removes an element.
   */
  destroy() {
    this.container.removeChild(this.gun);
  }
  /**
   * Adds ship movement functionality to the game.
   *This is done by listening for (keydown) for left and right arrow keys.
   * It also listens for (keyup) for the space bar to create a bullet.
   * @class Gun
   * @memberof Gun
   * @method addShipMovment
   * @return {void} - No return value (void)
   */
  addShipMovment() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        this.moveRight();
      } else if (event.key === "ArrowLeft") {
        this.moveLeft();
      } else if (event.code === "Space") {
        this.createBullet();
        gunFired.play();
      }
    });
  }

  /**
   * Checks if a bullet collides with an enemy. by getting the top and bottom positions of the bullet and enemy.
   *
   * @param {HTMLElement} bullet - The bullet element.
   * @param {HTMLElement} enmy - The enemy element.
   * @return {boolean} Returns true if the bullet collides with the enemy, otherwise false.
   */
  isCollision(bullet, enmy) {
    const bulletPosition = bullet.getBoundingClientRect();
    const enmyPosition = enmy.getBoundingClientRect();
    return (
      bulletPosition.left < enmyPosition.right &&
      bulletPosition.right > enmyPosition.left &&
      bulletPosition.top < enmyPosition.bottom &&
      bulletPosition.bottom > enmyPosition.top
    );
  }

  /**
   *Takes an array of enemies and Check for collisions between bullets and enemies.
   *If there is a collision, the bullet and enemy are removed.
   * @memberof Gun
   * @method checkCollisions
   * @param {Array<HTMLElement>} enemies - The array of enemies to check for collisions with.
   * @returns {void} - No return value.
   */
  checkCollisions(enemies) {
    this.bullets.forEach((bullet) => {
      enemies.forEach((enemy) => {
        if (this.isCollision(bullet, enemy)) {
          console.log(parseInt(enemy.parentElement.style.width));
          this.exlpodeAndKill(enemy, bullet);
          // this.bullets.splice(this.bullets.indexOf(bullet), 1);
          // enemies.splice(enemies.indexOf(enemy), 1);
        }
      });
    });
  }

  exlpodeAndKill(enemy, bullet) {
    bullet.remove();
    hitSound.play();
    enemy.classList.remove("enemies");
    enemy.classList.add("deadEnemy");
    enemy.classList.add("explosion");
    setTimeout(() => {
      enemy.classList.remove("explosion");
    }, 50);
  }
}
