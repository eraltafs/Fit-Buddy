import {loginNav} from "../components/login_nav.js"

let login_div = document.getElementById('nav')

login_div.innerHTML = loginNav();

let log2 = document.getElementById('logIn');
log2.style.display='none';
let log = document.getElementById('signUp');

log.style.display="none";

let log1 = document.getElementById('line');
log1.style.display = 'none';


let d1 = document.getElementById('div1');
let d2 = document.getElementById('div2');
let d3 = document.getElementById('div3');
let d4 = document.getElementById('div4');


d2.style.border="2px solid #0066EE"
d2.style.color="#0066EE "

d1.style.border="1px solid #111010b9"
d1.style.color="#111010b9"

d3.style.border="1px solid #111010b9"
d3.style.color="#111010b9"

d4.style.border="1px solid #111010b9"
d4.style.color="#111010b9"



d1.onclick=()=>{
    
    d1.style.border="2px solid #0066EE"
d1.style.color="#0066EE "

d2.style.border="1px solid #111010b9"
d2.style.color="#111010b9"

d3.style.border="1px solid #111010b9"
d3.style.color="#111010b9"

d4.style.border="1px solid #111010b9"
d4.style.color="#111010b9"

}
d2.onclick=()=>{
    d2.style.border="2px solid #0066EE"
    d2.style.color="#0066EE "
    
    d1.style.border="1px solid #111010b9"
    d1.style.color="#111010b9"
    
    d3.style.border="1px solid #111010b9"
    d3.style.color="#111010b9"
    
    d4.style.border="1px solid #111010b9"
    d4.style.color="#111010b9"
   
    
}
d3.onclick=()=>{
    d3.style.border="2px solid #0066EE"
    d3.style.color="#0066EE "
    
    d1.style.border="1px solid #111010b9"
    d1.style.color="#111010b9"
    
    d2.style.border="1px solid #111010b9"
    d2.style.color="#111010b9"
    
    d4.style.border="1px solid #111010b9"
    d4.style.color="#111010b9"
   
}
d4.onclick=()=>{
    d4.style.border="2px solid #0066EE"
    d4.style.color="#0066EE "
    
    d1.style.border="1px solid #111010b9"
    d1.style.color="#111010b9"
    
    d2.style.border="1px solid #111010b9"
    d2.style.color="#111010b9"
    
    d3.style.border="1px solid #111010b9"
    d3.style.color="#111010b9";
};

let back = document.querySelector(".back")
back.addEventListener("click",function(){
    window.location.href="height_page.html"
})

let next = document.querySelector("#next")
next.addEventListener("click",function(){
    window.location.href="username_page.html"
})