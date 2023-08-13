let questionsForUser = [
  "Is a penguin a bird?",
  "Is the earth round?",
  "Is the Sun a star?",
  "Is Sydney the capital of Australia?",
  "Does the Black See locate in Odesa?",
];

let captionQuestions = [
  "Question 1 of 5",
  "Question 2 of 5",
  "Question 3 of 5",
  "Question 4 of 5",
  "Question 5 of 5",
];

let rightAnswers = ["Yes", "Yes", "Yes", "No", "Yes"];
let userAnswers = [];

const jsConfetti = new JSConfetti();
let currentQuestionIndex = 0;
let counter = 0;
let currentCaptionIndex = 0;

let buttonNext = document.getElementById("btn");
let btnResult = document.getElementById("btnResult");
let caption = document.getElementById("caption");
let question = document.getElementById("question");

btnResult.addEventListener("click", () => {
  if (counter == 5) {
    jsConfetti.addConfetti();
  }
});
btnResult.addEventListener("click", showResultOnlyAfterTest);
buttonNext.addEventListener("click", onNextButtonClick);

initQuestionNumbers();
initQuestion();

function onNextButtonClick() {
  if (!isTestFinish() && isSelectedAnswer()) {
    processUserAnswer();
    showNextQuastion();
    uncheckRadioButtons();
    showNextQuastionCaption();
    destroyUndefined();
  }
}

function showNextQuastion() {
  currentQuestionIndex++;
  initQuestion();
}

function initQuestion() {
  question.innerHTML = questionsForUser[currentQuestionIndex];
}

function showNextQuastionCaption() {
  currentCaptionIndex++;
  initQuestionNumbers();
}

function initQuestionNumbers() {
  caption.innerHTML = captionQuestions[currentCaptionIndex];
}

function processUserAnswer() {
  let myInputs = document.querySelectorAll(".input");
  for (let i = 0; i < myInputs.length; i++) {
    if (myInputs[i].checked) {
      userAnswers.push(myInputs[i].value);
    }
  }
  console.log(userAnswers);
}

function isSelectedAnswer() {
  let myInputs = document.querySelectorAll(".input");
  for (let i = 0; i < myInputs.length; i++) {
    if (myInputs[i].checked) {
      return true;
    }
  }
  return false;
}

function uncheckRadioButtons() {
  let myInputs = document.querySelectorAll(".input");
  for (let i = 0; i < myInputs.length; i++) {
    myInputs[i].checked = false;
  }
}

function isTestFinish() {
  return questionsForUser.length === currentQuestionIndex;
}

function calcResult() {
  for (let i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i] === rightAnswers[i]) {
      counter++;
    }
  }
  console.log(counter);
}

function showResult() {
  calcResult();
  if (counter == 5) {
    question.innerHTML = `It's great result`;
  }
  if (counter == 4) {
    question.innerHTML = `Not bad result, but you should improve`;
  }
  if (counter <= 3) {
    question.innerHTML = `Go read!!!`;
  }
}

function showResultOnlyAfterTest() {
  if (userAnswers.length === rightAnswers.length) {
    return showResult();
  }
}

function destroyUndefined() {
  if (userAnswers.length === rightAnswers.length) {
    caption.innerHTML = "";
    question.innerHTML = "If you want to get result push result button";
  }
}
