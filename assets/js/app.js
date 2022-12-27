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

/* ========================== Quiz page ==========================  */
let answerlabel = document.querySelectorAll(".answer");
let questions = document.getElementById("question");
let answer_a = document.getElementById("answer_a");
let answer_b = document.getElementById("answer_b");
let answer_c = document.getElementById("answer_c");
let answer_d = document.getElementById("answer_d");
let currentquestion = document.getElementById("questionNumber");
let totalquestion = document.getElementById("total_question");
let submitBtn = document.getElementById("submitQuiz");
// let seconds = document.getElementById("second_time");

let prog = document.getElementById("prog");


let currentQuiz = 0;
let score = 0;
// let timeanswer = 30;
// let myInterval;
let Arrayanswer=[];

totalquestion.innerText = quizData.length;


function Showdata() {

     prog.style.width = ((currentQuiz + 1) / quizData.length) * 100 + "%";

    Titlepage.innerHTML = "AWS Cloud Practitioner Knowledge Test ";

    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];
    currentquestion.innerText = currentQuiz + 1;
    questions.innerText = currentQuizData.question;
    answer_a.innerText = currentQuizData.a;
    answer_b.innerText = currentQuizData.b;
    answer_c.innerText = currentQuizData.c;
    answer_d.innerText = currentQuizData.d;
}

submitBtn.addEventListener("click", () => {
    const answer = getSelected();
    if (answer) {

        if (answer === quizData[currentQuiz].correct) {
            score++;
        }
        Arrayanswer.push({ index: currentQuiz, answer: answer });
        console.log(Arrayanswer);

        currentQuiz++;
        if (currentQuiz < quizData.length) {
            Showdata();
        }else{
            ProgressBarCheck();
        }
    }
});

function deselectAnswers() {
    answerlabel.forEach((answerEl) => {
        answerEl.checked = false;
    });
}

function getSelected() {
    let answer = undefined;

    answerlabel.forEach((answerEl) => {
        if (answerEl.checked) {
        answer = answerEl.id;
        }
    });

    return answer;
}

/* ======================== Start_Time_counter ======================== */
// function countdown() {
//     timeanswer--;
//     seconds.innerHTML = formatTime(timeanswer);
//     if (timeanswer == 0) {
//         myStopFunction();
//         Arrayanswer.push({ index : currentQuiz, answer :"Noanswer" });
//         currentQuiz++;
//         Showdata();
//     }
// }

// function formatTime(time) {
//     return time < 10 ? `0${time}` : time;
// }

// function myStopFunction() {
//     clearInterval(myInterval);
// }