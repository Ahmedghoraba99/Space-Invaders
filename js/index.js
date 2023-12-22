
//user is found or not
const foundUser = function(users,username){
    return users.find(ele=>ele.name.toLowerCase() === username.toLowerCase());
}

// add user
const addUserData = function(users,username){
    let addObj = {
        name: username,
        lastScore: 0
    };
    users.push(addObj);
}

// validate user
const isValidName = function(username){
    const usernameRegex = /^[a-zA-Z_0-9]{3,16}/;
    return usernameRegex.test(username);
}


window.addEventListener('load',function(){
    let btnSumbitForm = document.forms[0];
    let errorText = document.querySelector('span');
    let users = localStorage.users === undefined ? []: JSON.parse(localStorage.users);
    
    btnSumbitForm.addEventListener('submit',function(event){
        event.preventDefault();
        const usernameValue = document.getElementById('username').value;
        if(isValidName(usernameValue)){
            if(foundUser(users , usernameValue) === undefined){
                addUserData(users,usernameValue);
            }
            localStorage.setItem('users',JSON.stringify(users));
            window.location.href = `game.html?name=${usernameValue}`;
        }else{
            errorText.innerHTML = `username must be valid and unique .`;
        }
    });
});





