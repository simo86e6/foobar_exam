"use strict";
import './style_form.scss'




basketSetup();

function basketSetup(){
    debugger;
    let beerList = JSON.parse(sessionStorage.getItem("selectedBeers"));
    let amountOfOrders = 0;
    let totalPrice = 0;
    
    beerList.forEach(beerOrder => {
        if(beerOrder.amount != 0){
            amountOfOrders += beerOrder.amount;
            totalPrice += showOrder(beerOrder);
        }
    });

    document.querySelector(".basket_total_orders").innerHTML = "DIN BESTILLING (" + amountOfOrders  + " varer)";
    document.querySelector(".total_amount_right").innerHTML = totalPrice + " dkk"
}



function showOrder(beerOrder){
    const clone = document.querySelector(".basket_template").content.cloneNode(true);
    clone.querySelector(".basket_beer_picture").src = beerOrder.picture;
    clone.querySelector(".basket_beer_name").textContent = beerOrder.name;
    clone.querySelector(".basket_amount").textContent = "Antal: " + beerOrder.amount + " x " + beerOrder.price + " dkk";
    let lineTotal = beerOrder.amount * beerOrder.price;
    clone.querySelector(".basket_line_total").textContent = lineTotal + " dkk";
    document.querySelector(".basket_container").appendChild(clone);
    return lineTotal;

}

