//user is found or not
const foundUser = function(users,username){
    return users.find(ele=>ele.name.trim().toLowerCase() === username.toLowerCase());
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




export {foundUser , addUserData , isValidName};