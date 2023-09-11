// Import necessary modules and components
import {getprofile} from "./getprofile.js";
import { alertMsg } from "./alert.message.js";
import { navbar } from "../components/navbar.js";
import { footer } from "../components/login_footer.js";

// DOM elements
let nav = document.querySelector("nav");
let footer_sec = document.querySelector("footer");
let decreament = document.querySelector(".fa-caret-left");
let increament = document.querySelector(".fa-caret-right");
let foodBody = document.getElementById("foodBody");
let no_food_data = document.getElementById("messagefood");

// Initialize and set up the navbar and footer
nav.innerHTML = navbar();
footer_sec.innerHTML = footer();

// Set background color for the navigation menu item
document.getElementById("navfoodanch").style.backgroundColor = "#00548b";

// Handle logout
let log_out = document.getElementById("log_out");
log_out.onclick = () => {
  localStorage.removeItem("token");
  location.reload();
};

// Get user details from local storage or redirect to login page
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
    fetchingFood();
  };
}

// Mobile menu toggle
const hamburgerIcon = document.getElementById("hamburger-icon");
const hamburgerMenu = document.getElementById("hamburger-menu");

hamburgerIcon.addEventListener("click", () => {
  hamburgerIcon.classList.toggle("active");
  hamburgerMenu.classList.toggle("active");
});

// Display the current date
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

// Handle date increment and decrement
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
  fetchingFood();
}

// Fetch cardio data for the selected date
async function fetchingFood() {
  let res = await fetch(
    `https://server-fitbuddy.onrender.com/user/food?date=${yyyy}-${mm}-${dd}`,
    {
      headers: {
        authentication: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  let data = await res.json();
  let totalcalories = 0;
  data.forEach(({ calories, weight }) => {
    totalcalories += Number(calories);
  });

  document.getElementById("totcalories").textContent =
    `${totalcalories}` || "0";
  AppendFood(data, totalcalories);
}
// Append cardio data to the table
function AppendFood(data, totalcalories) {
  foodBody.innerHTML = null;
  if (data.length === 0) {
    no_food_data.style.display = "block";
    no_food_data.textContent = `You have no food for ${date}`;
    no_food_data.style.color = "red";
  } else {
    no_food_data.style.display = "none";
    data.forEach(({ _id, calories, title, weight }, i) => {
      let tr = document.createElement("tr");
      let td1 = document.createElement("td");
      td1.textContent = title;
      let td2 = document.createElement("td");
      td2.textContent = weight;
      let td3 = document.createElement("td");
      td3.textContent = calories;

      let td4 = document.createElement("td");
      td4.innerHTML = `<i class="fa-solid fa-circle-minus"></i>`;
      td4.style.color = "red";
      td4.style.cursor = "pointer";
      td4.onclick = async () => {
        let res = await fetch(
          `https://server-fitbuddy.onrender.com/user/food/${_id}`,
          {
            method: "DELETE",
            headers: {
              authentication: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (res.ok) {
          alertMsg("Exercise deleted", "success");
          data.splice(i, 1);
          console.log(totalcalories,calories)
          totalcalories -= calories
          console.log(totalcalories)
          document.getElementById("totcalories").textContent = `${
            totalcalories
          }`;
          AppendFood(data,totalcalories);
        }
      };
      tr.append(td1, td2, td3, td4);
      foodBody.append(tr);
    });
  }
}

// Show the cardio exercise selection popup
const addFood = document.getElementById("addFood");
const foodAdder = document.getElementById("foodAdder");
const closeButtonFood = document.getElementById("closeButtonFood");
let selectFood = document.getElementById("selectFood");

// Function to show Food selection
function showFood(data) {
  foodAdder.style.display = "block";
  AppendFoodOptions(data);
}

// Function to hide the popup
function hidePopup(element) {
  element.style.display = "none";
}

// Event listeners for showing exercise selection popups
addFood.addEventListener("click", () => {
  const foodData = {
    Strawberries: 32,
    Blueberries: 57,
    "Spinach (cooked)": 23,
    "Sweet Potatoes": 86,
    Carrots: 41,
    Cucumbers: 16,
    Tomatoes: 18,
    "Ground Beef (lean)": 250,
    Tofu: 144,
    Quinoa: 120,
    Oats: 389,
    "White Rice (cooked)": 130,
    "Whole Wheat Pasta": 124,
    Avocado: 160,
    "Cheddar Cheese": 402,
    "Salmon (cooked)": 206,
    "Shrimp (cooked)": 99,
    Broccoli: 55,
    Cauliflower: 25,
    "Chicken Curry": 200,
    Biryani: 300,
    "Dal (Cooked)": 100,
    "Paneer Tikka": 320,
    Samosa: 250,
    Pineapple: 50,
    Apples: 52,
    Bananas: 89,
    Grapes: 69,
    Peaches: 59,
    Mangoes: 60,
    Pears: 57,
    Oranges: 43,
    "Chicken Breast (cooked)": 165,
    "Turkey (cooked)": 135,
    "Pork Chops (cooked)": 250,
    "Bacon (cooked)": 42,
    Eggs: 68,
    "Milk (1 cup)": 124,
    "Greek Yogurt (1 cup)": 100,
    "Peanut Butter (1 tbsp)": 94,
    "Almonds (1 oz)": 160,
    "Walnuts (1 oz)": 185,
    "Olive Oil (1 tbsp)": 119,
  };

  showFood(foodData);
});

closeButtonFood.addEventListener("click", function (event) {
  hidePopup(foodAdder);
});

// Event listener to close the popups when clicked outside
document.addEventListener("click", function (event) {
  if (!foodAdder.contains(event.target) && event.target !== addFood) {
    hidePopup(foodAdder);
  }
});

// Append Food options to the selection dropdown
function AppendFoodOptions(data) {
  selectFood.innerHTML = null;
  const keysArray = Object.keys(data);
  const firstKey = keysArray[0];
  var weightInput = document.getElementById("weight");
  var weight,
    calories,
    selectedFood = firstKey;
  

  for (let item in data) {
    let opt = document.createElement("option");
    opt.value = item;
    opt.textContent = item;

    selectFood.onchange = () => {
      selectedFood = selectFood.value;
    };
    weightInput.oninput = () => {
      weight = parseFloat(weightInput.value);
      const caloriesPer100g = data[selectedFood];
      calories = (weight / 100) * caloriesPer100g;
      calories = calories.toFixed(2);
    };
    selectFood.onchange = () => {
      selectedFood = selectFood.value;
      if (weight) {
        weight = parseFloat(weightInput.value);
        const caloriesPer100g = data[selectedFood];
        calories = (weight / 100) * caloriesPer100g;
        calories = calories.toFixed(2);
      }
    };

    if (!isNaN(calories)) {
      calories = calories.toFixed(2);
    }
    document.getElementById("AddFoodData").onclick = async () => {
        document.getElementById("AddFoodData").disabled = true;
      const title = selectedFood;
      let send = { title, weight, calories };
  
      if (title && calories && weight) {
        try {
          let res = await fetch(
            `https://server-fitbuddy.onrender.com/user/food`,
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

          document.getElementById("AddFoodData").disabled = false;
          weightInput.value = ""
          if (jsonData.msg === "Food added to the menu") {
            alertMsg("data updated", "success");
            fetchingFood();
          } else {
            alertMsg("something went wrong", "fail");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        alertMsg("please input all value", "error");
      }
    };

    selectFood.append(opt);
  }
}
