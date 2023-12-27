const hitSound = new Audio("../soundEffects/invaderkilled.wav");

//user is found or not
const foundUser = function (users, username) {
  let user = users.find(
    (ele) => ele.name.trim().toLowerCase() === username.toLowerCase()
  );
  return user;
};

const updateUser = function(users){

}

// add user
const addUserData = function (users, username) {
  let addObj = {
    name: username,
    lastScore: 0,
  };
  users.push(addObj);
};

// validate user
const isValidName = function (username) {
  const usernameRegex = /^[a-zA-Z_0-9]{3,16}/;
  return usernameRegex.test(username);
};

const playerLost = function (
  shipExploded,
  mainContent,
  myModal,
  id,
  backgroundMusic,
  enemyContainer,
  username,
  timerDiv,
  spaceShip
) {
  if (shipExploded || enemyContainerTouchedTheBottom(enemyContainer)|| timerIsFinshed(timerDiv)) {
    mainContent.style.display = "none";
    clearInterval(id);
    document.querySelector(".ship").remove();
    [...document.querySelectorAll(".enemiesRow")].forEach((el) => el.remove());
    backgroundMusic.pause();
    myModal.show();
    document.querySelector(".all-enemies").style.top = 0 + "px";
    let users = JSON.parse(localStorage.getItem('users'));
    foundUser(users,username).lastScore = spaceShip.score;
    localStorage.setItem('users',JSON.stringify(users));
    let tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    displayData(tbody,users);
  }
};

function timerIsFinshed(timerDiv) {
  if(timerDiv.textContent === '0'){
    return true;
  }
  return false;
}

function isShipCollided(enmy, object) {
  const objectPosition = object.getBoundingClientRect();
  const enmyPosition = enmy.getBoundingClientRect();
  return (
    objectPosition.left < enmyPosition.right &&
    objectPosition.right > enmyPosition.left &&
    objectPosition.top < enmyPosition.bottom &&
    objectPosition.bottom > enmyPosition.top
  );
}

const clearAllBullets = function (bullets) {
  bullets.forEach((bullet) => {
    bullet.remove();
  });
};

function enemyContainerTouchedTheBottom(container) {
  const containerPosition = container.getBoundingClientRect();
  const containerBottom = containerPosition.bottom;
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  return containerBottom >= windowHeight;
}

function isShipDestroied(enemies, object) {
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
}

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

const displayData = (container,users) => {
  // let users = JSON.parse(localStorage.getItem("users"));
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
  let count = setInterval(function () {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    timerDiv.textContent = `${minutes}:${seconds}`;
    if (timeInSeconds === 0) {
      clearInterval(count);
      timerDiv.textContent = "0";
    } else {
      timeInSeconds--;
    }
  }, 1000);
};
export {
  foundUser,
  addUserData,
  isValidName,
  playerLost,
  isShipDestroied,
  clearAllBullets,
  welcomeUserMessage,
  displayData,
  countDownTimer,
};
