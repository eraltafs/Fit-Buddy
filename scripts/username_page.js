import {loginNav} from "../components/login_nav.js"

let login_div = document.getElementById('nav')

login_div.innerHTML = loginNav();

let log2 = document.getElementById('logIn');
log2.style.display='none';
let log = document.getElementById('signUp');

log.style.display="none";

let log1 = document.getElementById('line');
log1.style.display = 'none';


const Reguser = localStorage.getItem("user")||null

document.getElementById("loginbutton").onclick = ()=>{
    let user = document.getElementById("user").value
    let pass = document.getElementById("pass").value

    if(user==Reguser){
        alert("User is already registered! Please Login")
        location.href = "login.html"

    }else{
        if(user&&pass){
            localStorage.setItem("user",user)
            localStorage.setItem("pass",pass)
            alert("User Registered Successful!")
            location.href = "login.html"
        
        }else{
            alert("Please enter correct credentials!")
        }
    }
    
    
}

