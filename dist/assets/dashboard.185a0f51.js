let e=[],t=[],n=[],r=0;async function o(){const r=await fetch("https://foobar-examproject.herokuapp.com/");!function(r){(function(e){let t=e.timestamp,n=new Date(t),r=new Date;r.setHours(22,0,0);let o=Math.abs(r-n);d=o,c=(d=(d-d%1e3)/1e3)%60,u=(d=(d-c)/60)%60,o=(d-u)/60+":"+u+":"+c,document.getElementById("countdown").innerHTML=o;var d,c,u})(r),0==document.querySelector(".bartender_content").children.length?function(e){document.querySelector(".bartender_content").innerHTML="",e.bartenders.forEach((t=>{const n=document.querySelector(".temp_bartenders").content.cloneNode(!0);n.querySelector(".each_bartender").src="/img/"+t.name+".png",n.querySelector(".bartender_name").textContent=t.name,n.querySelector(".bartender_status").textContent=t.status,n.querySelector(".bartender_statusdetail").textContent=t.statusDetail;let r=t.usingTap;n.querySelector(".bartender_usingtap").textContent=null===r?"N/A":e.taps[r].beer,n.querySelector(".bartender_servingcustomer").textContent=t.servingCustomer,document.querySelector(".bartender_content").appendChild(n)})),d()}(r):function(e){let t=document.querySelectorAll(".content");for(let n=0;n<t.length;n++){t[n].querySelector(".each_bartender").src="/img/"+e.bartenders[n].name+".png",t[n].querySelector(".bartender_name").textContent=e.bartenders[n].name,t[n].querySelector(".bartender_status").textContent=e.bartenders[n].status,t[n].querySelector(".bartender_statusdetail").textContent=e.bartenders[n].statusDetail;let r=e.bartenders[n].usingTap;t[n].querySelector(".bartender_usingtap").textContent=null===r?"N/A":e.taps[r].beer,t[n].querySelector(".bartender_servingcustomer").textContent=e.bartenders[n].servingCustomer}}(r);(function(e){document.getElementById("beer_pictures").innerHTML="";let t=e.queue.length;document.getElementById("queue_number").innerHTML=t;for(let n=0;n<t;n++){if(n>=5){const e=document.createElement("p");return e.innerText="...",void document.getElementById("beer_pictures").appendChild(e)}const e=document.createElement("img");e.className="beer_picture",e.src="/img/beer-mug.png",document.getElementById("beer_pictures").appendChild(e)}})(r),function(r){document.getElementById("order_queue").innerHTML="",document.getElementById("order_in_progress").innerHTML="",document.getElementById("order_finished").innerHTML="",t=r.queue,n=r.serving;let o=0;t.forEach((e=>{if(o<1){const t=document.createElement("p");t.innerHTML=e.id,document.getElementById("order_queue").appendChild(t),o++}else if(1==o){const e=document.createElement("p");e.innerText="...",document.getElementById("order_queue").appendChild(e),o++}})),n.forEach((t=>{const n=document.createElement("p");n.innerHTML=t.id,document.getElementById("order_in_progress").appendChild(n),e.includes(t.id)||e.unshift(t.id)}));let d=document.querySelector("#order_in_progress").childNodes,c=[];d.forEach((e=>{c.push(e.innerHTML)}));let u=0;e.forEach((e=>{if(!c.includes(e.toString())&&u<5){const t=document.createElement("p");t.innerHTML=e,document.getElementById("order_finished").appendChild(t),u++}}))}(r),function(e){let t=e.taps;t.sort((function(e,t){return e.level-t.level}));let n=t.slice(0,3);for(let r=0;r<n.length;r++){let e="stock"+r+"_name",t="stock"+r+"_level",o="stock"+r+"_kegs",d="stock"+r+"_img",c="/img/kegs/"+n[r].beer+".png";document.getElementById(d).src=c,document.getElementById(e).innerHTML=n[r].beer,document.getElementById(t).innerHTML=n[r].level,document.getElementById(o).innerHTML=3}}(r),function(e){let t=document.getElementById("hourHand"),n=document.getElementById("minuteHand"),r=document.getElementById("secondHand"),o=new Date,d=o.getHours()%12,c=o.getMinutes(),u=o.getSeconds(),l=30*d,s=6*c,a=6*u;t.style.transform="rotate("+l+"deg)",n.style.transform="rotate("+s+"deg)",r.style.transform="rotate("+a+"deg)"}(),setTimeout(o,1e3)}(await r.json())}function d(){let e=document.querySelectorAll(".content");r>=e.length&&(r=0);for(let t=0;t<e.length;t++)t==r?e[t].classList.remove("hide"):e[t].classList.add("hide");r++,setTimeout(d,1e4)}o();const c=document.querySelector("#hr"),u=document.querySelector("#mn"),l=document.querySelector("#sc");setInterval((()=>{let e=new Date,t=30*e.getHours(),n=6*e.getMinutes(),r=6*e.getSeconds();c.style.transform=`rotateZ(${t+n/12}deg)`,u.style.transform=`rotateZ(${n}deg)`,l.style.transform=`rotateZ(${r}deg)`}));