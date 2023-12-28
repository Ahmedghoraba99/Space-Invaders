const hitSound = new Audio("../soundEffects/invaderkilled.wav");
//user is found or not
const foundUser = function (users, username) {
  let user = users.find(
    (ele) => ele.name.trim().toLowerCase() === username.toLowerCase()
  );
  return user;
};

/**
 * Adds user data to the users array(Works using local storage).
 *
 * @param {array} users - The array of users.
 * @param {string} username - The username to be added.
 */
const addUserData = function (users, username) {
  let addObj = {
    name: username,
    lastScore: 0,
  };
  users.push(addObj);
};

/**
 * Checks if a given username is valid.
 * @param {string} username - The username to be validated.
 * @return {boolean} True if the username is valid, false otherwise.
 */
const isValidName = function (username) {
  const usernameRegex = /^[a-zA-Z_0-9]{3,16}/;
  return usernameRegex.test(username);
};

/**
 * Checks if the player has lost the game based on certain conditions and performs necessary actions.
 * If the player has lost the game, the game is stopped and the modal is displayed.
 * Otherwise it keeps the timer running and display a messege at the end of the game.
 * The player's score is stored in the local storage.
 * The player's username is stored in the local storage.
 * The player's last score is stored in the local storage.
 * The game timer Resets
 * Enemy container is removed and the background music is stopped.
 *
 * @param {boolean} shipExploded - Indicates if the ship has exploded.
 * @param {HTMLElement} mainContent - The main content element.
 * @param {Modal} myModal - The modal object.
 * @param {number} id - The ID of the interval.
 * @param {HTMLAudioElement} backgroundMusic - The background music element.
 * @param {HTMLElement} enemyContainer - The enemy container element.
 * @param {string} username - The username of the player.
 * @param {HTMLElement} timerDiv - The timer div element.
 * @param {SpaceShip} spaceShip - The space ship object.
 * @param {number} count - Timer counter of the game.
 */
const gameEndSequence = function (
  shipExploded,
  mainContent,
  myModal,
  id,
  backgroundMusic,
  enemyContainer,
  username,
  timerDiv,
  spaceShip,
  count
) {
  if (
    shipExploded ||
    enemyContainerTouchedTheBottom(enemyContainer) ||
    timerIsFinshed(timerDiv) ||
    spaceShip.score >= 300
  ) {
    mainContent.style.display = "none";
    clearInterval(id);
    document.querySelector(".ship").remove();
    [...document.querySelectorAll(".enemiesRow")].forEach((el) => el.remove());
    backgroundMusic.pause();
    myModal.show();
    document.querySelector(".all-enemies").style.top = 0 + "px";
    let users = JSON.parse(localStorage.getItem("users"));
    foundUser(users, username).lastScore = spaceShip.score; //???????????
    localStorage.setItem("users", JSON.stringify(users));
    let tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    displayData(tbody, users); //Refreshes the
    clearInterval(count);
    timerDiv.textContent = "2:00";
    afterGameMessage(username, spaceShip.score);
    timerDiv.style.display = "none";
  }
};
const afterGameMessage = function (username, score) {
  if (score < 300) {
    document.querySelector(
      ".modal-title"
    ).textContent = `Oops! Game Over!  ${username}`;
  } else {
    document.querySelector(
      ".modal-title"
    ).textContent = `Congratulations! You won!  ${username}`;
  }
};
const timerIsFinshed = function (timerDiv) {
  if (timerDiv.textContent === "0") {
    return true;
  }
  return false;
};

/**
 * Checks if the ship collides with an enemy object.
 *
 * @param {DOMRect} enemy - The bounding rectangle of the enemy object.
 * @param {DOMRect} object - The bounding rectangle of the ship object.
 * @return {boolean} Returns true if the ship collides with the enemy, otherwise returns false.
 */
const isShipCollided = function (enemy, object) {
  const objectPosition = object.getBoundingClientRect();
  const enemyPosition = enemy.getBoundingClientRect();
  return (
    objectPosition.left < enemyPosition.right &&
    objectPosition.right > enemyPosition.left &&
    objectPosition.top < enemyPosition.bottom &&
    objectPosition.bottom > enemyPosition.top
  );
};

const clearAllBullets = function (bullets) {
  bullets.forEach((bullet) => {
    bullet.remove();
  });
};

/**
 * Check if the enemy container has touched the bottom of the viewport.
 * @param {HTMLElement} container - The enemy container element.
 * @return {boolean} Returns true if the container has touched the bottom of the viewport, otherwise false.
 */
const enemyContainerTouchedTheBottom = function (container) {
  const containerPosition = container.getBoundingClientRect();
  const containerBottom = containerPosition.bottom;
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  return containerBottom >= windowHeight;
};

const isShipDestroied = function (enemies, object) {
  //Note: dosen't work with forEach loop
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];

    if (isShipCollided(enemy, object)) {
      hitSound.play();
      enemy.classList.remove("enemies", "a");
      enemy.classList.add("deadEnemy");
      enemy.classList.add("explosion");
      setTimeout(() => {
        enemy.classList.remove("explosion");
      }, 50);
      return true;
    }
  }

  return false;
};

const welcomeUserMessage = (username) => {
  let welcomeText = document.querySelector(".modal-title");
  let users = JSON.parse(localStorage.getItem("users"));
  let usernamTextWelcome = document.createElement("span");
  usernamTextWelcome.style.color = "red";
  usernamTextWelcome.textContent = ` ${
    users.find((el) => el.name === username).name
  }`;
  welcomeText.appendChild(usernamTextWelcome);
};

const displayData = (container, users) => {
  users.forEach((element) => {
    let tr = document.createElement("tr");
    let nameRow = document.createElement("td");
    let scoreRow = document.createElement("td");
    nameRow.textContent = element.name;
    scoreRow.textContent = element.lastScore;
    tr.appendChild(nameRow);
    tr.appendChild(scoreRow);
    container.appendChild(tr);
  });
};

const countDownTimer = (timerDiv) => {
  let timeInSeconds = 119; //as the timer starts a second later than the game starts
  let count;
  return (count = setInterval(function () {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    document.querySelector(".timer").textContent = `${minutes}:${seconds}`;
    if (timeInSeconds === 0) {
      clearInterval(count);
      timerDiv.textContent = "0";
    } else {
      timeInSeconds--;
    }
  }, 1000));
};
export {
  foundUser,
  addUserData,
  isValidName,
  gameEndSequence,
  isShipDestroied,
  clearAllBullets,
  welcomeUserMessage,
  displayData,
  countDownTimer,
};
