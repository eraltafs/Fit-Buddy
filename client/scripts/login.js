import { footer } from "../components/login_footer.js";

let footer_div = document.getElementById("footer");

footer_div.innerHTML = footer();

import { loginNav } from "../components/login_nav.js";

let login_div = document.getElementById("nav");

login_div.innerHTML = loginNav();

let sign = document.getElementById("sign");
sign.onclick = () => {
  window.location.href = "welcome.html";
};
let button=document.getElementById("loginbtn")
document.getElementById("loginbtn").onclick = async () => {
  let email = document.getElementById("user").value;
  let password = document.getElementById("pass").value;

  if (email && password) {
    button.innerHTML = '<span class="loader"></span>Loading...';
    button.disabled = true;
    let res = await fetch(`https://server-fitbuddy.onrender.com/user/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    button.innerHTML = 'LOG IN';
      button.disabled = false;
    let { token } = await res.json();
    if (token) {
        localStorage.setItem("token", token)
     location.href = "./homepage.html"
    }
  } else {
    alert("Please enter all credentials");
  }
};
