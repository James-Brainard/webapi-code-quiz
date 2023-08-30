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
let finalScore = document.getElementById('final-score');

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
    if (timer <= 0) {
      console.log("step-1");
      timerLeft.textcontent = "0"; 
      clearInterval(timerInterval);
      endQuiz();
      clearTimer();
    } else if (timerSwitch) {
      clearInterval(timerInterval);
    }
  }, 1000);
};


let score = 0;
let currentQuiz = 0;

function hideMainPage () {
  mainPage.style.display = "none";
};

function endQuiz () {
  mainDiv.style.display = "none";
  timerSwitch = true;
  inputScore.style.display = "block";
  finalScore.textContent = timer;
  // Reset the currentQuiz, reset score
  // #go-back could start game or show first div quiz-container. 
  // need to fix score to not go negative.
  // need to stop game once TIMER HIT ZERO
};

function showHighScores () {
  // hide the game
  // show the #highscore-list
  // get score from local storage
  // to display scores on the 'view hs button'
}

function clearHighscores () {
  // find way to clear local storage
  // clear ul elements
}

function restartGame () {
  //restart.addEventListener('click', resetAll); // event listener which will invoke a function to then 
  // find a way to reset varibles and/or timer
  // timerLeft = 75
  // hide highscores userinput and show quiz-container.
}

// need this function to reset back to .quiz-container
function resetAll () {
  highScoreContainer.style.display = "none";
  mainPage.style.display = "block";
  
}

function submitBtn (event) {
  event.preventDefault();
  let userInitialsInput = userInitials.value;
  const userInfo = {
    score: timer,
    initials: userInitials.value
  }
  let previousScores = JSON.parse(localStorage.getItem('score'));
  if (previousScores != null) {
    previousScores.push(userInfo);
    localStorage.setItem("score", JSON.stringify(previousScores));
  } else {
    localStorage.setItem('score', JSON.stringify([userInfo]));
  }
  inputScore.style.display = "none";
  highScoreContainer.style.display = "block";
  const getItem = localStorage.getItem('score');
  let scoreList = document.createElement("li");
  highScoreList.appendChild(scoreList);
  scoreList.textContent = getItem;
}

function clearTimer () {
  timerLeft.textContent = "0"
};

function isCorrect (event) {
    if (event.target.value == quizQuestions[currentQuiz].correct) {
      currentQuiz ++;
      showNextQuestion (); 
    } else {
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

restart.addEventListener('click', resetAll);
submitScore.addEventListener('click', submitBtn);
beginQuiz.addEventListener("click", beginQuestions);