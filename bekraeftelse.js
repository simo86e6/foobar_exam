"use strict";
import './style_form.scss'

let orderIds = [];

updateOrderIds();
setOrderNumber();

function updateOrderIds(){
    if ("orderIds" in sessionStorage){
      let ids = JSON.parse(sessionStorage.getItem("orderIds"));
      ids.forEach(id => {
          orderIds.push(id);
      });
    }
}

function setOrderNumber(){
    let orderNumber = JSON.parse(sessionStorage.getItem("orderId"));
    document.querySelector("#show_order_number").innerHTML = orderNumber;
    orderIds.push(orderNumber);

    let orderidsString = JSON.stringify(orderIds);
    sessionStorage.setItem("orderIds", orderidsString)
    sessionStorage.removeItem("selectedBeers");
}




