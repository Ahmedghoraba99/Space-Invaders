import {foundUser , addUserData , isValidName} from './function.js'

window.addEventListener('load',function(){
    let btnSumbitForm = document.forms[0];
    let errorText = document.querySelector('span');
    let users = localStorage.users === undefined ? []: JSON.parse(localStorage.users);
    let LeavelSelected = this.document.querySelector('select');
    localStorage.setItem("leavel", '300');

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

    LeavelSelected.addEventListener('change',function(){
        localStorage.setItem('leavel', LeavelSelected.value);
    });
});





