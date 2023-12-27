import { Enemy } from "./Enemy.js";
import { Ship } from "./Ship.js";
import { foundUser, playerLost, isShipDestroied } from "./function.js";

let backgroundMusic = new Audio("../soundEffects/themeSong.mp3");
window.addEventListener("DOMContentLoaded", function () {
  let myModal = new bootstrap.Modal(document.getElementById("myModal"));
  let myButton = document.getElementById("myButton");
  let mainContent = document.querySelector(".main-container");
  let enemyContainer = document.querySelector(".all-enemies");
  let searchParams = new URLSearchParams(location.search);
  let welcomeText = document.querySelector(".modal-title");
  let tbody = document.getElementById("tbody");
  let queryParams = searchParams.get("name");
  const StartGame = function (container, enemyContainer) {
    const enemies = new Enemy(enemyContainer, {}, 5, 6);
    enemies.createRandomBombs();

    const spaceShip = new Ship(mainContent, {});
    spaceShip.addShipMovment();

    let id = setInterval(() => {
      enemies.addEnemyMovement(container);
      enemies.resetTheEnemyWave();
      spaceShip.checkCollisions([...document.querySelectorAll(".a")]);
      let shipExploded = isShipDestroied(
        [...document.querySelectorAll(".a")],
        spaceShip.gun
      );

      playerLost(shipExploded, mainContent, myModal, id, backgroundMusic);
    }, 10);
  };

  const welcomeUserMessage = (username) => {
    let users = JSON.parse(localStorage.getItem("users"));
    let usernamTextWelcome = document.createElement("span");
    usernamTextWelcome.style.color = "red";
    usernamTextWelcome.textContent = users.find(
      (el) => el.name === username
    ).name;
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

  if (queryParams != null) {
    welcomeUserMessage(queryParams);
    displayData(tbody);
    myModal.show();
    mainContent.style.display = "none";
    myButton.click();

    let closeButton = document.querySelector("#close");
    closeButton.addEventListener("click", function () {
      myModal.hide();
      mainContent.style.display = "block";
      StartGame(mainContent, enemyContainer);
      backgroundMusic.play();
    });
  } else {
    window.location.href = "../index.html";
  }
});
