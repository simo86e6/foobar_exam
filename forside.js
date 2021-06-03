"use strict";
import './style_form.scss'



if("userName" in sessionStorage === false){
    document.querySelector("#user_name").addEventListener("keypress", getUserName);
    document.querySelector(".link_menu").addEventListener("click", setUserName);
} else {
    document.querySelector("#user_name").classList.add("hide");
    document.querySelector(".link_menu").addEventListener("click", linkMenuPage);
}



let username = "";

function getUserName(event){
    
    let keyPressed = event.key;
    username = this.value + keyPressed;
    
        
}
function setUserName(){
    if(username !== ""){
        sessionStorage.setItem("userName", username);
        linkMenuPage();
    } else {
        alert("Please enter a name");
    }
}

function linkMenuPage(){
    window.location.href=("menu.html");
}

