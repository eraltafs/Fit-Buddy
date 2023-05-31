import { footer } from "../components/login_footer.js";
import { loginNav } from "../components/login_nav.js";

let footer_div = document.getElementById("footer");
let login_div = document.getElementById("nav");
let signup = document.getElementById("sign");

footer_div.innerHTML = footer();
login_div.innerHTML = loginNav();

signup.onclick = () => {
  window.location.href = "welcome.html";
};
let button = document.getElementById("loginbtn");

button.onclick = async () => {
  let email = document.getElementById("user").value;
  let password = document.getElementById("pass").value;

  if (email && password) {
    button.innerHTML = `<span id="spinner" class="spinner"></span>`;
    const spinner = document.getElementById("spinner");
    button.disabled = true; // Disable the button
    spinner.style.display = "block"; // Show the spinner

    let res = await fetch(`https://server-fitbuddy.onrender.com/user/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await res.json()
    
    if(data.msg==="user not found"){
      alert("wrong email or password")
    }else{
      let { token } = data;
      if (token) {
        localStorage.setItem("token", token);
        location.href = "./homepage.html";
      }
      else{
        alert("something went wrong try again")
      }
    }
    button.disabled = false; // Re-enable the button
    spinner.style.display = "none"; // Hide the spinner
    button.innerHTML = `LOG IN`;
  } else {
    alert("Please enter all credentials");
  }
};
