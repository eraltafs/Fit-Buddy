import {loginNav} from "../components/login_nav.js"

let login_div = document.getElementById('nav')

login_div.innerHTML = loginNav();

let log2 = document.getElementById('logIn');
log2.style.display='none';
let log = document.getElementById('signUp');

log.style.display="none";

let log1 = document.getElementById('line');
log1.style.display = 'none';



let input = document.getElementById('datet');

let next = document.getElementById('next');

let display = document.getElementById('display');
input.oninput = ()=>{

    // console.log(input.value)
}


next.onclick=()=>{
    if(input.value){
        location.href = "/height_page.html"
    }
    display.textContent = "Please enter a valid birthdate (mm/dd/yyyy)."
    
}
    
 