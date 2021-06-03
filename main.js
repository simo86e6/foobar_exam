"use strict";
import './styles.scss'

window.addEventListener("DOMContentLoaded", getData);

const barStatsUrl = "https://foobar-examproject.herokuapp.com/";

let orderFinishedList = [];
let orderQueueList = [];
let orderInProgressList = [];

let counter = 0;

async function getData(){
   
    const getBarStats = await fetch(barStatsUrl);
    let barStats = await getBarStats.json();
    displayStats(barStats);
}

function bartenderRotation(){
   
        let bartenders = document.querySelectorAll(".content");
        if(counter >= bartenders.length){
            counter = 0;
        }
        for (let i = 0; i < bartenders.length; i++) {
            if(i == counter){
                bartenders[i].classList.remove("hide");
            } else {
                bartenders[i].classList.add("hide");
            }
        }
        counter++;
    setTimeout(bartenderRotation, 10000);
    
}

function displayStats(barStats){

    // updateTime(barStats);
    updateCountdown(barStats);
    if(document.querySelector(".bartender_content").children.length == 0){
        initBartenders(barStats);
    } else{
        updateBartenders(barStats);
    }
    
    updateQueue(barStats);
    updateOrders(barStats);
    updateStorage(barStats);
    // updateTime(barStats);
     
    setTimeout(getData, 1000);
   

}

function updateBartenders(barStats){
    let bartenderContents = document.querySelectorAll(".content");

    for (let i = 0; i < bartenderContents.length; i++) {
        
        bartenderContents[i].querySelector('.each_bartender').src = "../img/" + barStats.bartenders[i].name + ".png";
        bartenderContents[i].querySelector('.bartender_name').textContent = barStats.bartenders[i].name;
        // bartenderContents[i].querySelector('.bartender_status').textContent = barStats.bartenders[i].status;
        if(barStats.bartenders[i].statusDetail === "receivePayment"){
            bartenderContents[i].querySelector('.bartender_statusdetail').textContent = "Recieving payment";
        } else if (barStats.bartenders[i].statusDetail === "pourBeer") {
            bartenderContents[i].querySelector('.bartender_statusdetail').textContent = "Pouring beer";
        } else if (barStats.bartenders[i].statusDetail === "waiting") {
            bartenderContents[i].querySelector('.bartender_statusdetail').textContent = "Waiting";
        } else if (barStats.bartenders[i].statusDetail === "startServing") {
            bartenderContents[i].querySelector('.bartender_statusdetail').textContent = "Started serving";
        } else if (barStats.bartenders[i].statusDetail === "reserveTap") {
            bartenderContents[i].querySelector('.bartender_statusdetail').textContent = "Reserving tap";
        } else if (barStats.bartenders[i].statusDetail === "releaseTap") {
            bartenderContents[i].querySelector('.bartender_statusdetail').textContent = "Releasing tap";
        } else if (barStats.bartenders[i].statusDetail === "endServing") {
            bartenderContents[i].querySelector('.bartender_statusdetail').textContent = "Finished serving";
        } else if (barStats.bartenders[i].statusDetail === "replaceKeg") {
            bartenderContents[i].querySelector('.bartender_statusdetail').textContent = "Replacing Keg";
        }

        let tap = barStats.bartenders[i].usingTap
        if(tap === null){
            bartenderContents[i].querySelector('.bartender_usingtap').textContent = "Not pouring";
        } else {
            bartenderContents[i].querySelector(".bartender_usingtap").textContent = barStats.taps[tap].beer;
        }

        if(barStats.bartenders[i].servingCustomer === null){
            bartenderContents[i].querySelector(".bartender_servingcustomer").textContent = "Not serving";
        } else {
            bartenderContents[i].querySelector(".bartender_servingcustomer").textContent = barStats.bartenders[i].servingCustomer;
        }

        
        
    }
}

// Denne funktion udfylder bartender-templaten og appender den til dashboardet
function initBartenders(barStats){
    document.querySelector(".bartender_content").innerHTML = "";
    barStats.bartenders.forEach(bartender => {
        const clone = document.querySelector(".temp_bartenders").content.cloneNode(true);
        // clone.querySelector(".content").classList.add("show_" + bartender.name);
        clone.querySelector(".each_bartender").src = "../img/" + bartender.name + ".png";
        clone.querySelector(".bartender_name").textContent = bartender.name;
        // clone.querySelector(".bartender_status").textContent = bartender.status;
        clone.querySelector(".bartender_statusdetail").textContent = bartender.statusDetail;

        let tap = bartender.usingTap
        if(tap === null){
            clone.querySelector(".bartender_usingtap").textContent = "Not pouring";
        } else {
            clone.querySelector(".bartender_usingtap").textContent = barStats.taps[tap].beer;
        }

        clone.querySelector(".bartender_servingcustomer").textContent = bartender.servingCustomer;
        document.querySelector(".bartender_content").appendChild(clone);
    });
    bartenderRotation();
}
//Denne funktion viser dataen i "Bestillinger i kø..." 
function updateQueue(barStats){
    document.getElementById("beer_pictures").innerHTML = "";
    let queueLength = barStats.queue.length;

    document.getElementById("queue_number").innerHTML = queueLength;

    for (let i = 0; i < queueLength; i++) {
        if(i >= 5){
            const pTag = document.createElement("p");
            pTag.innerText = "...";
            document.getElementById("beer_pictures").appendChild(pTag);
            return;
        }
        
    const img = document.createElement("img");
    img.className = "beer_picture";
    img.src = "../img/beer-mug.png";
    document.getElementById("beer_pictures").appendChild(img);
    }

    


}
// Denne funktion viser dataerne som står under "Bestillinger" på dashboardet
function updateOrders(barStats){
    let highlightOrders = [];
    if ("orderIds" in sessionStorage){
        highlightOrders = JSON.parse(sessionStorage.getItem("orderIds"));
    }
    document.getElementById("order_queue").innerHTML = "";
    document.getElementById("order_in_progress").innerHTML = "";
    document.getElementById("order_finished").innerHTML = "";
    orderQueueList = barStats.queue;
    orderInProgressList = barStats.serving;
    
    //Denne del tager sig af at vise de bestillinger som er i kø
    let queueCount = 0;
    orderQueueList.forEach(order => {
        if(queueCount < 5){
            const pTag = document.createElement("p");
            if(highlightOrders.includes(order.id)){
                pTag.classList.add("highlight");
            }
            pTag.innerHTML = order.id;
            document.getElementById("order_queue").appendChild(pTag);
            queueCount++;
        } else if(queueCount == 5){
            const pTag = document.createElement("p");
            pTag.innerText = "...";
            document.getElementById("order_queue").appendChild(pTag);
            queueCount++;
        }
    });

    // Denne del tager sig af at vise de bestillinger som bartenderne arbejder på lige nu.
    orderInProgressList.forEach(order => {

        const pTag = document.createElement("p");
        if(highlightOrders.includes(order.id)){
            pTag.classList.add("highlight");
        }
        pTag.innerHTML = order.id;
        document.getElementById("order_in_progress").appendChild(pTag);
        if(!orderFinishedList.includes(order.id)){
            orderFinishedList.unshift(order.id);
        }
        
    });

    //Denne del tager sig af at vise de seneste 5 bestillinger som er blevet lavet.
    let x = document.querySelector("#order_in_progress").childNodes;
    let temp = [];

    x.forEach(element => {
        temp.push(element.innerHTML);
    });
   
    let finishedCount = 0;
    orderFinishedList.forEach(id => {
        if(!temp.includes(id.toString())){
            if(finishedCount < 5){
                const pTag = document.createElement("p");
                if(highlightOrders.includes(id)){
                    pTag.classList.add("highlight");
                }
                pTag.innerHTML = id;
                document.getElementById("order_finished").appendChild(pTag);
                finishedCount++;
            }
            
        }
    
    });
    

}

//Denne funtion får de analog ur til at gå efter normaltid
// 

const deg = 6;
                  const hr = document.querySelector('#hr');
                  const mn = document.querySelector('#mn');
                  const sc = document.querySelector('#sc');
                  
                  setInterval(() =>{
                      
                       let day = new Date();
                  let hh = day.getHours() * 30;
                  let mm = day.getMinutes() * deg;
                  let ss = day.getSeconds() * deg;
                  
                  hr.style.transform = `rotateZ(${(hh)+(mm/12)}deg)`;
                  mn.style.transform = `rotateZ(${mm}deg)`;
                  sc.style.transform = `rotateZ(${ss}deg)`;
                      
                  })


// Denne funktion laver nedtællingen
function updateCountdown(barStats){
    // let ts = barStats.timestamp;
    // let date = new Date(ts);
    let currentTime = new Date();
    let closingTime = new Date();
    closingTime.setHours(22, 0, 0);

    let timeToClose = Math.abs(closingTime - currentTime);
    timeToClose = msToTime(timeToClose);


    document.getElementById("countdown").innerHTML = timeToClose;


}
// Denne funktion nedbryder millisekunder til timer:minutter:sekunder som updateCountdown() bruger
function msToTime(s) {

    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    if(secs < 10){
        secs = "0" + secs;
    }
    if(mins < 10){
        mins = "0" + mins;
    }
    if(hrs < 10){
        hrs = "0" + hrs;
    }
  
    return hrs + ':' + mins + ':' + secs;
  }

  function updateStorage(barStats){

    let beerTypes = barStats.taps;
    //Dette sortere hver tap efter hvor meget øl de har tilbage (lavest først i arrayet)
    beerTypes.sort(function(a, b){return a.level - b.level});

    let lowestLevels = beerTypes.slice(0, 3);

   

    for (let i = 0; i < lowestLevels.length; i++) {
        
        let nameElementId = "stock" + i + "_name";
        let levelElementId = "stock" + i + "_level";
        let kegElementId = "stock" + i + "_kegs";
        let imgElementId = "stock" + i + "_img";

        let imgSrc = "../img/kegs/" + lowestLevels[i].beer + ".png";
        document.getElementById(imgElementId).src = imgSrc;
        document.getElementById(nameElementId).innerHTML = lowestLevels[i].beer;
        document.getElementById(levelElementId).innerHTML = lowestLevels[i].level;
        // document.getElementById(kegElementId).innerHTML = 3;

        
    }
   
}




                    