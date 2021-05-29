"use strict";
import './style_form.scss'

const beerInfoUrl = "https://foobar-examproject.herokuapp.com/beertypes";
const barStatsUrl = "https://foobar-examproject.herokuapp.com/";

let beerList = [];
let beerNamesOnTap = [];


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
  amount: 0,
  isOnTap: false
}



getData();


async function getData() {
    const getBarStats = await fetch(barStatsUrl);
    let barStats = await getBarStats.json();

    const getBeerInfo = await fetch(beerInfoUrl);
    let beerInfo = await getBeerInfo.json();

    fetchList(beerInfo, barStats);
    redirectToBasket();
  }

  function redirectToBasket(){
      let links = document.querySelectorAll(".link_basket");
      links.forEach(link => {
        link.addEventListener("click", function(){
          debugger;
          let beerListString = JSON.stringify(beerList);
          sessionStorage.setItem("selectedBeers", beerListString);
          window.location.href = "kurv.html";
        });
      });
  }
  
  function fetchList(beerInfo, barStats) {
    console.log("fetchList");
    debugger;
    document.querySelector(".beer_container").innerHTML = "";
    if ("selectedBeers" in sessionStorage) {
      beerList = JSON.parse(sessionStorage.getItem("selectedBeers"));
      let amount = 0;
      beerList.forEach(beer => {
        if(beer.amount > 0){
          amount += beer.amount;
        }
      });
      document.querySelector("#amount_in_basket").innerHTML = amount;
  } else {
    beerInfo.forEach(createBeerObject);
  }
    beersOnTap(barStats);
    updateBeerAmount(barStats);
}

function beersOnTap(barStats){
  let taps = barStats.taps;
  taps.forEach(tap => {
    let tapName = tap.beer;
    beerNamesOnTap.push(tapName);
  });
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

      if(!beerNamesOnTap.includes(beerObject.name)){
        clone.querySelector(".add_to_basket").textContent = "Not on tap";
      } else {
        clone.querySelector("#test").addEventListener("click", function () {
          let counterDisplayParent = this.previousElementSibling;
          let counterDisplay = counterDisplayParent.children[1];
          beerObject.amount += parseInt(counterDisplay.innerHTML);
          let amountInBasket = parseInt(document.querySelector("#amount_in_basket").innerHTML);
          amountInBasket += parseInt(counterDisplay.innerHTML);
          document.querySelector("#amount_in_basket").innerHTML = amountInBasket;
  
          counterDisplay.innerHTML = 0;
        });
      }

    document.querySelector(".beer_container").appendChild(clone);
  }




 
  

