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