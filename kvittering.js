"use strict";
import './style_form.scss'


displayReceipts();

async function displayReceipts(){
    // debugger;
    let userName = "Simone";
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
    receipts.forEach(receipt => {
        const clone = document.querySelector(".receipt_template").content.cloneNode(true);
        clone.querySelector(".receipt_order_number").textContent = receipt.orderId;
        // clone.querySelector(".receipt_order_time").textContent = receipt.orderTime;
        clone.querySelector(".receipt_subtotal").textContent = receipt.subTotal;
        document.querySelector(".receipt_container").appendChild(clone);
        });
    

    
}