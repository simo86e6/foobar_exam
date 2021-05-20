"use strict";
import './styles.scss'

const barStatsUrl = "https://foobar-examproject.herokuapp.com/";
const beerInfoUrl = "https://foobar-examproject.herokuapp.com/beertypes";

let orderFinishedList = [];
let orderQueueList = [];
let orderInProgressList = [];

getData();



async function getData(){

    const getBarStats = await fetch(barStatsUrl);
    const barStats = await getBarStats.json();
    displayStats(barStats);

    const getBeerInfo = await fetch(beerInfoUrl);
    const beerInfo = await getBeerInfo.json();

    let queueLength = barStats.queue.length;
    console.log("Queue Length: " + queueLength);

}

function displayStats(barStats){

    // updateTime(barStats);
    updateCountdown(barStats);
    updateBartenders(barStats);
    updateQueue(barStats);
    updateOrders(barStats);
    // updateStorage(barStats);
     
  

    

    setTimeout(getData, 1000);
   

}

// function updateStorage(barStats){
//     document.getElementById("storage").innerHTML = "";
//     let beerTypes = barStats.taps;
//     //Dette sortere hver tap efter hvor meget øl de har tilbage (lavest først i arrayet)
//     beerTypes.sort(function(a, b){return a.level - b.level});

//     let lowestLevels = beerTypes.slice(0, 3);

//     let counter = 1;
//     lowestLevels.forEach(beerType => {
//         debugger;
//         let elementId = "stock" + counter + "_img";
//         let imgSrc = "/img/" + beerType.beer + ".jpg";
//         document.getElementById(elementId).src = imgSrc;
//         document.getElementById("stock1_name").innerHTML = beerType.name;
//         document.getElementById("stock1_level").innerHTML = beerType.level;
//         document.getElementById("stock1_kegs").innerHTML = 3;

//         counter++;
//     });
    
// }



// Denne funktion står for at lave en div til hver bartender
// samt udfylde div'en med diverse informationer
function updateBartenders(barStats){
    document.getElementById("bartenders").innerHTML = "";
    barStats.bartenders.forEach(bartender => {
        
        const bartenderDiv = document.createElement("div");

        const bartenderImg = document.createElement("img");
        bartenderImg.className = "bartender_pictures";
        bartenderImg.src = "/img/" + bartender.name + ".png";
       

        const name = document.createElement("p");
        name.innerHTML = bartender.name;

        const status = document.createElement("p");
        status.innerHTML = bartender.status;

        const statusDetail = document.createElement("p");
        statusDetail.innerHTML = bartender.statusDetail;

        let tap = bartender.usingTap
        const usingTap = document.createElement("p");
        if(tap === null){
            usingTap.innerHTML = "N/A";
        } else {
            usingTap.innerHTML = barStats.taps[tap].beer;
        }

        const servingCustomer = document.createElement("p");
        servingCustomer.innerHTML = bartender.servingCustomer;

        bartenderDiv.appendChild(bartenderImg);
        bartenderDiv.appendChild(name);
        bartenderDiv.appendChild(status);
        bartenderDiv.appendChild(statusDetail);
        bartenderDiv.appendChild(usingTap);
        bartenderDiv.appendChild(servingCustomer);
        document.getElementById("bartenders").appendChild(bartenderDiv);

    });

}
//Denne funktion viser dataen i "Bestillinger i kø..." 
function updateQueue(barStats){
    document.getElementById("beer_pictures").innerHTML = "";
    let queueLength = barStats.queue.length;

    document.getElementById("queue_number").innerHTML = queueLength;

    for (let i = 0; i < queueLength; i++) {
        
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
        if(queueCount < 5){
            const pTag = document.createElement("p");
            pTag.innerHTML = order.id;
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

//   function updateTime(barStats){
//       let hourHand = document.getElementById("hourHand");
//       let minuteHand = document.getElementById("minuteHand");
//       let secondHand = document.getElementById("secondHand");

//       let date = new Date();
//       let hour = date.getHours() % 12;
//       let minute = date.getMinutes();
//       let second = date.getSeconds();

//       let hourDeg = hour * 30;
//       let minuteDeg = minute * 6;
//       let secondDeg = second * 6;

//       hourHand.style.transform = "rotate(" + hourDeg + "deg)";
//       minuteHand.style.transform = "rotate(" + minuteDeg + "deg)";
//       secondHand.style.transform = "rotate(" + secondDeg + "deg)";

    

//   }



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
