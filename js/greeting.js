const loginForm = document.querySelector("#login-form");
const loginInput = loginForm.querySelector("input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event){
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;
    // greeting.innerText = "Hello " + username; 아래와 같은 역할 수행함.
    localStorage.setItem(USERNAME_KEY, username);
    paintGreetings(username);


}

function paintGreetings(name){
    greeting.classList.remove(HIDDEN_CLASSNAME);
    greeting.innerText = `Hello ${name}`;

}

const savedUsername = localStorage.getItem(USERNAME_KEY);

console.log(savedUsername);

if(savedUsername === null){
    // show the form
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
    console.log("form");
}else{
    // show the greeting
    paintGreetings(savedUsername);
}