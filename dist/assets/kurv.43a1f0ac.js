/* empty css                   */let e=JSON.parse(sessionStorage.getItem("selectedBeers"));!function(){let t=0,r=0;e.forEach((e=>{null!=e.amount&&(t+=e.amount,r+=function(e){const t=document.querySelector(".basket_template").content.cloneNode(!0);t.querySelector(".basket_beer_picture").src=e.picture,t.querySelector(".basket_beer_name").textContent=e.name,t.querySelector(".basket_amount").textContent="Antal: "+e.amount+" x "+e.price+" dkk";let r=e.amount*e.price;return t.querySelector(".basket_line_total").textContent=r+" dkk",document.querySelector(".basket_container").appendChild(t),r}(e))})),document.querySelector(".basket_total_orders").innerHTML="DIN BESTILLING ("+t+" varer)",document.querySelector(".total_amount_right").innerHTML=r+" dkk"}();