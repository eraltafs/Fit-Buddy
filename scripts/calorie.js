import {loginNav} from "../components/login_nav.js"

let login_div = document.getElementById('nav')

login_div.innerHTML = loginNav();

let log2 = document.getElementById('logIn');
log2.style.display='none';
let log = document.getElementById('signUp');

log.style.display="none";

let log1 = document.getElementById('line');
log1.style.display = 'none';



let input = document.getElementById('date');

let next = document.getElementById('next');

let display = document.getElementById('display');
var age;
input.oninput = ()=>{
    let date = new Date()
    let fullyear = date.getFullYear()
    let val = input.value.split("-")
    age = fullyear-Number(val[0])
    console.log(age)
}

let back = document.querySelector(".back")
back.addEventListener("click",function(){
    window.location.href="activity.html"
})

next.onclick=()=>{
    if(input.value&&age>=18){
        location.href = "height_page.html"
    }else if(age<18){
        alert("you are a kid to use this app, please grow, baby!😎")
    }
    display.textContent = "Please enter a valid birthdate (mm/dd/yyyy)."
    display.style.color = "red"
    
}
    
 