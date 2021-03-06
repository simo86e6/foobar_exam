"use strict";
import './style_form.scss'

let beerList = JSON.parse(sessionStorage.getItem("selectedBeers"));
let totalPrice = 0;
document.querySelector("#buy_button").addEventListener("click", redirectPayment);
basketSetup();

function redirectPayment(){
    sessionStorage.setItem("totalPrice", totalPrice.toString());
    window.location.href=("betaling.html");
}

function basketSetup(){
    document.querySelector(".basket_container").innerHTML = "";
    totalPrice = 0;
    let amountOfOrders = 0;
    
    beerList.forEach(beerOrder => {
        if(beerOrder.amount != 0){
            amountOfOrders += beerOrder.amount;
            totalPrice += showOrder(beerOrder);
        }
    });

    document.querySelector(".basket_total_orders").innerHTML = "DIN BESTILLING (" + amountOfOrders  + " varer)";
    document.querySelector(".total_amount_right").innerHTML = totalPrice + " dkk";

    let beerListString = JSON.stringify(beerList);
    sessionStorage.setItem("selectedBeers", beerListString);
}



function showOrder(beerOrder){
    const clone = document.querySelector(".basket_template").content.cloneNode(true);
    clone.querySelector(".basket_beer_picture").src = beerOrder.picture;
    clone.querySelector(".basket_beer_name").textContent = beerOrder.name;
    clone.querySelector(".basket_amount").textContent = "Antal: " + beerOrder.amount + " x " + beerOrder.price + " dkk";
    let lineTotal = beerOrder.amount * beerOrder.price;
    clone.querySelector(".basket_line_total").textContent = lineTotal + " dkk";
    clone.querySelector(".counter_display").textContent = beerOrder.amount;


    clone.querySelector(".counter_plus").addEventListener("click", function () {
        beerOrder.amount++;
        basketSetup();
      });

    clone.querySelector(".counter_minus").addEventListener("click", function () {
        beerOrder.amount--;
        basketSetup();
      });




    document.querySelector(".basket_container").appendChild(clone);
    return lineTotal;

}

