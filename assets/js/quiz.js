import { animeQuestions, mangaQuestions } from "../js/questions.js";

let questionLimit = 5;
let userScore = 0;
let timer;
let timerCounter = 10;
let quizData = [];
let currentQuestionIndex = 0;
let currentQuestionNumber = 1;

function fetchData(category) {
  if (category === "anime") {
    quizData = animeQuestions;
  } else if (category === "manga") {
    quizData = mangaQuestions;
  }
  randomizeQuizData();

  currentQuestionIndex = 0;
  displayQuestion();
  console.log(quizData);
}

// Function to handle category button clicks
function handleCategoryClick(category) {
  const categorySection = document.getElementById("category-section");
  const quizSection = document.getElementById("quiz-section");

  // Fetch data for the selected category
  fetchData(category);

  // Initial setup for smooth transition
  categorySection.style.opacity = "0";
  quizSection.style.opacity = "0";

  quizSection.classList.add("active");

  // Hide category section after transition
  setTimeout(() => {
    categorySection.style.display = "none";
    quizSection.style.opacity = "1";
  }, 500);
}

function displayQuestion() {
  const questionElement = document.getElementById("quiz-question");
  const answerButtonsElement = document.getElementById("answer-buttons");
  const currentQuestion = quizData[currentQuestionIndex];

  questionElement.textContent = currentQuestion.question;
  answerButtonsElement.innerHTML = "";

  document.getElementById(
    "question-counter"
  ).textContent = `Question ${currentQuestionNumber} of 5`;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer;
    button.classList.add("answer-btn");
    const checkmarkSpan = document.createElement("span");
    checkmarkSpan.innerText = " ✔";
    checkmarkSpan.classList.add("checkmark");
    checkmarkSpan.style.display = "none"; // Initially hidden
    button.appendChild(checkmarkSpan);
    button.addEventListener("click", (event) =>
      handleAnswerClick(answer, event)
    );
    answerButtonsElement.appendChild(button);
  });
  // Start the timer
  timerCounter = 10;
  document.getElementById("timer-counter").textContent = timerCounter;
  timer = setInterval(() => {
    timerCounter--;
    document.getElementById("timer-counter").textContent = timerCounter;
    if (timerCounter <= 0) {
      clearInterval(timer);
      handleAnswerClick(null, null, null);
    }
  }, 1000);
}

// Function to handle answer clicks
function handleAnswerClick(selectedAnswer, event) {
  clearInterval(timer);
  const currentQuestion = quizData[currentQuestionIndex];
  const allAnswerButtons = document.querySelectorAll(".answer-btn");

  let correctButton;
  allAnswerButtons.forEach((button) => {
    if (button.innerText.includes(currentQuestion.correctAnswer)) {
      correctButton = button;
    }
  });

  if (selectedAnswer === null) {
    console.log("Time's up!");
  } else {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      console.log("Correct!");
      event.target.closest(".answer-btn").classList.add("correct");
      userScore++;
    } else {
      console.log("Wrong!");
      event.target.closest(".answer-btn").classList.add("wrong");
      if (correctButton) {
        correctButton.querySelector(".checkmark").style.display = "inline";
      }
    }
  }

  currentQuestionIndex++;
  currentQuestionNumber++;

    if (
    currentQuestionIndex < quizData.length &&
    currentQuestionIndex < questionLimit
  ) {
    setTimeout(() => {
      allAnswerButtons.forEach((button) => {
        button.classList.remove("correct", "wrong");
        button.querySelector(".checkmark").style.display = "none";
      });
      displayQuestion();
    }, 2000);
  } else {
    console.log("Quiz ended");
    document.getElementById("quiz-score").textContent = ` ${userScore}`;
    const quizSection = document.getElementById("quiz-section");
    setTimeout(() => {
      quizSection.classList.add("hidden");  // Hide the quiz section
      quizSection.classList.remove("active");  // Remove active class
    }, 100);
    document.getElementById("quiz-summary").classList.remove("hidden");  // Show the quiz summary
    console.log(quizSection.classList);
  }
}

// Function to shuffle array
function selectRandomArrayIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}
function shuffleArray(arrOfNumbers) {
  const arr = [...arrOfNumbers];
  const newArr = [];
  let newValue;
  let randomIndex;
  for (let index = 0; index < arrOfNumbers.length; index++) {
    randomIndex = selectRandomArrayIndex(arr);
    newValue = arr[randomIndex];
    arr.splice(randomIndex, 1);
    newArr.push(newValue);
  }
  return newArr;
}

// Function to randomize questions and their answers
function randomizeQuizData() {
  console.log("Before shuffle: ", quizData);
  quizData = shuffleArray(quizData);
  console.log("After shuffle: ", quizData);
  quizData.forEach((questionObj, index) => {
    console.log(
      `Question ${index + 1} answers before shuffle: `,
      questionObj.answers
    );

    questionObj.answers = shuffleArray(questionObj.answers);
    console.log(
      `Question ${index + 1} answers after shuffle: `,
      questionObj.answers
    );
  });
}

// Add click event listeners to the category buttons
document.querySelectorAll(".category-btn").forEach((button) => {
  button.addEventListener("click", () => {
    console.log("Category button clicked");
    const category = button.getAttribute("data-category");
    handleCategoryClick(category);
  });
});

// Select the "Play Again" button
const restartButton = document.getElementById("restart-quiz");

// Attach an event listener to the "Play Again" button
restartButton.addEventListener("click", () => {
  // Reset quiz variables
  currentQuestionIndex = 0;
  currentQuestionNumber = 1;
  userScore = 0;

  // Hide the summary section
  document.getElementById("quiz-summary").classList.add("hidden");

  // Show the quiz section
  const quizSection = document.getElementById("quiz-section");
  quizSection.classList.remove("hidden");
  quizSection.classList.add("active");

  // Display the first question
  displayQuestion();
});
