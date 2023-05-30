document.getElementById("navexeciseanch").style.backgroundColor = "#00548b";

let userDetails = document.getElementById("username");
userDetails.innerText = null;

let username = localStorage.getItem("user");
if (username === undefined) {
  window.location = "login.html";
}
userDetails.innerText = username;

document.getElementById("searchexerbtn").onclick = async () => {
  let search = document.getElementById("searchexerinp").value;
  let res = await fetch(
    `https://server-fitbuddy.onrender.com/exercise?title=${search}`
  );
  data = await res.json();
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
                "authentication":`Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
          );
          let jsonData = await res.json();
          if (jsonData.msg === "item added to menu"){
            alert("data updated")
            location.reload()
          }
          else {
            alert("something went wrong")
  
          }
          document.getElementById("entry").style.display = "block";
        } catch (error) {
          console.log(error)
        }
      };
    };
    container.append(p);
  });
}
