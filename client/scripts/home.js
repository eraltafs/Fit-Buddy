
	document.getElementById("navhomeanch").style.backgroundColor = "#00548b";


let userDetails = document.getElementById("username");
userDetails.innerText = null;

let userDetails1 = document.getElementById("username1");
userDetails1.innerText = null;
let username = localStorage.getItem("user");
console.log(username)
if (!localStorage.getItem(token)) {
	window.location = "login.html";
}else{
	
}
userDetails.innerText = username;
userDetails1.innerText = username;

let sharebtn = document.getElementById("share");
sharebtn.addEventListener("click", fun);
function fun() {
	let commentdiv = document.getElementById("comments");
	let comments = document.getElementById("commenting").value;
	console.log(comments);
	let div = document.createElement("div");
	let p = document.createElement("h1");
	p.innerText = comments;

	let like = document.createElement("p");
	like.innerHTML = `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M5,9V21H1V9H5M9,21A2,2 0 0,1 7,19V9C7,8.45 7.22,7.95 7.59,7.59L14.17,1L15.23,2.06C15.5,2.33 15.67,2.7 15.67,3.11L15.64,3.43L14.69,8H21C22.11,8 23,8.9 23,10V12C23,12.26 22.95,12.5 22.86,12.73L19.84,19.78C19.54,20.5 18.83,21 18,21H9M9,19H18.03L21,12V10H12.21L13.34,4.68L9,9.03V19Z" />
</svg>`;
	like.onclick = () => {
		like.style.color = "blue";
	};

	let comm = document.createElement("p");
	comm.innerHTML = `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M12,23A1,1 0 0,1 11,22V19H7A2,2 0 0,1 5,17V7A2,2 0 0,1 7,5H21A2,2 0 0,1 23,7V17A2,2 0 0,1 21,19H16.9L13.2,22.71C13,22.89 12.76,23 12.5,23H12M3,15H1V3A2,2 0 0,1 3,1H19V3H3V15Z" />
</svg>`;
	comm.onclick = () => {
		alert("You are not authorized to comment on othes post");
	};

	div.append(p, like, comm);
	commentdiv.append(div);
	comments.innerText = null;
}
console.log(comments);
