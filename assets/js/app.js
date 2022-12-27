/* ========================== Global Variables ==========================  */
let Information = document.getElementById("informationquiz");
let Questionner = document.getElementById("Questionnairequiz");
let tableresult = document.getElementById("tableresult");
let Titlepage = document.getElementById("headerTitle");

/* ========================== information page ==========================  */
let progress = document.getElementById("progress");
let circles = document.querySelectorAll(".circle");

let currentActive = 0;

Questionner.style.display = "none";
tableresult.style.display = "none";

function ProgressBarCheck() {
  currentActive++;

  if (currentActive <= circles.length - 1 && currentActive >= 0) {
    update();
  }
}

function update() {
  circles.forEach((circle, index) => {
    if (index <= currentActive) {
      circle.classList.add("active");
    }
  });

  const actives = document.querySelectorAll(".active");

  progress.style.width =
    ((actives.length - 1) / (circles.length - 1)) * 100 + "%";

  Questionner.style.display = "block";
  Information.style.display = "none";
  if (currentActive == 1) {
    Showdata();
  }
  if (currentActive == 2) {
    Quizresult();
  }
}
