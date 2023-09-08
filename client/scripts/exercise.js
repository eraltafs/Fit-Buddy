import getprofile from "./getprofile.js";
import { navbar } from "../components/navbar.js";
import { footer } from "../components/login_footer.js";

let nav = document.querySelector("nav");
let footer_sec = document.querySelector("footer");
let decreament = document.querySelector(".fa-caret-left");
let increament = document.querySelector(".fa-caret-right");
let CardioBody = document.getElementById("CardioBody");
let StrengthBody = document.getElementById("StrengthBody");

let no_data_cardio = document.getElementById("messageCardio");
let no_data_strength = document.getElementById("messageStrength");

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
    fetchingCardio();
    fetchingStrength();
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
  fetchingCardio();
  fetchingStrength();
}

async function fetchingCardio() {
  let res = await fetch(
    `https://server-fitbuddy.onrender.com/user/cardio?date=${yyyy}-${mm}-${dd}`,
    {
      headers: {
        authentication: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  let data = await res.json();
  AppendCardio(data);
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

async function fetchingStrength() {
  let res = await fetch(
    `https://server-fitbuddy.onrender.com/user/strength?date=${yyyy}-${mm}-${dd}`,
    {
      headers: {
        authentication: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  let data = await res.json();
  AppendStrength(data);
}

function AppendCardio(data) {
  CardioBody.innerHTML = null;
  if (data.length === 0) {
    no_data_cardio.style.display = "block";
    no_data_cardio.textContent = `You have no cardio excercise for ${date}`;
    no_data_cardio.style.color = "red";
  } else {
    no_data_cardio.style.display = "none";
    data.forEach(({ _id, calories, title, minute }, i) => {
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
        let res = await fetch(
          `https://server-fitbuddy.onrender.com/user/cardio/${_id}`,
          {
            method: "DELETE",
            headers: {
              authentication: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (res.ok) {
          alert("Exercise deleted");
          data.splice(i, 1);
          AppendCardio(data);
          //   // window.location.reload();
        }
      };
      tr.append(td1, td2, td3, td4);
      CardioBody.append(tr);
    });
  }
}

function AppendStrength(data) {
  console.log(data);
  StrengthBody.innerHTML = null;
  if (data.length === 0) {
    no_data_strength.style.display = "block";
    no_data_strength.textContent = `You have no strength excercise for ${date}`;
    no_data_strength.style.color = "red";
  } else {
    no_data_strength.style.display = "none";
    data.forEach(({ _id, weight, title, sets }, i) => {
      let tr = document.createElement("tr");
      let td1 = document.createElement("td");
      td1.textContent = title;
      let td2 = document.createElement("td");
      td2.textContent = sets;
      let td3 = document.createElement("td");
      td3.textContent = weight;

      let td4 = document.createElement("td");
      td4.innerHTML = `<i class="fa-solid fa-circle-minus"></i>`;
      td4.style.color = "red";
      td4.style.cursor = "pointer";
      td4.onclick = async () => {
        let res = await fetch(
          `https://server-fitbuddy.onrender.com/user/strength/${_id}`,
          {
            method: "DELETE",
            headers: {
              authentication: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (res.ok) {
          alert("Exercise deleted");
          data.splice(i, 1);
          AppendStrength(data);
          //   // window.location.reload();
        }
      };
      tr.append(td1, td2, td3, td4);
      StrengthBody.append(tr);
    });
  }
}

const addCardio = document.getElementById("addCardio");
const addStrength = document.getElementById("addStrength");

const cardioAdder = document.getElementById("cardioAdder");
const strenthAdder = document.getElementById("strenthAdder");

const closeButtonCardio = document.getElementById("closeButtonCardio");
const closeButtonStrength = document.getElementById("closeButtonStrength");

let selectCardio = document.getElementById("selectCardio");
let selectSrength = document.getElementById("selectSrength");

function showCadio(data) {
  cardioAdder.style.display = "block";
  AppendCardioOptions(data);
}
function showStrength(data) {
  strenthAdder.style.display = "block";
  AppendStrengthOptions(data);
}

// Function to hide the popup
function hidePopup(element) {
  element.style.display = "none";
}

addCardio.addEventListener("click", () => {
  let cardioArr = [
    "Running",
    "Cycling",
    "Swimming",
    "Jumping Rope",
    "Brisk Walking",
    "Aerobics",
    "Rowing",
    "Elliptical Trainer",
    "Stair Climbing",
    "Boxing",
    "Hiking",
    "Dancing",
    "CrossFit",
    "Kickboxing",
    "Circuit Training",
    "Spinning",
    "Soccer",
    "Jumping Jacks",
    "Burpees",
  ];
  showCadio(cardioArr);
});

addStrength.addEventListener("click", () => {
  let strengthArr = [
    "Push-Ups",
    "Pull-Ups/Chin-Ups",
    "Bench Press",
    "Dumbbell Rows",
    "Overhead Press",
    "Bicep Curls",
    "Tricep Dips",
    "Lateral Raises",
    "Squats",
    "Deadlifts",
    "Lunges",
    "Leg Press",
    "Calf Raises",
    "Planks",
    "Russian Twists",
    "Hanging Leg Raises",
    "Crunches",
    "Reverse Crunches",
    "Barbell Rows",
    "Dumbbell Lunges",
    "Push Press",
    "Hamstring Curls",
    "Seated Leg Extensions",
    "Hammer Curls",
    "Skull Crushers",
    "Kettlebell Swings",
    "Medicine Ball Slams",
    "Bodyweight Squats",
    "Turkish Get-Ups",
    "Resistance Band Exercises",
  ];
  showStrength(strengthArr);
});
// Hide the popup when the close button is clicked
closeButtonCardio.addEventListener("click", function (event) {
  hidePopup(cardioAdder);
});

closeButtonStrength.addEventListener("click", function (event) {
  hidePopup(strenthAdder);
});

// Hide the popup when clicked outside of it or anywhere in the body
document.addEventListener("click", function (event) {
  if (!cardioAdder.contains(event.target) && event.target !== addCardio) {
    hidePopup(cardioAdder);
  }
  if (!strenthAdder.contains(event.target) && event.target !== addStrength) {
    hidePopup(strenthAdder);
  }
});

function AppendCardioOptions(data) {
  selectCardio.innerHTML = null;
  var durationInput = document.getElementById("duration");
  var caloriesInput = document.getElementById("calories");
  var calories, minute, selectedExercise;
  selectedExercise = data[0];

  data.forEach((i) => {
    let opt = document.createElement("option");
    opt.value = i;
    opt.textContent = i;

    selectCardio.onchange = () => {
      selectedExercise = selectCardio.value;
    };

    durationInput.oninput = () => {
      minute = durationInput.value;
      let calCalories = Math.floor(minute * 9.2167);
      caloriesInput.value = calCalories;
      calories = caloriesInput.value;
    };
    caloriesInput.oninput = () => {
      calories = caloriesInput.value;
    };
    document.getElementById("AddExercise").onclick = async () => {
      let title = selectedExercise;
      let send = { title, calories, minute };
      console.log(send)
      if (title && calories && minute) {
        try {
          let res = await fetch(
            `https://server-fitbuddy.onrender.com/user/cardio`,
            {
              method: "POST",
              body: JSON.stringify(send),
              headers: {
                authentication: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          let jsonData = await res.json();
          if (jsonData.msg === "item added to menu") {
            alert("data updated");
            fetchingCardio();
          } else {
            alert("something went wrong");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("please input all value");
      }
    };

    selectCardio.append(opt);
  });
}

function AppendStrengthOptions(data) {
  selectSrength.innerHTML = null;
  var setsInput = document.getElementById("sets");
  var weightInput = document.getElementById("weight");
  var sets,weight, selectedStrength = data[0];

  data.forEach((i) => {
    let opt = document.createElement("option");
    opt.value = i;
    opt.textContent = i;

    selectSrength.onchange = () => {
      selectedStrength = selectSrength.value;
    };

    setsInput.oninput = () => {
      sets = setsInput.value;
    };
    weightInput.oninput = () => {
      weight = weightInput.value;
    };
    document.getElementById("AddStrength").onclick = async () => {
      let title = selectedStrength;
      let send = { title, sets, weight };
      console.log(send)
      if (title && sets && weight) {
        try {
          let res = await fetch(
            `https://server-fitbuddy.onrender.com/user/strength`,
            {
              method: "POST",
              body: JSON.stringify(send),
              headers: {
                authentication: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          let jsonData = await res.json();
          if (jsonData.msg === "item added to menu") {
            alert("data updated");
            fetchingStrength();
          } else {
            alert("something went wrong");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("please input all value");
      }
    };

    selectSrength.append(opt);
  });
}
