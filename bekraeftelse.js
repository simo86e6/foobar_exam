"use strict";
import './style_form.scss'

let savedOrder = {
    orderedBeers: [],
    subTotal: "",
    orderNumber: "",
    orderTime: ""
}

let beerOrdered = {
    picture: "",
    name: "",
    amount: "",
    lineTotal: ""
}

let completedOrders = [];

// localStorage.clear();


setOrderNumber();
updateCompletedOrders();
addOrderToStorage();

function setOrderNumber(){
    debugger;
    let orderNumber = JSON.parse(sessionStorage.getItem("orderId"));
    document.querySelector("#show_order_number").innerHTML = orderNumber;
}

function updateCompletedOrders(){
    if ("completedOrders" in localStorage){
        let localStorageOrders = JSON.parse(localStorage.getItem("completedOrders"));
        localStorageOrders.forEach(completedOrder => {
            completedOrders.push(completedOrder);
        });
    }
}

function addOrderToStorage(){
    
    let beerOrders = [];
    let totalPrice = 0;
    let order = JSON.parse(sessionStorage.getItem("selectedBeers"));

    order.forEach(beer => {
        if(beer.amount > 0){
            let beerOrder = Object.create(beerOrdered);
            beerOrder.picture = beer.picture;
            beerOrder.name = beer.name;
            beerOrder.amount = beer.amount;
            let lineTotal = beer.amount * beer.price;
            beerOrder.lineTotal = lineTotal;
            beerOrders.push(beerOrder);

            totalPrice += lineTotal;
        }  
    });

    let completeOrder = Object.create(savedOrder);
    completeOrder.orderedBeers = beerOrders;
    completeOrder.subTotal = totalPrice;
    completeOrder.orderNumber = 5;
    completeOrder.orderTime = new Date();
    completedOrders.push(completeOrder);

    let completeOrderString = JSON.stringify(completedOrders);
    localStorage.setItem("completedOrders", completeOrderString);

    console.log(JSON.parse(localStorage.getItem("completedOrders")));

    sessionStorage.removeItem("selectedBeers");

}
