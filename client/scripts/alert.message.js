function alertMsg(message, status) {
  if (document.getElementById("alertDiv") != undefined) {
    document.getElementById("alertDiv").remove();
  }
  const msgDiv = document.createElement("div");
  msgDiv.id = "alertDiv";
  
  const msgBox = document.createElement("p");
  msgBox.id = "msgBox";
  msgBox.innerText = message;
  
  const closeBtn = document.createElement("p");
  closeBtn.innerHTML = `<i style="color:white" class="fa-solid fa-xmark"></i>`;
  closeBtn.id = "closeAlert";

  
  let backgrnd = null;
  if (status == "success") {
    backgrnd = "green";
  } else if (status == "fail") {
    backgrnd = "red";
  } else if (status == "error") {
    backgrnd = "orange";
  } else {
    console.error("Invalid status for alert: " + status);
    return;
  }
  
  msgDiv.style.backgroundColor = backgrnd;

  msgDiv.append(msgBox, closeBtn);
  
  
  document.querySelector("body").append(msgDiv);
  setTimeout(() => {
    msgDiv.style.top = "20px";
  }, 50);

  setTimeout(() => {
    fadeOutAndRemove(msgDiv);
  }, 3000); // Hide the alert after 3 seconds

  document.querySelector("#closeAlert").onclick = () => {
    msgDiv.style.display = "none";
  };
  
}

function fadeOutAndRemove(element) {
  let opacity = 1;
  const timer = setInterval(() => {
    if (opacity <= 0.01) {
      clearInterval(timer);
      element.style.display = "none";
      element.remove();
    }
    element.style.opacity = opacity;
    opacity -= opacity * 0.1;
  }, 50);
}

export { alertMsg };
