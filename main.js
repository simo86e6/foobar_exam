"use strict";
import './styles.scss'

const barStatsUrl = "https://foobar-examproject.herokuapp.com/";

let orderFinishedList = [];
let orderQueueList = [];
let orderInProgressList = [];

let counter = 0;




getData();

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
    updateTime(barStats);
     
    setTimeout(getData, 1000);
   

}

function updateBartenders(barStats){
    let bartenderContents = document.querySelectorAll(".content");

    for (let i = 0; i < bartenderContents.length; i++) {
        
        bartenderContents[i].querySelector('.each_bartender').src = "/img/" + barStats.bartenders[i].name + ".png";
        bartenderContents[i].querySelector('.bartender_name').textContent = barStats.bartenders[i].name;
        bartenderContents[i].querySelector('.bartender_status').textContent = barStats.bartenders[i].status;
        bartenderContents[i].querySelector('.bartender_statusdetail').textContent = barStats.bartenders[i].statusDetail;

        let tap = barStats.bartenders[i].usingTap
        if(tap === null){
            bartenderContents[i].querySelector('.bartender_usingtap').textContent = "N/A";
        } else {
            bartenderContents[i].querySelector(".bartender_usingtap").textContent = barStats.taps[tap].beer;
        }

        bartenderContents[i].querySelector(".bartender_servingcustomer").textContent = barStats.bartenders[i].servingCustomer;
        
    }
}

// Denne funktion udfylder bartender-templaten og appender den til dashboardet
function initBartenders(barStats){
    document.querySelector(".bartender_content").innerHTML = "";
    barStats.bartenders.forEach(bartender => {
        const clone = document.querySelector(".temp_bartenders").content.cloneNode(true);
        // clone.querySelector(".content").classList.add("show_" + bartender.name);
        clone.querySelector(".each_bartender").src = "/img/" + bartender.name + ".png";
        clone.querySelector(".bartender_name").textContent = bartender.name;
        clone.querySelector(".bartender_status").textContent = bartender.status;
        clone.querySelector(".bartender_statusdetail").textContent = bartender.statusDetail;

        let tap = bartender.usingTap
        if(tap === null){
            clone.querySelector(".bartender_usingtap").textContent = "N/A";
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
    img.src = "/img/beer-mug.png";
    document.getElementById("beer_pictures").appendChild(img);
    }

    


}
// Denne funktion viser dataerne som står under "Bestillinger" på dashboardet
function updateOrders(barStats){
    document.getElementById("order_queue").innerHTML = "";
    document.getElementById("order_in_progress").innerHTML = "";
    document.getElementById("order_finished").innerHTML = "";
    orderQueueList = barStats.queue;
    orderInProgressList = barStats.serving;
    
    //Denne del tager sig af at vise de bestillinger som er i kø
    let queueCount = 0;
    orderQueueList.forEach(order => {
        if(queueCount < 1){
            const pTag = document.createElement("p");
            pTag.innerHTML = order.id;
            document.getElementById("order_queue").appendChild(pTag);
            queueCount++;
        } else if(queueCount == 1){
            const pTag = document.createElement("p");
            pTag.innerText = "...";
            document.getElementById("order_queue").appendChild(pTag);
            queueCount++;
        }
    });

    // Denne del tager sig af at vise de bestillinger som bartenderne arbejder på lige nu.
    orderInProgressList.forEach(order => {

        const pTag = document.createElement("p");
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
                pTag.innerHTML = id;
                document.getElementById("order_finished").appendChild(pTag);
                finishedCount++;
            }
            
        }
    
    });
    

}

//Denne funtion får de analog ur til at gå efter normaltid
function updateTime(barStats){
    let hourHand = document.getElementById("hourHand");
    let minuteHand = document.getElementById("minuteHand");
    let secondHand = document.getElementById("secondHand");

    let date = new Date();
    let hour = date.getHours() % 12;
    let minute = date.getMinutes();
    let second = date.getSeconds();

    let hourDeg = hour * 30;
    let minuteDeg = minute * 6;
    let secondDeg = second * 6;

    hourHand.style.transform = "rotate(" + hourDeg + "deg)";
    minuteHand.style.transform = "rotate(" + minuteDeg + "deg)";
    secondHand.style.transform = "rotate(" + secondDeg + "deg)";

  

}



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
    let ts = barStats.timestamp;
    let date = new Date(ts);
    let closingTime = new Date();
    closingTime.setHours(22, 0, 0);

    let timeToClose = Math.abs(closingTime - date);
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

        let imgSrc = "/img/kegs/" + lowestLevels[i].beer + ".png";
        document.getElementById(imgElementId).src = imgSrc;
        document.getElementById(nameElementId).innerHTML = lowestLevels[i].beer;
        document.getElementById(levelElementId).innerHTML = lowestLevels[i].level;
        document.getElementById(kegElementId).innerHTML = 3;

        
    }
   
}

// function hideBartenders(){
//     debugger;
//    let bartenders = document.querySelectorAll(".content");
//    bartenders.forEach(bartender => {
//        bartender.classList.add("jonas");
//    });
// }




                    