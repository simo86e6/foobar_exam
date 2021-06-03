"use strict";
import './style_form.scss'


displayReceipts();

async function displayReceipts(){
    let userName = sessionStorage.getItem("userName");
    let url = 'https://foobar-4ea8.restdb.io/rest/receipt?q={"name": "' + userName +'"}';
    let apiKey = "60b6304c318a330b62f58925";
    let response = await fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-apikey": apiKey,
          "cache-control": "no-cache",
        },
      });
      
    const receipts = await response.json();
    receipts.sort(function(a, b){return b.orderId - a.orderId});
    receipts.forEach(receipt => {
        const clone = document.querySelector(".receipt_template").content.cloneNode(true);
        clone.querySelector(".receipt_order_number").textContent = receipt.orderId;
        let timeFormatted = new Date(receipt.placementTime);
        let month = timeFormatted.getMonth() + 1;
        if(month < 10){
          month = "0" + month;
        }
        let date = timeFormatted.getDate();
        if(date < 10){
          date = "0" + date;
        }
        let year = timeFormatted.getFullYear();
        let hour = timeFormatted.getHours();
        if(hour < 10){
          hour = "0" + hour;
        }
        let minute = timeFormatted.getMinutes();
        if(minute < 10){
          minute = "0" + minute;
        }
        let second = timeFormatted.getSeconds();
        if(second < 10){
          second = "0" + second;
        }
        let timestamp = month + "-" + date + "-" + year + " - " + hour + ":" + minute + ":" + second; 
        clone.querySelector(".receipt_order_time").textContent = timestamp;
        clone.querySelector(".receipt_subtotal").textContent = receipt.subTotal;
        document.querySelector(".receipt_container").appendChild(clone);
        });
    

    
}