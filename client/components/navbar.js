const navbar = () => {
  return `<div id="navtop">
  <div id="topleft">
  <a href="./homepage.html">
    <img src="https://i.ibb.co/Y8k72m4/Fit-Buddies-1.png" alt="" />
  </a>
  </div>
  <div id="topright">
      <p id="username"></p>
      <p> <a id="log_out"> Log Out</a></p>
  </div>
</div>
<div id="navmiddle">
<div id="hamburger-menu">
      <a href="./homepage.html" id="navhomeanch">MY HOME</a>
      <a href="" id="navfoodanch">FOOD</a>
      <a href="./exercise.html" id="navexerciseanch">EXERCISE</a>
      <a href="">REPORTS</a>
      <a href="">PROFILE</a>
  </div>
  <div id="hamburger-icon">&#9776;</div>
</div>`;
};

export { navbar };
