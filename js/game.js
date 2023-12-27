import { Enemy } from "./Enemy.js";
import { Ship } from "./Ship.js";
import {
  playerLost,
  isShipDestroied,
  welcomeUserMessage,
  displayData,
  countDownTimer,
  foundUser,
} from "./function.js";

window.addEventListener("DOMContentLoaded", function () {
  let backgroundMusic = new Audio("../soundEffects/themeSong.mp3");
  let myModal = new bootstrap.Modal(document.getElementById("myModal"));
  let myButton = document.getElementById("myButton");
  let mainContent = document.querySelector(".main-container");
  let enemyContainer = document.querySelector(".all-enemies");
  let searchParams = new URLSearchParams(location.search);
  let tbody = document.getElementById("tbody");
  let queryParams = searchParams.get("name");
  const timerDiv = document.querySelector(".timer");

  const StartGame = function (container, enemyContainer) {
    countDownTimer(timerDiv);
    const enemies = new Enemy(enemyContainer, {}, 5, 6);
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

      playerLost(
        shipExploded,
        mainContent,
        myModal,
        id,
        backgroundMusic,
        enemyContainer
      );
    }, 40);
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
      countDownTimer(timerDiv);

      backgroundMusic.play();
    });
  } else {
    window.location.href = "../index.html";
  }
});
