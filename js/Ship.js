export class Ship{
    constructor(container){
        this.gun = document.createElement('div');
        this.gun.classList.add('ship');
        this.gun.style.position = 'absolute';
        this.gun.style.width = '50px';
        this.gun.style.height = '50px';
        this.gun.style.left = '50%';
        this.gun.style.bottom = '10px';
        this.gun.style.border = '1px solid red';
        this.container = container;
        this.container.appendChild(this.gun);
        this.bullets = [];
        this.currentPosition = parseInt(this.gun.style.left);
    }

    moveRight(step=20) {
        if (this.currentPosition + step < this.container.clientWidth - 20) {
            this.currentPosition += step;
            this.gun.style.left = `${this.currentPosition}px`;
        }
    }

    moveLeft(step=20) {
        if (this.currentPosition - step > 0) {
            this.currentPosition -= step;
            this.gun.style.left = `${this.currentPosition}px`;
        }
    }

    createBullet(){
        let bullet = document.createElement('div');
        bullet.classList.add('bullet');
        bullet.style.position = 'absolute';
        bullet.style.top = '-4px';
        bullet.style.left = '45%';
        bullet.style.width = '5px';
        bullet.style.height = '20px';
        bullet.style.backgroundColor = 'red';
        this.gun.appendChild(bullet);
    }
}

