
import {nav} from "./components/login_nav.js"

let nav_div = document.getElementById('nav');

nav_div.innerHTML = nav();


import footer from "./components/login_footer.js"

let footer_div = document.getElementById('footer');

footer_div.innerHTML = footer();

