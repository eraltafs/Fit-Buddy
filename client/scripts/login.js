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
const spinner = document.getElementById('spinner');
document.getElementById("loginbtn").onclick = async () => {
  let email = document.getElementById("user").value;
  let password = document.getElementById("pass").value;

  if (email && password) {
    button.innerHTML=`<span id="spinner" class="spinner"></span>`
    const spinner = document.getElementById('spinner');
    button.disabled = true; // Disable the button
    spinner.style.display = 'block'; // Show the spinner

    let res = await fetch(`https://server-fitbuddy.onrender.com/user/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    button.disabled = false; // Re-enable the button
    spinner.style.display = 'none'; // Hide the spinner
    button.innerHTML=`LOG IN`
    let { token } = await res.json();
    if (token) {
        localStorage.setItem("token", token)
     location.href = "./homepage.html"
    }
  } else {
    alert("Please enter all credentials");
  }
};
