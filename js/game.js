import { Enemy } from "./Enemy.js";
import { Ship } from "./Ship.js";
import {
  gameEndSequence,
  isShipDestroied,
  welcomeUserMessage,
  displayData,
  countDownTimer,
  // count,
} from "./function.js";

window.addEventListener("DOMContentLoaded", function () {
  //Aquiring required Data (audio,HTML elements)
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
  const btnCloseGame = document.querySelector(".btn-close");
  let level = parseInt(localStorage.getItem("level"));

  /**
   * StartGame function initializes the game and starts the game loop.
   *
   * @param {HTMLElement} container - The container element where the game will be rendered.(ship, enemies and bullets)
   * @param {HTMLElement} enemyContainer - The container element where the enemies will be rendered and moved.
   */
  const StartGame = function (container, enemyContainer) {
    const timer = countDownTimer(timerDiv);
    const enemies = new Enemy(enemyContainer, {}, 5, 6, level);
    const spaceShip = new Ship(mainContent, {});
    spaceShip.addShipMovment();
    const gameInterval = setInterval(() => {
      enemies.addEnemyMovement(container);
      enemies.resetTheEnemyWave();
      spaceShip.checkCollisions([...document.querySelectorAll(".a")]);
      let shipExploded = isShipDestroied(
        [...document.querySelectorAll(".a")],
        spaceShip.gun
      );
      //Initializing the game shut down logic
      gameEndSequence(
        shipExploded,
        mainContent,
        myModal,
        gameInterval,
        backgroundMusic,
        enemyContainer,
        queryParams,
        timerDiv,
        spaceShip,
        timer
      );
    }, 40);
  };
  //Handling the welcome message and data display and user interaction logic
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
    btnCloseGame.addEventListener("click", function () {
      location.href = "../index.html";
    });
  } else {
    window.location.href = "../index.html";
  }
});
