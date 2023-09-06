import { animeQuestions, mangaQuestions } from "../js/questions.js";

let questionLimit = 20;
let timer;
let timerCounter = 10;
let quizData = [];
let currentQuestionIndex = 0;
let currentQuestionNumber = 1;

// Function to toggle visibility of elements
function toggleVisibility(elementId, className = "hidden") {
  const element = document.getElementById(elementId);
  element.classList.toggle(className);
}

function fetchData(category) {
  if (category === "anime") {
    quizData = animeQuestions;
  } else if (category === "manga") {
    quizData = mangaQuestions;
  }
  currentQuestionIndex = 0;
  displayQuestion();
}

// Function to handle category button clicks
function handleCategoryClick(category) {
  const categorySection = document.getElementById("category-section");
  const quizSection = document.getElementById("quiz-section");

  // Initial setup for smooth transition
  categorySection.style.opacity = "0";
  quizSection.style.opacity = "0";
  quizSection.style.display = "flex";
  
  // Randomize questions and their answers
  randomizeQuizData();

  // Fetch data for the selected category
  fetchData(category);


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
  ).textContent = `Question ${currentQuestionNumber} of 20`;

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
      handleAnswerClick(answer, checkmarkSpan, event)
    );
    answerButtonsElement.appendChild(button);
  });
  // Start the timer
  timerCounter = 10; // Reset the timer counter
  document.getElementById("timer-counter").textContent = timerCounter;
  timer = setInterval(() => {
    timerCounter--;
    document.getElementById("timer-counter").textContent = timerCounter;
    if (timerCounter <= 0) {
      clearInterval(timer);
      // Move to next question or show result if timer reaches 0
      handleAnswerClick(null, null, null); // Passing nulls because no button was actually clicked.
    }
  }, 1000);
}

function handleAnswerClick(selectedAnswer, checkmarkSpan, event) {
  clearInterval(timer); // Stop the existing timer
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
    // Optionally, you can add logic here to mark it as a wrong answer or just skip to next question
  } else {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      console.log("Correct!");
      event.target.closest(".answer-btn").classList.add("correct");
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
  }
}

// Function to shuffle an array (Fisher-Yates Shuffle)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to randomize questions and their answers
function randomizeQuizData() {
  // Randomize questions
  shuffleArray(quizData);

  // Randomize answers for each question
  quizData.forEach((questionObj) => {
    shuffleArray(questionObj.answers);
  });
}

// Add click event listeners to the category buttons
document.querySelectorAll(".category-btn").forEach((button) => {
  button.addEventListener("click", () => {
    console.log("Category button clicked"); // Debugging line
    const category = button.getAttribute("data-category");
    handleCategoryClick(category);
  });
});
