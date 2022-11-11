
import {loginNav} from "../components/login_nav.js"

let login_div = document.getElementById('nav')

login_div.innerHTML = loginNav();


import {footer} from "../components/login_footer.js"

let footer_div = document.getElementById('footer');

footer_div.innerHTML = footer();