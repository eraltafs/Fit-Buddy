import getprofile from "./getprofile.js";
import { navbar } from "../components/navbar.js";
import { footer } from "../components/login_footer.js";
let footer_sec = document.querySelector("footer");
footer_sec.innerHTML = footer();

let nav = document.querySelector("nav");
nav.innerHTML = navbar();

document.getElementById("navhomeanch").style.backgroundColor = "#00548b";
let userDetails = document.getElementById("username");
let userDetails1 = document.getElementById("username1");
let log_out = document.getElementById("log_out");

let add_exercise = document.getElementById("add_exercise");

userDetails.innerText = null;
userDetails1.innerText = null;

if (!localStorage.getItem("token")) {
  window.location = "login.html";
} else {
  window.onload = async (event) => {
    let jsondata = await getprofile();
    const { email } = jsondata;
    userDetails.innerText = email;
    userDetails1.innerText = email;
  };
}
const hamburgerIcon = document.getElementById("hamburger-icon");
const hamburgerMenu = document.getElementById("hamburger-menu");

hamburgerIcon.addEventListener("click", () => {
  hamburgerIcon.classList.toggle("active");
  hamburgerMenu.classList.toggle("active");
});

add_exercise.onclick = () => {
  location.href = "./exercise.html";
};
log_out.onclick = () => {
  localStorage.removeItem("token");
  location.reload();
};
