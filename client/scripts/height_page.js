import {loginNav} from "../components/login_nav.js"

let login_div = document.getElementById('nav')

login_div.innerHTML = loginNav();

let log2 = document.getElementById('logIn');
log2.style.display='none';
let log = document.getElementById('signUp');

log.style.display="none";

let log1 = document.getElementById('line');
log1.style.display = 'none';

let back = document.querySelector(".back")
back.addEventListener("click",function(){
    window.location.href="calorie.html"
})

let next = document.querySelector("#next")
next.addEventListener("click",function(){
    window.location.href="goal.html"
})