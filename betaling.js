"use strict";
import './style_form.scss'

const orderUrl = "https://foobar-examproject.herokuapp.com/order";

let herokuBeerInfo = {
    name: "",
    amount: ""
}

let herokuOrder = [];

formatToHeroku();

function formatToHeroku(){
    debugger;
    let orderedBeers = JSON.parse(sessionStorage.getItem("selectedBeers"));
    orderedBeers.forEach(beer => {
        if(beer.amount > 0){
            let herokuBeer = Object.create(herokuBeerInfo);
            herokuBeer.name = beer.name;
            herokuBeer.amount = beer.amount;
            herokuOrder.push(herokuBeer);
        }
    });
}

document.querySelector("#finalize_purches").addEventListener("click", postHeroku);


async function postHeroku() {
    debugger;
    let herokuOrderString = JSON.stringify(herokuOrder);

    let postOrder = await fetch(orderUrl, {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: herokuOrderString
    });

    let response = await postOrder.json();
    debugger;
    let orderId = response.id;
    sessionStorage.setItem("orderId", orderId);
    window.location.href=('bekraeftelse.html');
  }