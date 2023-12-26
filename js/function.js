const hitSound = new Audio("../soundEffects/invaderkilled.wav");

//user is found or not
const foundUser = function (users, username) {
  return users.find(
    (ele) => ele.name.trim().toLowerCase() === username.toLowerCase()
  );
};

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
  backgroundMusic
) {
  if (shipExploded) {
    mainContent.style.display = "none";
    clearInterval(id);
    myModal.show();
    [...document.querySelectorAll(".enemiesRow")].forEach((el) => el.remove());
    backgroundMusic.pause();
  }
};
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
function isShipDestroied(enemies, object) {
  //Note: dosen't work with forEach loop
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];

    if (isShipCollided(enemy, object)) {
      object.remove();
      hitSound.play();
      enemy.classList.remove("enemies");
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
  usernamTextWelcome.textContent = ` ${users.find((el) => el.name === username).name}`;
  welcomeText.appendChild(usernamTextWelcome);
};

const displayData = (container) => {
  let users = JSON.parse(localStorage.getItem("users"));
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


const countDownTimer =()=> {
  let timerText = document.querySelector('.timer');
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  timerText.innerHTML = ` ${minutes} : ${seconds}`;
}

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
