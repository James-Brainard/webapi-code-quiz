// HTML element selectors 
let body = document.querySelector("body");
let viewScores = document.getElementById('view-scores');
let timerLeft = document.querySelector('span');
let mainPage = document.getElementById('quiz');
let beginQuiz = document.getElementById('start-quiz');
let inputScore = document.getElementById('input-score');
let submitScore = document.getElementById('submit-score');
let userInitials = document.getElementById('user-initial');
let highScoreContainer = document.getElementById('highscores');
let highScoreList = document.getElementById('highscore-list');
let restart = document.getElementById('go-back');
let clearScores = document.getElementById('clear-scores');
let yourScore = document.getElementById('your-score');

// Timer variables
let timer = 75;
let questionCount = 0;
let timerSwitch = false;

console.log(timerLeft);

// Quiz Game elements
let mainDiv = document.createElement("div");
let questionTitle = document.createElement("h2");
let option1 = document.createElement("button");
let option2 = document.createElement("button");
let option3 = document.createElement("button");
let option4 = document.createElement("button");
let revealAnswer = document.createElement("h3");

const quizQuestions = [
  {
    question: "What is the best method to to add an element to the END of an Array?",
    a: ".pop()",
    b: ".join()",
    c: ".push()",
    d: ".concat()",
    correct: "c",
  },
  {
    question: "What is needed in the script element to link your JS file at the top of your html document?",
    a: "target",
    b: "object",
    c: "iteration",
    d: "defer",
    correct: "d",
  },
  {
    question: "How can you access an element by its id?",
    a: "document.queryElementById",
    b: "document.getElementById",
    c: "document.getElementId",
    d: "document.querySelectorId",
    correct: "b",
  },
];

// Timer Countdown
function countDown () {
  let timerInterval = setInterval(function (){
    timer --;
    timerLeft.textContent = timer;
    if (timer === 0) {
      clearInterval(timerInterval);
      timerLeft.textcontent = "";
    }
  }, 1000);
}


let score = 0;
let currentQuiz = 0;

function hideMainPage () {
  mainPage.style.display = "none";
}

// under showNextQuestion if we run thru all it should shoot back up. first line needs to check if any questions are left. 
function endQuiz () {
  console.log('hello'); 
  // Need to hide newly created main div
  // Need to display #input-score
  // Need to store input-score to local storage
  // Need to display the score (seconds left) in #your-score
  // Hide #input-score
  // Show highscores or show both at same time.
  // Reset the currentQuiz, reset score
  // #go-back could start game or show first div quiz-container. 
  // 
};

function isCorrect (event) {
    if (event.target.value == quizQuestions[currentQuiz].correct) {
      console.log("correct"); 
      currentQuiz ++; 
      showNextQuestion (); 
    } else {
      console.log('incorrect');
      timer = timer - 15;
    }
};

function showNextQuestion () {
  if (currentQuiz >= quizQuestions.length) {
    endQuiz();
    return;
  }

  document.body.appendChild(mainDiv);
  mainDiv.removeEventListener('click', isCorrect);
  mainDiv.appendChild(questionTitle);
  questionTitle.textContent = quizQuestions[currentQuiz].question;
  mainDiv.appendChild(option1);
  mainDiv.appendChild(option2);
  mainDiv.appendChild(option3);
  mainDiv.appendChild(option4);
  mainDiv.appendChild(revealAnswer);
  option1.textContent = quizQuestions[currentQuiz].a;
  option2.textContent = quizQuestions[currentQuiz].b;
  option3.textContent = quizQuestions[currentQuiz].c;
  option4.textContent = quizQuestions[currentQuiz].d;
  option1.value = "a";
  option2.value = "b";
  option3.value = "c";
  option4.value = "d";
  mainDiv.addEventListener("click", isCorrect);
};




console.log(questionTitle);

function beginQuestions () {
  countDown();
  hideMainPage();
  showNextQuestion();
}

beginQuiz.addEventListener("click", beginQuestions);