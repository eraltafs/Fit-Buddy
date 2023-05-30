import getprofile from "./getprofile.js";

document.getElementById("navexeciseanch").style.backgroundColor = "#00548b";

let userDetails = document.getElementById("username");
userDetails.innerText = null;

if (!localStorage.getItem("token")) {
  window.location = "login.html";
} else {
  window.onload = async (event) => {
    let jsondata = await getprofile();
    const { email } = jsondata;
    userDetails.innerText = email;
  };
}

const today = new Date();
const yyyy = today.getFullYear();
let dd = today.getDate();
let mm = today.getMonth()+1;

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
console.log(mm);

let datefield = (document.getElementById("date").textContent = date);

async function fetching() {
  let res = await fetch(
    `https://server-fitbuddy.onrender.com/user/excercise?date=${yyyy}-${mm}-${dd}`,
    {
      headers: {
        authentication: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );
  let data = await res.json();
  console.log(data)
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
let body = document.getElementById("exercisebody");
function Append(data) {
  data.forEach(({ _id, calories, title, minute }) => {
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
        console.log(_id)
      let res = await fetch(
        `https://server-fitbuddy.onrender.com/user/excercise/${_id}`,
        { method: "DELETE" }
      );
    //   window.location.reload();
    };
    tr.append(td1, td2, td3, td4);
    body.append(tr);
  });
}
