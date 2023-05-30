import { loginNav } from "../components/login_nav.js";

let login_div = document.getElementById("nav");

login_div.innerHTML = loginNav();

let log2 = document.getElementById("logIn");
log2.style.display = "none";
let log = document.getElementById("signUp");

log.style.display = "none";

let log1 = document.getElementById("line");
log1.style.display = "none";

document.getElementById("loginbutton").onclick = async () => {
  let email = document.getElementById("user").value;
  let password = document.getElementById("pass").value;

  if (user && email) {
    let res = await fetch(
      `https://server-fitbuddy.onrender.com/user/register`,
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let jsondata = await res.json()
    if(jsondata.msg==="user created"){
        alert("signup success login now")
        location.href ="./login.html"
    }else if(jsondata.msg==="user exists please login"){
        alert("user exists please login")
        location.href ="./login.html"
    }else{
        alert("something went wrong try again")
    }
    
  } else {
    if (user && pass) {
      localStorage.setItem("user", user);
      localStorage.setItem("pass", pass);
      alert("User Registered Successful!");
      location.href = "login.html";
    } else {
      alert("Please enter correct credentials!");
    }
  }
};
