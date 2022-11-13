if (window.location == "http://127.0.0.1:5500/add_to_diary.html") {
  document.getElementById("navexeciseanch").style.backgroundColor = "#00548b";
}

document.getElementById("searchexerbtn").onclick = async () => {
  let search = document.getElementById("searchexerinp").value;
  let res = await fetch(`https://shrouded-tundra-52307.herokuapp.com/posts/?q=${search}`);
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
        minute = duration.value
        let h = Math.floor(minute * 9.2167);
        document.getElementById("calories").value = h;
        calories = document.getElementById("calories").value;
      };
      document.getElementById("AddExercise").onclick = async () => {
        let send = {title,
            calories,
            minute,
        } 
        let res = await fetch(`https://shrouded-tundra-52307.herokuapp.com/done`, {
          method: "POST",
          body: JSON.stringify(send),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(await res.json())

      };
    };
    container.append(p);
  });
}
