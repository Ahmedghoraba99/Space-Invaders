import { Enemy } from "./Enemy.js";
import { Ship } from "./Ship.js";
import {
  playerLost,
  isShipDestroied,
  welcomeUserMessage,
  displayData,
  countDownTimer,
  // count,
} from "./function.js";

window.addEventListener("DOMContentLoaded", function () {
  const backgroundMusic = new Audio("../soundEffects/themeSong.mp3");
  const myModal = new bootstrap.Modal(document.getElementById("myModal"));
  const myButton = document.getElementById("myButton");
  const closeButton = document.querySelector("#close");
  const mainContent = document.querySelector(".main-container");
  const enemyContainer = document.querySelector(".all-enemies");
  const searchParams = new URLSearchParams(location.search);
  const tbody = document.getElementById("tbody");
  const queryParams = searchParams.get("name");
  const timerDiv = document.querySelector(".timer");
  const btnCloseGame = document.querySelector('.btn-close');

  const StartGame = function (container, enemyContainer) {
    const timer = countDownTimer(timerDiv);
    const enemies = new Enemy(enemyContainer, {}, 5, 6);
    const spaceShip = new Ship(mainContent, {});
    spaceShip.addShipMovment();

    const id = setInterval(() => {
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
        enemyContainer,
        queryParams,
        timerDiv,
        spaceShip,
        timer
      );
    }, 40);
  };

  if (queryParams != null) {
    welcomeUserMessage(queryParams);
    displayData(tbody, JSON.parse(localStorage.getItem("users")));
    myModal.show();
    mainContent.style.display = "none";
    myButton.click();
    closeButton.addEventListener("click", function () {
      myModal.hide();
      mainContent.style.display = "block";
      StartGame(mainContent, enemyContainer);
      document.querySelector(".score").textContent = 0;
      timerDiv.style.display = "block";
      backgroundMusic.play();
    });
    btnCloseGame.addEventListener('click',function(){
      location.href = '../index.html';
    });

  } else {
    window.location.href = "../index.html";
  }
});
