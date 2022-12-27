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

/* ========================== Result page ==========================  */
let quizresult = document.querySelector(".result_quiz");
let questionEl_corr = document.getElementById("question_corr");
let answer_a_corr = document.getElementById("answer_a_corr");
let answer_b_corr = document.getElementById("answer_b_corr");
let answer_c_corr = document.getElementById("answer_c_corr");
let answer_d_corr = document.getElementById("answer_d_corr");
let explan_corr = document.getElementById("explan_corr");

function Quizresult(){
    Titlepage.innerHTML = "Result Quiz ";
    Questionner.style.display = "none";
    tableresult.style.display = "block";
    for (let i = 0; i < quizData.length; i++) {
        let result;
        if (Arrayanswer[i].answer == quizData[i].correct) {
        result = true;
        } else {
        result = false;
        }
        quizresult.innerHTML += `
                            <tr>
                                <td>Question - ${i + 1} </td>
                                <td id="useranswer">${
                                        Arrayanswer[i].answer
                                }</td>
                                <td>${result}</td>
                                <td><button class="d-flex align-items-center border-0 border-top" data-bs-toggle="modal" data-bs-target="#modal" onclick="Quizdetail(${Arrayanswer[i].answer},${i})"  data-id="${i}">View detail</button></td>
                            </tr>
                            `;
    }
}

function Quizdetail(useranswer,id) {
    Resetquizdetail();
    const currentQuizData = quizData[id];
    questionEl_corr.innerText = currentQuizData.question;
    answer_a_corr.innerText = currentQuizData.a;
    answer_b_corr.innerText = currentQuizData.b;
    answer_c_corr.innerText = currentQuizData.c;
    answer_d_corr.innerText = currentQuizData.d;
    document.getElementById(currentQuizData.correct+"_corr").checked = true;
    document.getElementById(currentQuizData.correct+"_corr_answer").style.backgroundColor = "green";
    userquiz = useranswer.getAttribute("id");
    if (currentQuizData.correct != userquiz) {
        document.getElementById(userquiz + "_corr_answer").style.backgroundColor ="red";
    }
        explan_corr.innerText = currentQuizData.explan;
}

function Resetquizdetail() {
    document.getElementById("a_corr_answer").style.backgroundColor = "white";
    document.getElementById("b_corr_answer").style.backgroundColor = "white";
    document.getElementById("c_corr_answer").style.backgroundColor = "white";
    document.getElementById("d_corr_answer").style.backgroundColor = "white";
}