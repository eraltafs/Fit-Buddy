import { getAllData, getprofile } from "./getprofile.js";
import { alertMsg } from "./alert.message.js";
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
let profileImage = document.getElementById("profileImage");

userDetails.innerText = null;
userDetails1.innerText = null;
let token = localStorage.getItem("token");
if (!token) {
  window.location = "login.html";
} else {
  window.onload = async (event) => {
    let jsondata = await getprofile();
    console.log(jsondata);
    const { email, img, calories_goal } = jsondata;
    userDetails.innerText = email;
    userDetails1.innerText = email;
    document.getElementById("goal").innerText = calories_goal;
    profileImage.src = img;
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
let imageUpdater = document.getElementById("imageUpdater");
let uploadImage = document.getElementById("uploadImage");
uploadImage.onclick = () => {
  imageUpdater.style.display = "block";

  let imgInput = document.getElementById("img");
  let AddImage = document.getElementById("AddImage");
  let img;
  imgInput.oninput = () => {
    img = imgInput.value;
  };

  AddImage.onclick = async () => {
    console.log(img);
    try {
      let res = await fetch(`https://server-fitbuddy.onrender.com/user/image`, {
        method: "POST",
        body: JSON.stringify({ img }),
        headers: {
          authentication: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      let jsonData = await res.json();
      console.log(res);
      if (jsonData.msg === "image updated") {
        alertMsg("image updated", "success");
        window.reload();
      }
    } catch (error) {
      alertMsg(error.msg, "fail");
      console.log(error.msg);
    }
  };
};
const closeButton = document.getElementById("closeButton");

function hidePopup(element) {
  element.style.display = "none";
}

closeButton.addEventListener("click", function (event) {
  hidePopup(imageUpdater);
});
document.addEventListener("click", function (event) {
  if (!imageUpdater.contains(event.target) && event.target !== uploadImage) {
    hidePopup(imageUpdater);
  }
});

// Display the current date
const today = new Date();
var yyyy = today.getFullYear();
var dd = today.getDate();
var mm = today.getMonth() + 1;

if (dd < 10) dd = "0" + dd;
if (mm < 10) mm = "0" + mm;


let { cardio, food} = await getAllData(yyyy, mm, dd);
var caloriesBurnt = 0;
var caloriesIntake = 0
if (cardio.length) {
  cardio.forEach(({ calories }) => {
    caloriesBurnt += calories;
  });
  document.getElementById("Burn").textContent = caloriesBurnt
}

if (food.length) {
  food.forEach(({ calories }) => {
    caloriesIntake += calories;
  });
  document.getElementById("intake").textContent = caloriesIntake
}

const remains = caloriesIntake-caloriesBurnt
console.log(remains)
document.getElementById("remains").textContent = remains
document.getElementById("caloriesRemaining").textContent = remains