import { footer } from "../components/login_footer.js";
import { loginNav } from "../components/login_nav.js";
import { alertMsg } from "./alert.message.js";
let footer_sec = document.querySelector("footer");
let login_div = document.getElementById("nav");
let signup = document.getElementById("sign");
let button = document.getElementById("loginbtn");


footer_sec.innerHTML = footer();
login_div.innerHTML = loginNav();

signup.onclick = () => {
  window.location.href = "signup.html";
};

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
      alertMsg("wrong email or password","error")
    }else{
      let { token } = data;
      if (token) {
        localStorage.setItem("token", token);
        alertMsg("login success","success")
        setTimeout(()=>{
          location.href = "./homepage.html";
        },5000)

      }
      else{
        alertMsg("something went wrong try again","fail")
      }
    }
    button.disabled = false; // Re-enable the button
    spinner.style.display = "none"; // Hide the spinner
    button.innerHTML = `LOG IN`;
  } else {
    alertMsg("Please enter all credentials","error");
  }
};
