let e=[],t=[],n=[],r=0;async function o(){const r=await fetch("https://foobar-examproject.herokuapp.com/");!function(r){(function(e){let t=e.timestamp,n=new Date(t),r=new Date;r.setHours(22,0,0);let o=Math.abs(r-n);c=o,d=(c=(c-c%1e3)/1e3)%60,u=(c=(c-d)/60)%60,o=(c-u)/60+":"+u+":"+d,document.getElementById("countdown").innerHTML=o;var c,d,u})(r),0==document.querySelector(".bartender_content").children.length?function(e){document.querySelector(".bartender_content").innerHTML="",e.bartenders.forEach((t=>{const n=document.querySelector(".temp_bartenders").content.cloneNode(!0);n.querySelector(".each_bartender").src="/img/"+t.name+".png",n.querySelector(".bartender_name").textContent=t.name,n.querySelector(".bartender_status").textContent=t.status,n.querySelector(".bartender_statusdetail").textContent=t.statusDetail;let r=t.usingTap;n.querySelector(".bartender_usingtap").textContent=null===r?"N/A":e.taps[r].beer,n.querySelector(".bartender_servingcustomer").textContent=t.servingCustomer,document.querySelector(".bartender_content").appendChild(n)}))}(r):function(e){let t=document.querySelectorAll(".content");for(let n=0;n<t.length;n++){t[n].querySelector(".each_bartender").src="/img/"+e.bartenders[n].name+".png",t[n].querySelector(".bartender_name").textContent=e.bartenders[n].name,t[n].querySelector(".bartender_status").textContent=e.bartenders[n].status,t[n].querySelector(".bartender_statusdetail").textContent=e.bartenders[n].statusDetail;let r=e.bartenders[n].usingTap;t[n].querySelector(".bartender_usingtap").textContent=null===r?"N/A":e.taps[r].beer,t[n].querySelector(".bartender_servingcustomer").textContent=e.bartenders[n].servingCustomer}}(r);(function(e){document.getElementById("beer_pictures").innerHTML="";let t=e.queue.length;document.getElementById("queue_number").innerHTML=t;for(let n=0;n<t;n++){const e=document.createElement("img");e.className="beer_picture",e.src="/img/beer-mug.png",document.getElementById("beer_pictures").appendChild(e)}})(r),function(r){document.getElementById("order_queue").innerHTML="",document.getElementById("order_in_progress").innerHTML="",document.getElementById("order_finished").innerHTML="",t=r.queue,n=r.serving;let o=0;t.forEach((e=>{if(o<5){const t=document.createElement("p");t.innerHTML=e.id,document.getElementById("order_queue").appendChild(t),o++}})),n.forEach((t=>{const n=document.createElement("p");n.innerHTML=t.id,document.getElementById("order_in_progress").appendChild(n),e.includes(t.id)||e.unshift(t.id)}));let c=document.querySelector("#order_in_progress").childNodes,d=[];c.forEach((e=>{d.push(e.innerHTML)}));let u=0;e.forEach((e=>{if(!d.includes(e.toString())&&u<5){const t=document.createElement("p");t.innerHTML=e,document.getElementById("order_finished").appendChild(t),u++}}))}(r),function(e){let t=e.taps;t.sort((function(e,t){return e.level-t.level}));let n=t.slice(0,3);for(let r=0;r<n.length;r++){let e="stock"+r+"_name",t="stock"+r+"_level",o="stock"+r+"_kegs",c="stock"+r+"_img",d="/img/kegs/"+n[r].beer+".png";document.getElementById(c).src=d,document.getElementById(e).innerHTML=n[r].beer,document.getElementById(t).innerHTML=n[r].level,document.getElementById(o).innerHTML=3}}(r),setTimeout(o,1e3)}(await r.json())}o(),function e(){try{let t=document.querySelectorAll(".content");r>=t.length&&(r=0);for(let e=0;e<t.length;e++)e==r?t[e].classList.remove("hide"):t[e].classList.add("hide");r++,setTimeout(e,1e4)}catch(t){setTimeout(e,300)}}();
