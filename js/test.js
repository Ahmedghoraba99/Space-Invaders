// select the ship element
var ship = document.getElementById('ship');

// style the ship element
ship.style.position = 'absolute';
ship.style.bottom = '0px';
ship.style.left = '50%';
ship.style.transform = 'translate(-50%, -50%)';
ship.style.width = '50px';
ship.style.height = '50px';
ship.style.backgroundColor = 'blue';

// add an event listener for space keyup
document.addEventListener('keyup', function(event) {
    if (event.code === 'Space') {
        // create a bullet element
        var bullet = document.createElement('div');
        bullet.style.position = 'absolute';
        bullet.style.top = (parseInt(ship.style.left) - 20 )+ 'px';
        bullet.style.left = '0';
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
            }
        });
    }
});