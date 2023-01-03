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

    if ((currentActive <= circles.length-1) && (currentActive >= 0)) {
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

    progress.style.width =((actives.length - 1) / (circles.length - 1)) * 100 + "%";

    Questionner.style.display = "block";
    Information.style.display = "none";
    if(currentActive==1){
        Showdata();
    }
    if(currentActive==2){
        Arrayanswer.sort((a, b) =>
            a.index > b.index ? 1 : a.index < b.index ? -1 : 0
        );
        console.log(Arrayanswer);
        Quizresult();
    }
}

/* ========================== Quiz page ==========================  */
let answerlabel = document.querySelectorAll(".answer");
let questions = document.querySelector("#Currentquestion");
let answer_a = document.getElementById("answer_a");
let answer_b = document.getElementById("answer_b");
let answer_c = document.getElementById("answer_c");
let answer_d = document.getElementById("answer_d");
let currentquestion = document.getElementById("questionNumber");
let totalquestion = document.getElementById("total_question");
let submitBtn = document.getElementById("submitQuiz");
let seconds = document.getElementById("second_time");

let prog = document.getElementById("prog");

let score = 0;
let timeanswer;
let myInterval;
let Arrayanswer=[];
let prevquestion = [];

totalquestion.innerText = quizData.length;

function getRndInteger(min, max) {
    let NumberRund ;
    do {
        NumberRund = Math.floor(Math.random() * (max - min)) + min;
    } while (prevquestion.includes(NumberRund));
    return NumberRund;
}

let questionindex = getRndInteger(0, quizData.length);
let currentQuiz=0;

function Showdata() {
    prevquestion.push(questionindex);

    // clearInterval(myInterval);
    // timeanswer = 30;
    // myInterval = setInterval(countdown, 1000);
    prog.style.width = ((currentQuiz + 1) / quizData.length) * 100 + "%";

    Titlepage.innerHTML = "AWS Cloud Practitioner Knowledge Test ";

    console.log(questionindex);

    deselectAnswers();

    const currentQuizData = quizData[questionindex];
    currentquestion.innerText = currentQuiz + 1;
    questions.innerHTML = currentQuizData.question;
    console.log(questions.innerHTML);
    answer_a.innerText = currentQuizData.a;
    answer_b.innerText = currentQuizData.b;
    answer_c.innerText = currentQuizData.c;
    answer_d.innerText = currentQuizData.d;
}

submitBtn.addEventListener("click", () => {
    const answer = getSelected();
    if (answer) {

        if (answer === quizData[questionindex].correct) {
            score++;
        }
        Arrayanswer.push({ index: questionindex, answer: answer });

        currentQuiz++;
        if (currentQuiz < quizData.length) {
            questionindex = getRndInteger(0, quizData.length);
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
function countdown() {
    timeanswer--;
    seconds.innerHTML = formatTime(timeanswer);
    if (timeanswer == 27) {
        Arrayanswer.push({ index: questionindex, answer: "Noanswer" });
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            questionindex = getRndInteger(0, quizData.length);
            Showdata();
        } else {
            clearInterval(myInterval);
            ProgressBarCheck();
        }
    }
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

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
                                <td><button class="d-flex align-items-center border-0 border-top" data-bs-toggle="modal" data-bs-target="#modal" onclick="Quizdetail(this)" useranswer="${Arrayanswer[i].answer}"  data-id="${i}">View detail</button></td>
                            </tr>
                            `;
    }
}

function Quizdetail(element) {
    Resetquizdetail();
    let userquiz = element.getAttribute("useranswer");
    let id = element.getAttribute("data-id");
    const currentQuizData = quizData[id];
    questionEl_corr.innerText = currentQuizData.question;
    answer_a_corr.innerText = currentQuizData.a;
    answer_b_corr.innerText = currentQuizData.b;
    answer_c_corr.innerText = currentQuizData.c;
    answer_d_corr.innerText = currentQuizData.d;
    document.getElementById(currentQuizData.correct+"_corr").checked = true;
    document.getElementById(currentQuizData.correct+"_corr_answer").style.backgroundColor = "green";
    if (currentQuizData.correct != userquiz && userquiz != "Noanswer") {
        document.getElementById(userquiz + "_corr_answer").style.backgroundColor =
            "red";
    }
    explan_corr.innerText = currentQuizData.explan;
}

function Resetquizdetail() {
    document.getElementById("a_corr_answer").style.backgroundColor = "white";
    document.getElementById("b_corr_answer").style.backgroundColor = "white";
    document.getElementById("c_corr_answer").style.backgroundColor = "white";
    document.getElementById("d_corr_answer").style.backgroundColor = "white";
}