import getprofile from "./getprofile.js";
import { navbar } from "../components/navbar.js";
import { footer } from "../components/login_footer.js";

let nav = document.querySelector("nav");
let footer_sec = document.querySelector("footer");
let decreament = document.querySelector(".fa-caret-left");
let increament = document.querySelector(".fa-caret-right");
let body = document.getElementById("exercisebody");
let no_data_message = document.getElementById("message");

nav.innerHTML = navbar();
footer_sec.innerHTML = footer();

document.getElementById("navexerciseanch").style.backgroundColor = "#00548b";

let log_out = document.getElementById("log_out");

log_out.onclick = () => {
  localStorage.removeItem("token");
  location.reload();
};

let userDetails = document.getElementById("username");
userDetails.innerText = null;
let token = localStorage.getItem("token");
if (!token) {
  window.location = "login.html";
} else {
  window.onload = async () => {
    let jsondata = await getprofile();
    const { email } = jsondata;
    userDetails.innerText = email;
  };
}
const hamburgerIcon = document.getElementById("hamburger-icon");
const hamburgerMenu = document.getElementById("hamburger-menu");

hamburgerIcon.addEventListener("click", () => {
  hamburgerIcon.classList.toggle("active");
  hamburgerMenu.classList.toggle("active");
});

const today = new Date();
let yyyy = today.getFullYear();
let dd = today.getDate();
let mm = today.getMonth() + 1;

if (dd < 10) dd = "0" + dd;
if (mm < 10) mm = "0" + mm;

var dayNames = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

var monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let dayn = dayNames[today.getDay()];
let monthn = monthNames[today.getMonth()];
let date = `${dayn}, ${monthn} ${dd}, ${yyyy}`;
document.getElementById("date").textContent = date;

increament.onclick = () => {
  dd++;
  if (dd > new Date(yyyy, mm, 0).getDate()) {
    dd = 1;
    mm++;
    if (mm > 12) {
      mm = 1;
      yyyy++;
    }
  }
  updateDate();
};

decreament.onclick = () => {
  dd--;
  if (dd < 1) {
    mm--;
    if (mm < 1) {
      mm = 12;
      yyyy--;
    }
    dd = new Date(yyyy, mm, 0).getDate();
  }

  updateDate();
};

function updateDate() {
  today.setDate(dd);
  today.setMonth(mm - 1);
  today.setFullYear(yyyy);
  dayn = dayNames[today.getDay()];
  monthn = monthNames[today.getMonth()];
  date = `${dayn}, ${monthn} ${dd}, ${yyyy}`;
  document.getElementById("date").textContent = date;
  fetching();
}

async function fetching() {
  let res = await fetch(
    `https://server-fitbuddy.onrender.com/user/excercise?date=${yyyy}-${mm}-${dd}`,
    {
      headers: {
        authentication: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  let data = await res.json();
  Append(data);
  let totalminute = 0;
  let totalcalories = 0;
  data.forEach(({ calories, minute }) => {
    totalminute += Number(minute);
    totalcalories += Number(calories);
  });

  document.getElementById("totminute").textContent = `${totalminute}` || "0";
  document.getElementById("totcalories").textContent =
    `${totalcalories}` || "0";
}
fetching();
function Append(data) {
  body.innerHTML = null;
  if (data.length === 0) {
    no_data_message.style.display = "block";
    no_data_message.textContent = `You have no data for ${date}`;
    no_data_message.style.color = "red";
  } else {
    no_data_message.style.display = "none";
    data.forEach(({ _id, calories, title, minute },i) => {
      let tr = document.createElement("tr");
      let td1 = document.createElement("td");
      td1.textContent = title;
      let td2 = document.createElement("td");
      td2.textContent = minute;
      let td3 = document.createElement("td");
      td3.textContent = calories;

      let td4 = document.createElement("td");
      td4.innerHTML = `<i class="fa-solid fa-circle-minus"></i>`;
      td4.style.color = "red";
      td4.style.cursor = "pointer";
      td4.onclick = async () => {
        console.log(_id,i);
        let res = await fetch(
          `https://server-fitbuddy.onrender.com/user/excercise/${_id}`,
          {
            method: "DELETE",
            headers: {
              authentication: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (res.ok) {
          alert("Exercise deleted")
          data.splice(i,1)
          Append(data)
        //   // window.location.reload();
        }
      };
      tr.append(td1, td2, td3, td4);
      body.append(tr);
    });
  }
}
