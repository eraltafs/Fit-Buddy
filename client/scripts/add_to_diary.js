import getprofile from "./getprofile.js";
import { navbar } from "../components/navbar.js";
import { footer } from "../components/login_footer.js";

let nav = document.querySelector("nav");
let footer_sec = document.querySelector("footer");
nav.innerHTML = navbar();
footer_sec.innerHTML = footer();
document.getElementById("navexerciseanch").style.backgroundColor = "#00548b";

let userDetails = document.getElementById("username");
let log_out = document.getElementById("log_out");
let searchexerbtn = document.getElementById("searchexerbtn");
let token = localStorage.getItem("token");
userDetails.innerText = null;

if (!token) {
  window.location = "login.html";
} else {
  window.onload = async () => {
    let jsondata = await getprofile();
    const { email } = jsondata;
    userDetails.innerText = email;
  };
}

log_out.onclick = () => {
  localStorage.removeItem("token");
  location.reload();
};

searchexerbtn.onclick = async () => {
  let search = document.getElementById("searchexerinp").value;
  let res = await fetch(
    `https://server-fitbuddy.onrender.com/exercise?title=${search}`,
    {
      headers: {
        authentication: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  let data = await res.json();
  Append(data);
};
let slectedexer = document.getElementById("slectedexer");
let exer = document.getElementById("exer");
let container = document.getElementById("matchresults");
let adder = document.getElementById("adder");

function Append(data) {
  exer.style.display = "block";
  container.innerHTML = null;

  data.forEach(({ title }) => {
    let p = document.createElement("p");
    p.textContent = title;
    p.onclick = () => {
      adder.style.display = "block";
      slectedexer.textContent = title;
      let duration = document.getElementById("duration");
      var minute;
      var calories;
      duration.oninput = () => {
        minute = duration.value;
        let h = Math.floor(minute * 9.2167);
        document.getElementById("calories").value = h;
        calories = document.getElementById("calories").value;
      };
      document.getElementById("AddExercise").onclick = async () => {
        try {
          let send = { title, calories, minute };
          let res = await fetch(
            `https://server-fitbuddy.onrender.com/user/excercise`,
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
            location.reload();
          } else {
            alert("something went wrong");
          }
          document.getElementById("entry").style.display = "block";
        } catch (error) {
          console.log(error);
        }
      };
    };
    container.append(p);
  });
}
