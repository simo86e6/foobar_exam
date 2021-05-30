"use strict";

displayReceipts();

function displayReceipts(){
    if ("completedOrders" in localStorage){
        let receipts = JSON.parse(localStorage.getItem("completedOrders"));
        receipts.forEach(receipt => {
            const clone = document.querySelector(".receipt_template").content.cloneNode(true);
            clone.querySelector(".receipt_order_number").textContent = receipt.orderNumber;
            clone.querySelector(".receipt_order_time").textContent = receipt.orderTime;
            clone.querySelector(".receipt_subtotal").textContent = receipt.subTotal;

            document.querySelector(".receipt_container").appendChild(clone);
        });
    }

    
}