"use strict";
import './style_form.scss'

// export function fetchList() {

// }

let beerList = [];

let Beer = {
  name: "",
  price: "",
  aroma: "",
  alcohol: "",
  appearance: "",
  flavor: "",
  overall: "",
  mouthfeel: "",
  picture: "",
  amount: 0
}

getData();

async function getData() {
    
    let response = await fetch("https://foobar-examproject.herokuapp.com/beertypes");
    let jsonData = await response.json();
    fetchList(jsonData);
    
  }
  

  function fetchList(data) {
    console.log("fetchList");
    document.querySelector(".beer_container").innerHTML = "";
    data.forEach(createBeerObject);
    updateBeerAmount();
  
}

function updateBeerAmount(){
    document.querySelector(".beer_container").innerHTML = "";
    beerList.forEach(displayBeers);
    
}

function createBeerObject(data){
    let beer = Object.create(Beer);
    beer.name = data.name;
    beer.price = 50;
    beer.aroma = data.description.aroma;
    beer.alcohol = data.alc;
    beer.appearance = data.description.appearance;
    beer.flavor = data.description.flavor;
    beer.overall = data.description.overallImpression;
    beer.mouthfeel = data.description.mouthfeel;
    beer.picture = "img/glass/" + data.label;
    beerList.push(beer);
}

  function displayBeers(beerObject) {
    console.log("displayBeers");
    const clone = document.querySelector(".product_temp").content.cloneNode(true);
    clone.querySelector(".beer_name").textContent = beerObject.name;
    clone.querySelector(".beer_glass").src = beerObject.picture;
    clone.querySelector(".beer_price").textContent = beerObject.price + " dkk";
    clone.querySelector(".alcohol_procent").textContent = "Alkohol " + beerObject.alcohol + "%";
    clone.querySelector(".beer_aroma").textContent = beerObject.aroma;
    clone.querySelector(".beer_appearance").textContent = beerObject.appearance;
    clone.querySelector(".beer_mouth_feel").textContent = beerObject.mouthfeel;
    clone.querySelector(".beer_flavour").textContent = beerObject.flavor;
    clone.querySelector(".beer_overall").textContent = beerObject.overall;
    clone.querySelector(".counter_display").textContent = 0;
    clone.querySelector(".counter_plus").addEventListener("click", function () {
        let counterDisplay = this.previousElementSibling;
        let currentCount = counterDisplay.innerHTML;
        currentCount++;
        counterDisplay.innerHTML = currentCount.toString();
      });
    clone.querySelector(".counter_minus").addEventListener("click", function () {
        let counterDisplay = this.nextElementSibling;
        let currentCount = counterDisplay.innerHTML;
        if(currentCount >= 1){
          currentCount--;
          counterDisplay.innerHTML = currentCount.toString();
        }
      });
      clone.querySelector(".collapsible").addEventListener("click", function () {
        let parent = this.parentElement;
        let sibling = parent.nextElementSibling;
        sibling.classList.toggle("hide");
      });
      clone.querySelector("#test").addEventListener("click", function () {
        debugger;
        let counterDisplayParent = this.previousElementSibling;
        let counterDisplay = counterDisplayParent.children[1];
        beerObject.amount += parseInt(counterDisplay.innerHTML);
        let amountInBasket = parseInt(document.querySelector("#amount_in_basket").innerHTML);
        amountInBasket += parseInt(counterDisplay.innerHTML);
        document.querySelector("#amount_in_basket").innerHTML = amountInBasket;

        counterDisplay.innerHTML = 0;

      });
  
    document.querySelector(".beer_container").appendChild(clone);
  }


 
  

