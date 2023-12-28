# Space-Invaders

Space Invaders clone made using Vanilla JS

## Enemy.JS

This JavaScript module implements a simple enemy wave game where enemies move horizontally and vertically, and the player's goal is to clear each wave of enemies.

## Usage

1. Import the Enemy class from the file into your project.

   ```javascript
   import { Enemy } from "./enemy.js";
   ```

2. Create an instance of the `Enemy` class,

```javascript const container = document.getElementById("game-container");
const style = "enemy-style"; // Add your custom enemy style
const enemiesInRow = 5;
const numberOfRows = 3;
const verticalSpeed = 5;
const enemyWave = new Enemy(
  container,
  style,
  enemiesInRow,
  numberOfRows,
  verticalSpeed
);
```

2. Call the `clearAllBullets` (from the helper functioms file) function to clear all bullets.

   ```javascript
   clearAllBullets();
   ```
