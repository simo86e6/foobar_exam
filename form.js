"use strict";
import './style_form.scss'
import './partials/_menu.scss'

getData();

async function getData() {
    
    let response = await fetch("https://foobar-examproject.herokuapp.com/beertypes");
    let jsonData = await response.json();
    fetchList(jsonData);
    
  }
  

  function fetchList(data) {
    console.log("fetchList");
    document.querySelector(".beer_container").innerHTML = "";
    data.forEach(displayBeers);
    let elements = document.getElementsByClassName("show_text");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", toggleMoreBody)
    }
}

function toggleMoreBody(){
    let element = this;
    let parent = element.parentElement;
    let sibling = parent.nextElementSibling;
    let elementToToggle = sibling.children[0];
    elementToToggle.classList.toggle("hide");
}


       

  function displayBeers(data) {
    console.log("displayBeers");
  
    const clone = document.querySelector(".product_temp").content.cloneNode(true);
    
    switch(data.name){
        case "El Hefe":
            clone.querySelector(".beer_glass").src = "img/glass/elhefe_glass.png";
            clone.querySelector(".beer_price").textContent = "29.95 dkk";
            break;
        case "Fairy Tale Ale":
            clone.querySelector(".beer_glass").src = "img/glass/fairytale_glass.png";
            clone.querySelector(".beer_price").textContent = "49.95 dkk";
            break;
        case "GitHop":
            clone.querySelector(".beer_glass").src = "img/glass/githop_glass.png";
            clone.querySelector(".beer_price").textContent = "39.95 dkk";
            break;
        case "Hollaback Lager":
            clone.querySelector(".beer_glass").src = "img/glass/hollabeck_glass.png";
            clone.querySelector(".beer_price").textContent = "44.95 dkk";
            break;
        case "Hoppily Ever After":
            clone.querySelector(".beer_glass").src = "img/glass/hoppily_glass.png";
            clone.querySelector(".beer_price").textContent = "34.95 dkk";
            break;
        case "Mowintime":
            clone.querySelector(".beer_glass").src = "img/glass/mowintime_glass.png";
            clone.querySelector(".beer_price").textContent = "44.95 dkk";
            break;
        case "Row 26":
            clone.querySelector(".beer_glass").src = "img/glass/row_glass.png";
            clone.querySelector(".beer_price").textContent = "54.95 dkk";
            break;
        case "Ruined Childhood":
            clone.querySelector(".beer_glass").src = "img/glass/ruined_glass.png";
            clone.querySelector(".beer_price").textContent = "64.95 dkk";
            break;
        case "Sleighride":
            clone.querySelector(".beer_glass").src = "img/glass/sleighride_glass.png";
            clone.querySelector(".beer_price").textContent = "29.95 dkk";
            break;
        case "Steampunk":
            clone.querySelector(".beer_glass").src = "img/glass/steampunk_glass.png";
            clone.querySelector(".beer_price").textContent = "24.95 dkk";
            break;     
    }
    clone.querySelector(".beer_name").textContent = data.name;
    clone.querySelector(".alcohol_procent").textContent = "Alkohol" + data.alc + "%";
    clone.querySelector(".beer_aroma").textContent = data.description.aroma;
    clone.querySelector(".beer_appearance").textContent = data.description.appearance;
    clone.querySelector(".beer_mouth_feel").textContent = data.description.mouthfeel;
    clone.querySelector(".beer_flavour").textContent = data.description.flavor;
    clone.querySelector(".beer_overall").textContent = data.description.overallImpression;
  
    document.querySelector(".beer_container").appendChild(clone);
  }
  