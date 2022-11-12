

import {loginNav} from "../components/login_nav.js"

let login_div = document.getElementById('nav')

login_div.innerHTML = loginNav();

let log2 = document.getElementById('logIn');
log2.style.display='none';
let log = document.getElementById('signUp');

log.style.display="none";

let log1 = document.getElementById('line');
log1.style.display = 'none';

let b = document.getElementById('btn1');
let b1 = document.getElementById('btn2');
let b2 = document.getElementById('btn3');
let p = document.getElementById('display');
let count=0;
b.onclick=()=>{
    p.innerHTML = null;
     b.style.border="2px solid #0066EE"
     b.style.color="#0066EE "
     b1.style.border="1px solid #111010b9"
     b1.style.color="#111010b9"
     b2.style.border="1px solid #111010b9"
     b2.style.color="#111010b9"
     count++;
}
b1.onclick=()=>{
    p.innerHTML = null;
    b1.style.border="2px solid #0066EE"
    b1.style.color="#0066EE"
    b.style.border="1px solid #111010b9"
    b.style.color="#111010b9"
    b2.style.border="1px solid #111010b9"
    b2.style.color="#111010b9"
    count++;
}
b2.onclick=()=>{
    p.innerHTML = null;
    b2.style.border="2px solid #0066EE"
    b2.style.color="#0066EE"
    b.style.border="1px solid #111010b9"
    b.style.color="#111010b9"
    b1.style.border="1px solid #111010b9"
    b1.style.color="#111010b9"
    count++;
}

let next = document.getElementById('next');

    next.onclick=()=>{
        if(count>0){
            replace();
        }else{
            
            p.innerHTML = "Please select a goal."
            p.style.color="red";
        }
    }
function replace(){
    window.location.href="activity.html"
}
 



