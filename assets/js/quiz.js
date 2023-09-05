import { animeQuestions, mangaQuestions } from "../js/questions.js";

let quizData = [];
let currentQuestionIndex = 0;

// Function to toggle visibility of elements
function toggleVisibility(elementId, className = "hidden") {
  const element = document.getElementById(elementId);
  element.classList.toggle(className);
}

function displayError(message) {
  console.log("Trying to display error: " + message); // Debugging line
  const errorBox = document.getElementById("error-message");
  errorBox.textContent = message;
  errorBox.style.display = "block";
  setTimeout(() => {
    errorBox.style.display = "none";
  }, 3000); // Hide after 3 seconds
}

// Function to handle category button clicks
function handleCategoryClick(category) {
  const categorySection = document.getElementById("category-section");
  const quizSection = document.getElementById("quiz-section");

  // Initial setup for smooth transition
  categorySection.style.opacity = "0";
  quizSection.style.opacity = "0";
  quizSection.style.display = "flex";

  // Fetch data for the selected category
  fetchData(category);

  // Fetch data for the selected category
  fetchData(category);

  // Randomize questions and their answers
  randomizeQuizData();

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

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer;
    button.classList.add("answer-btn");
    button.addEventListener("click", (event) => handleAnswerClick(answer, event));
    answerButtonsElement.appendChild(button);
  });
}

function handleAnswerClick(selectedAnswer, event) {
  const currentQuestion = quizData[currentQuestionIndex];
  const clickedButton = event.target;  // Get the button that was clicked

  // Check if the answer is correct or wrong
  if (selectedAnswer === currentQuestion.correctAnswer) {
    console.log("Correct!");
    clickedButton.classList.add("correct"); // Add 'correct' class to the button
  } else {
    console.log("Wrong!");
    clickedButton.classList.add("wrong"); // Add 'wrong' class to the button
  }

  // Move to the next question or end the quiz
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    // Reset button colors before displaying the next question
    setTimeout(() => {
      document.querySelectorAll(".answer-btn").forEach((button) => {
        button.classList.remove("correct", "wrong"); // Remove added classes
      });
      displayQuestion();
    }, 1000);  // Delay for 1 second to show feedback
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

function fetchData(category) {
  if (category === "anime") {
    quizData = animeQuestions;
  } else if (category === "manga") {
    quizData = mangaQuestions;
  }
  currentQuestionIndex = 0;
  displayQuestion();
}

// Add click event listeners to the category buttons
document.querySelectorAll(".category-btn").forEach((button) => {
  button.addEventListener("click", () => {
    console.log("Category button clicked"); // Debugging line
    const category = button.getAttribute("data-category");
    handleCategoryClick(category);
  });
});
