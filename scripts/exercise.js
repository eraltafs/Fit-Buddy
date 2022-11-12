if(window.location == "http://127.0.0.1:5500/exercise.html"){
    document.getElementById("navexeciseanch").style.backgroundColor = "#00548b"
}


const today = new Date();
const yyyy = today.getFullYear();
let dd = today.getDate();

if (dd < 10) dd = '0' + dd;

var dayNames=['monday','tuesday','wednesday','thursday','friday','saturday','sunday']
var monthNames =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

let dayn = dayNames[today.getDay()-1];
let monthn = monthNames[today.getMonth()]
let date = `${dayn}, ${monthn} ${dd}, ${yyyy}`

let datefield = document.getElementById("date").textContent = date




async function fetching(){
    let res = await fetch(`http://localhost:3000/done`)
    data = await res.json()
    Append(data)
}
fetching()
let body = document.getElementById("exercisebody")
function Append(data){
    data.forEach(({id, calories,title,minute})=>{
        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        td1.textContent = title
        let td2 = document.createElement("td")
        td2.textContent = minute
        let td3 = document.createElement("td")
        td3.textContent = calories

        let td4 = document.createElement("td")
        td4.innerHTML = `<i class="fa-solid fa-circle-minus"></i>`
        td4.style.color = "red"
        td4.style.cursor = "pointer"
        td4.onclick = async()=>{
            let res = await fetch( `http://localhost:3000/done/${id}`,{method:"DELETE"})
        }
        tr.append(td1,td2,td3,td4)
        body.append(tr)
    })
}
