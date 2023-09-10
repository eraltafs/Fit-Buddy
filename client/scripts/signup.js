import { loginNav } from "../components/login_nav.js";
import { footer } from "../components/login_footer.js";
import { alertMsg } from "./alert.message.js";
let login_div = document.getElementById("nav");
let footerdiv = document.querySelector("footer")


login_div.innerHTML = loginNav();
footerdiv.innerHTML = footer()

let log = document.getElementById("signUp");
log.style.display = "none";

let button = document.getElementById("loginbutton");
button.onclick = async (event) => {
  event.preventDefault();
  let email = document.getElementById("user").value;
  let password = document.getElementById("pass").value;

  if (email && password) {
    let n = password.length
    if (n < 6) {
      console.log("password less 6")
      alertMsg("password Must be at least 6 characters","error")
    } else {
      button.innerHTML = `<span id="spinner" class="spinner"></span>`;
      const spinner = document.getElementById("spinner");
      button.disabled = true; // Disable the button
      spinner.style.display = "block"; // Show the spinner
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
      button.disabled = false; // Re-enable the button
      spinner.style.display = "none"; // Hide the spinner
      button.innerHTML = `Continue`;
      let jsondata = await res.json();
      console.log(jsondata)
      if (jsondata.msg === "user created") {
        alertMsg("signup success login now", "success");
        setTimeout(()=>{
          location.href = "./login.html";
        },5000)
      } else if (jsondata.msg === "User already exists. Please login.") {
        alertMsg("user exists please login", "error");
        setTimeout(()=>{
          location.href = "./login.html";
        },5000)
      } else {
        alertMsg("something went wrong try again", "fail");
      }
    }
  } else {
    alertMsg("Please enter all details!","error");
  }
};
