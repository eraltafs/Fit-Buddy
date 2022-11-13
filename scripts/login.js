import { footer } from "/components/login_footer.js";

let footer_div = document.getElementById("footer");

footer_div.innerHTML = footer();

import { loginNav } from "/components/login_nav.js";

let login_div = document.getElementById("nav");

login_div.innerHTML = loginNav();

let sign = document.getElementById("sign");
sign.onclick = () => {
  window.location.href = "welcome.html";
};

let userlcl = localStorage.getItem("user");
let passlcl = localStorage.getItem("pass");

document.getElementById("loginbtn").onclick = ()=>{
    let user = document.getElementById("user").value
    let pass = document.getElementById("pass").value

    if(user==userlcl&&passlcl==pass){

        console.log(user,pass)
    }else{
        alert("Please enter correct credentials")
    }
}