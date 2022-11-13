import {loginNav} from "../components/login_nav.js"

let login_div = document.getElementById('nav')

login_div.innerHTML = loginNav();

let log2 = document.getElementById('logIn');
log2.style.display='none';
let log = document.getElementById('signUp');

log.style.display="none";

let log1 = document.getElementById('line');
log1.style.display = 'none';



document.getElementById("loginbutton").onclick = ()=>{
    let user = document.getElementById("user").value
    let pass = document.getElementById("pass").value

    localStorage.setItem("user",user)
    localStorage.setItem("pass",pass)
    location.href = "/login.html"
}

