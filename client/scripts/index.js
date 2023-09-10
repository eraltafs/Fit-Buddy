import { footer } from "../components/login_footer.js";
let footer_sec = document.querySelector("footer");
footer_sec.innerHTML = footer();

if (localStorage.getItem("token")) {
  window.location = "/homepage.html";
}

