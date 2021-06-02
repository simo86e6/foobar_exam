"use strict";
import './style_form.scss'

const orderUrl = "https://foobar-examproject.herokuapp.com/order";

let herokuOrder = [];
let restOrder = [];
document.querySelector("#total_price").innerHTML = sessionStorage.getItem("totalPrice") + " dkk";

let orderedBeers = JSON.parse(sessionStorage.getItem("selectedBeers"));
document.querySelector("#finalize_purches").addEventListener("click", formFilledCheck);


document.querySelector("#month").addEventListener("keypress", monthInputHandler);
document.querySelector("#year").addEventListener("keypress", yearInputHandler);
document.querySelector("#number").addEventListener("keypress", cardNumberHandler);


formatToHeroku();
formatToRest();

function formFilledCheck(event){

  let isNameFilled = false;
  let nameValue = document.querySelector("#full_name").value;
  if(nameValue != ""){
    isNameFilled = true;
  }

  let isCardNumberFilled = false;
  let CardNumberValue = document.querySelector("#number").value;
  if(CardNumberValue.length == 19){
    isCardNumberFilled = true;
  }

  let isMonthFilled = false;
  let monthValue = document.querySelector("#month").value;
  if(monthValue.length == 2){
    isMonthFilled = true;
  }

  let isYearFilled = false;
  let yearValue = document.querySelector("#year").value;
  if(yearValue.length == 2){
    isYearFilled = true;
  }

  let isSecureFilled = false;
  let secureValue = document.querySelector("#secure").value;
  if(secureValue.length == 3){
    isSecureFilled = true;
  }

  if(isNameFilled && isCardNumberFilled && isMonthFilled && isYearFilled && isSecureFilled){
    // debugger;
    event.preventDefault();
    postHeroku()
  }

}

function cardNumberHandler(event){

  let value = this.value;
  value = value.replaceAll(" ", "");
  let valueLength = value.length;
  let pressedKey = event.key;
  let isNummber = /^\d+$/.test(pressedKey);
  if(!isNummber || valueLength == 16){
    event.preventDefault();
    return;
  }

  if(valueLength % 4 == 0 && valueLength != 0){
     this.value += " ";
  }
}

function yearInputHandler(event){

  let pressedKey = event.key;
  let isNummber = /^\d+$/.test(pressedKey);
  if(!isNummber){
    event.preventDefault();
    return;
  }

  if(this.value.length == 0){
    if(pressedKey != "2"){
      event.preventDefault();
      return;
    }
  }

  if(this.value.length == 1 && parseInt(pressedKey) < 1){
      event.preventDefault();
      return;
  }

  if(this.value.length==2) {
    event.preventDefault();
  }

}

function monthInputHandler(event){
 
  let pressedKey = event.key;
  let isNummber = /^\d+$/.test(pressedKey);
  if(!isNummber){
    event.preventDefault();
    return;
  }

  if(this.value.length == 0){
    if(pressedKey != "0" && pressedKey != "1"){
      event.preventDefault();
      return;
    }
  }

  if(this.value.length == 1){
    if(this.value == "0" && pressedKey == "0"){
      event.preventDefault();
      return;
    } else if(this.value == "1" && parseInt(pressedKey) > 2){
      event.preventDefault();
      return;
    }
  
  }

  if(this.value.length==2) {
    event.preventDefault();
  }
}

function formatToHeroku(){
  let herokuBeerInfo = {
    name: "",
    amount: ""
}
    orderedBeers.forEach(beer => {
        if(beer.amount > 0){
            let herokuBeer = Object.create(herokuBeerInfo);
            herokuBeer.name = beer.name;
            herokuBeer.amount = beer.amount;
            herokuOrder.push(herokuBeer);
        }
    });
}

function formatToRest(){
  let restDbBeerInfo = {
    name: "",
    amount: "",
    price: ""
}
orderedBeers.forEach(beer => {
  if(beer.amount > 0){
      let restBeer = Object.create(restDbBeerInfo);
      restBeer.name = beer.name;
      restBeer.amount = beer.amount;
      restBeer.price = beer.price;
      restOrder.push(restBeer);
  }
});

}

async function postHeroku() {
  // debugger;
    let herokuOrderString = JSON.stringify(herokuOrder);

    let postOrder = await fetch(orderUrl, {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: herokuOrderString
    });

    let response = await postOrder.json();
    let orderId = response.id;
    sessionStorage.setItem("orderId", orderId);

    saveInRestDb(orderId);
  }

  async function saveInRestDb(orderId){
    
    let userName = sessionStorage.getItem("userName");
    let payload = {
      order: restOrder,
      name: userName,
      orderId: orderId,
      subTotal: sessionStorage.getItem("totalPrice"),
      placementTime: new Date()
    }

    let url = "https://foobar-4ea8.restdb.io/rest/receipt";
    let apiKey = "60b6304c318a330b62f58925";
    const postData = JSON.stringify(payload);
    let response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-apikey": apiKey,
        "cache-control": "no-cache",
      },
      body: postData,
    });

    window.location.href=('bekraeftelse.html');
}
