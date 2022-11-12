if (window.location == "http://127.0.0.1:5500/homepage.html") {
	document.getElementById("navhomeanch").style.backgroundColor = "#00548b";
}

let userDetails = document.getElementById("username");
userDetails.innerText = null;

let userDetails1 = document.getElementById("username1");
userDetails1.innerText = null;
let username = JSON.parse(localStorage.getItem("username")) || "";
if (username === "") {
	//userDetails.innerText = "Anurag";
	//window.location = "login.html";
}
//console.log(username);
userDetails = username;
