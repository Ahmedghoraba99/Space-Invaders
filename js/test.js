// select the ship element
var ship = document.getElementById('ship');
var body = document.body;

// style the ship element
ship.style.position = 'absolute';
ship.style.bottom = '20px';
ship.style.left = '700px';

ship.style.width = '50px';
ship.style.height = '50px';
ship.style.border = '1px solid blue';


document.addEventListener('keydown',function(event){
    if (event.key === 'ArrowRight') {
        ship.style.left = (parseInt(ship.style.left) + 50) + 'px';
    } else if (event.key === 'ArrowLeft') {
        ship.style.left = (parseInt(ship.style.left) - 50) + 'px';
    }
});




document.addEventListener('keyup', function(event) {
    if (event.code === 'Space') {
        // create a bullet element
        var bullet = document.createElement('div');
        bullet.style.position = 'fixed';
        bullet.style.top = '726px';
        bullet.style.left = parseInt(ship.style.left) + 30 +"px" ;
        bullet.style.width = '5px';
        bullet.style.height = '20px';
        bullet.style.backgroundColor = 'red';
        ship.appendChild(bullet);


        var animationId = requestAnimationFrame(function animate() {
            var newTop = parseFloat(bullet.style.top) - 5;
            if (newTop > -700) {
                bullet.style.top = newTop + 'px';
                // continue the animation
                animationId = requestAnimationFrame(animate);
            } else {
                // remove the bullet element from the ship element
                console.log(bullet);
                ship.removeChild(bullet);
            }
        });
    }
});