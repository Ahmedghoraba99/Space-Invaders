export class Ship {
  constructor(container) {
    this.gun = document.createElement("div");
    this.gun.classList.add("ship");
    this.gun.style.position = "absolute";
    this.gun.style.width = "80px";
    this.gun.style.height = "80px";
    this.gun.style.left = "250px";
    this.gun.style.bottom = "10px";
    this.gun.style.border = "1px solid red";
    this.container = container;
    this.container.appendChild(this.gun);
    this.bullets = [];
    this.currentPosition = parseInt(this.gun.style.left);
  }

  moveRight(step = 20) {
    if(this.currentPosition + step < this.container.clientWidth - parseInt(this.gun.style.width)){
      this.currentPosition += step;
      this.gun.style.left = `${this.currentPosition}px`;
    }
  }

  moveLeft(step = 20) {
    if (this.currentPosition - step > 0) {
      this.currentPosition -= step;
      this.gun.style.left = `${this.currentPosition}px`;
    }
  }

  createBullet() {
    let bullet = document.createElement("div");
    bullet.style.position = "fixed";
    bullet.style.top =  parseInt(this.gun.getBoundingClientRect().top) + 8 + "px";
    bullet.style.left = parseInt(this.gun.getBoundingClientRect().left) + 22 + "px";
    bullet.style.width = "5px";
    bullet.style.height = "20px";
    bullet.style.backgroundColor = "red";
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

  destroy() {
    this.container.removeChild(this.gun);
  }

  addShipMovment() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        this.moveRight();
      } else if (event.key === "ArrowLeft") {
        this.moveLeft();
      } else if (event.code === "Space") {
        this.createBullet();
      }
    });
  }

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

  checkCollisions(enemies){
    this.bullets.forEach(bullet=>{
      enemies.forEach(enmy=>{
        if(this.isCollision(bullet,enmy)){
          enmy.remove();
          bullet.remove();
          this.bullets.splice(this.bullets.indexOf(bullet), 1);
          enemies.splice(enemies.indexOf(enmy),1);
        }
      });
    });
  }


}
