

window.addEventListener('DOMContentLoaded', function() {
    let myModal = new bootstrap.Modal(document.getElementById('myModal'));
    let myButton = document.getElementById('myButton');
    let mainContent = document.querySelector('.main-container');
    let searchParams = new URLSearchParams(location.search);
    let welcomeText = document.querySelector('.modal-title');
    let tbody = this.document.getElementById('tbody');
    let queryParams = searchParams.get('name');

    const StartGame = function(container){
        const enemy = new Enemy(container, {}, "type");
        const enemy2 = new Enemy(container, {}, "type");
    
        const enemy3 = new Enemy(container, {}, "type");
    
        setInterval(() => {
            //TODO: Should be moved to game function DEVELOPMENT
            enemy.horizontalMovement(container);
            enemy2.horizontalMovement(container);
            enemy3.horizontalMovement(container);
        }, 100);
    }

    const welcomeUserMessage = (username)=>{
        let users = JSON.parse(localStorage.getItem('users'));
        let usernamTextWelcome = document.createElement('span');
        usernamTextWelcome.style.color = 'red';
        usernamTextWelcome.textContent = users.find(el=>el.name === username).name;
        welcomeText.appendChild(usernamTextWelcome);
    }

    const displayData = (container)=>{
        let users = JSON.parse(localStorage.getItem('users'));
        users.forEach(element => {
            let tr = document.createElement('tr');
            let nameRow = document.createElement('td');
            let scoreRow = document.createElement('td');
            nameRow.textContent = element.name;
            scoreRow.textContent = element.lastScore;
            tr.appendChild(nameRow);
            tr.appendChild(scoreRow);
            container.appendChild(tr);
        });
    }

    welcomeUserMessage(queryParams);
    displayData(tbody);
    myModal.show();
    mainContent.style.display = 'none';
    myButton.click();
    let closeButton = document.querySelector('#close');
    closeButton.addEventListener('click', function() {
        myModal.hide();
        mainContent.style.display = 'block';
        StartGame(mainContent);
    });
});





