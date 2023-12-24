export class Ship{
    constructor(container){
        this.gun = document.createElement('div');
        this.gun.classList.add('ship');
        this.gun.style.position = 'absolute';
        this.gun.style.width = '50px';
        this.gun.style.height = '50px';
        this.gun.style.left = '250px';
        this.gun.style.bottom = '10px';
        this.gun.style.border = '1px solid red';
        this.container = container;
        this.container.appendChild(this.gun);
        this.bullets = [];
        this.currentPosition = parseInt(this.gun.style.left);
    }

    moveRight(step=20) {
        if (this.currentPosition + step < this.container.clientWidth - 50) {
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
        bullet.style.position = 'fixed';
        bullet.style.top = parseInt(this.gun.getBoundingClientRect().top) + 8 +'px';
        bullet.style.left = parseInt(this.gun.getBoundingClientRect().left )+ 22 + 'px';
        bullet.style.width = '5px';
        bullet.style.height = '20px';
        bullet.style.backgroundColor = 'red';
        this.gun.appendChild(bullet);

        const animate = () => {
            let newTop = parseInt(bullet.style.top) - 5;
            if (newTop > 2) {
                bullet.style.top = newTop + 'px';
                requestAnimationFrame(animate);
            }else{
                this.gun.removeChild(bullet);
            }
        };
        requestAnimationFrame(animate);
    }
}

