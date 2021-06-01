"use strict";
import './style_form.scss'

setOrderNumber();


function setOrderNumber(){
    let orderNumber = JSON.parse(sessionStorage.getItem("orderId"));
    document.querySelector("#show_order_number").innerHTML = orderNumber;
    sessionStorage.clear();
}




