
import footer from "./components/login_footer.js"

let footer_div = document.getElementById('footer');

footer_div.innerHTML = footer();

import {loginNav} from "./components/login_nav.js"

let login_div = document.getElementById('nav')

login_div.innerHTML = loginNav();

let sign = document.getElementById('sign');
sign.onclick = ()=>{
    window.location.href="./Signup_pages/welcome.html"
}