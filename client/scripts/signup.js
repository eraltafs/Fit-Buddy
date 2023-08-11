import { loginNav } from "../components/login_nav.js";
import { footer } from "../components/login_footer.js";

let login_div = document.getElementById("nav");
let footerdiv = document.querySelector("footer")


login_div.innerHTML = loginNav();
footerdiv.innerHTML = footer()

let log = document.getElementById("signUp");
log.style.display = "none";

let button = document.getElementById("loginbutton");
document.getElementById("loginbutton").onclick = async () => {
  let email = document.getElementById("user").value;
  let password = document.getElementById("pass").value;

  if (email && password) {
    if (password.trim().length < 6) {
      alert("password Must be at least 6 characters")
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
      if (jsondata.msg === "user created") {
        alert("signup success login now");
        location.href = "./login.html";
      } else if (jsondata.msg === "user exists please login") {
        alert("user exists please login");
        location.href = "./login.html";
      } else {
        alert("something went wrong try again");
      }
    }
  } else {
    alert("Please enter all details!");
  }
};
