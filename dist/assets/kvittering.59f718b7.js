/* empty css                   */!async function(){let e='https://foobar-4ea8.restdb.io/rest/receipt?q={"name": "'+sessionStorage.getItem("userName")+'"}',t=await fetch(e,{method:"get",headers:{"Content-Type":"application/json; charset=utf-8","x-apikey":"60b6304c318a330b62f58925","cache-control":"no-cache"}});const o=await t.json();o.sort((function(e,t){return t.orderId-e.orderId})),o.forEach((e=>{const t=document.querySelector(".receipt_template").content.cloneNode(!0);t.querySelector(".receipt_order_number").textContent=e.orderId;let o=new Date(e.placementTime),r=o.getMonth()+1;r<10&&(r="0"+r);let n=o.getDate();n<10&&(n="0"+n);let c=o.getFullYear(),a=o.getHours();a<10&&(a="0"+a);let l=o.getMinutes();l<10&&(l="0"+l);let s=o.getSeconds();s<10&&(s="0"+s);let i=r+"-"+n+"-"+c+" - "+a+":"+l+":"+s;t.querySelector(".receipt_order_time").textContent=i,t.querySelector(".receipt_subtotal").textContent=e.subTotal,document.querySelector(".receipt_container").appendChild(t)}))}();
