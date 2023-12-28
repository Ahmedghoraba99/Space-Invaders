import { foundUser, addUserData, isValidName } from "./function.js";

window.addEventListener("load", function () {
  let btnSumbitForm = document.forms[0];
  let errorText = document.querySelector("span");
  let users =
    localStorage.users === undefined ? [] : JSON.parse(localStorage.users);
  let LeavelSelected = this.document.querySelector("select");
  /*
   * Event listener for game starting,
   *it will check if the username is valid and unique.
   *if the username is valid and unique it will redirect to game.html
   *else it will display an error message
   */
  btnSumbitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const usernameValue = document.getElementById("username").value;
    if (isValidName(usernameValue)) {
      if (foundUser(users, usernameValue) === undefined) {
        addUserData(users, usernameValue);
      }
      localStorage.setItem("users", JSON.stringify(users));
      window.location.href = `game.html?name=${usernameValue}`;
    } else {
      errorText.innerHTML = `username must be valid and unique .`;
    }
  });
  // Event listener for level selection change and saving it in local storage
  LeavelSelected.addEventListener("change", function () {
    localStorage.setItem("level", LeavelSelected.value);
    console.log(LeavelSelected.value);
  });
});
