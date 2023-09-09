document.getElementById("quiz-summary").style.display = "none";

import { animeQuestions, mangaQuestions } from "../js/questions.js";

class Quiz {
  constructor() {
    this.questionLimit = 15;
    this.userScore = 0;
    this.timer = null;
    this.timerCounter = 10;
    this.quizData = [];
    this.currentQuestionIndex = 0;
    this.currentQuestionNumber = 1;
    this.restartQuizButton = document.getElementById("restart-quiz");
    this.homeButton = document.getElementById("home-button");
    this.usernameInput = document.getElementById("username");
    this.saveScoreButton = document.getElementById("save-score-btn");
    this.leaderboardList = document.getElementById("leaderboard-list");
    console.log("Quiz class initialized.");

    // Attach event listeners
    this.restartQuizButton.addEventListener("click", () => this.restartQuiz());
    this.homeButton.addEventListener("click", () => this.goToHome());
    this.saveScoreButton.addEventListener("click", () =>
      this.saveUsernameAndScore()
    );

    // Load leaderboard initially
    this.loadLeaderboard();
  }

  restartQuiz() {
    // Reset all quiz states
    this.userScore = 0;
    this.currentQuestionIndex = 0;
    this.currentQuestionNumber = 1;

    // Optionally shuffle the questions again
    this.randomizeQuizData();

    // Go back to the first question
    this.displayQuestion();
    this.smoothTransition("quiz-summary", "quiz-section");
  }

  goToHome() {
    // Reset all quiz states
    this.userScore = 0;
    this.currentQuestionIndex = 0;
    this.currentQuestionNumber = 1;

    // Transition back to the category section
    this.smoothTransition("quiz-summary", "category-section");
  }

  fetchData(category) {
    try {
      console.log(`Fetching data for category: ${category}`);
      if (category === "anime") {
        this.quizData = animeQuestions;
      } else if (category === "manga") {
        this.quizData = mangaQuestions;
      }
      this.randomizeQuizData();
      this.currentQuestionIndex = 0;
      this.displayQuestion();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  handleCategoryClick(category) {
    console.log(`Handling click for category: ${category}`);
    this.smoothTransition("category-section", "quiz-section");
    this.fetchData(category);
  }

  displayQuestion() {
    try {
      console.log("Displaying question.");
      const questionElement = document.getElementById("quiz-question");
      const answerButtonsElement = document.getElementById("answer-buttons");
      const currentQuestion = this.quizData[this.currentQuestionIndex];

      questionElement.textContent = currentQuestion.question;
      answerButtonsElement.innerHTML = "";

      document.getElementById(
        "question-counter"
      ).textContent = `Question ${this.currentQuestionNumber} of 15`;

      currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("answer-btn");
        button.addEventListener("click", () => this.handleAnswerClick(answer));
        answerButtonsElement.appendChild(button);
      });

      this.startTimer();
    } catch (error) {
      console.error("Error displaying question:", error);
    }
  }

  startTimer() {
    try {
      console.log("Starting timer.");
      this.timerCounter = 10;
      document.getElementById("timer-counter").textContent = this.timerCounter;
      this.timer = setInterval(() => {
        this.timerCounter--;
        document.getElementById("timer-counter").textContent =
          this.timerCounter;
        if (this.timerCounter <= 0) {
          clearInterval(this.timer);
          this.handleAnswerClick(null);
        }
      }, 1000);
    } catch (error) {
      console.error("Error starting timer:", error);
    }
  }

  handleAnswerClick(selectedAnswer) {
    try {
      console.log("Handling answer click.");
      clearInterval(this.timer);
      const currentQuestion = this.quizData[this.currentQuestionIndex];
      let answerButtonsElement = document.getElementById("answer-buttons");

      answerButtonsElement
        .querySelectorAll(".correct, .wrong")
        .forEach((btn) => {
          btn.classList.remove("correct", "wrong");
        });

      // Find the button that the user clicked
      const clickedButton = Array.from(answerButtonsElement.children).find(
        (button) => button.textContent === selectedAnswer
      );

      // Find the button with the correct answer
      const correctButton = Array.from(answerButtonsElement.children).find(
        (button) => button.textContent === currentQuestion.correctAnswer
      );

      if (selectedAnswer === currentQuestion.correctAnswer) {
        console.log("Correct answer selected.");
        this.userScore++;
        if (clickedButton) {
          console.log("Before:", clickedButton.classList);
          clickedButton.classList.add("correct");
          console.log("After:", clickedButton.classList);
        }
      } else {
        console.log("Incorrect answer selected.");
        if (clickedButton) {
          console.log("Before:", clickedButton.classList);
          clickedButton.classList.add("wrong");
          console.log("After:", clickedButton.classList);
        }
        if (correctButton) {
          // Show a checkmark next to the correct answer
          correctButton.innerHTML += " ✔️";
        }
      }

      // Disable buttons temporarily
      Array.from(answerButtonsElement.children).forEach((button) => {
        button.disabled = true;
      });

      setTimeout(() => {
        // Enable buttons
        Array.from(answerButtonsElement.children).forEach((button) => {
          button.disabled = false;
        });

        // Remove the classes after showing them
        if (clickedButton) {
          clickedButton.classList.remove("correct", "wrong");
        }
        if (correctButton) {
          correctButton.innerHTML = correctButton.innerHTML.replace(" ✔️", "");
        }

        this.currentQuestionIndex++;
        this.currentQuestionNumber++;

        if (this.currentQuestionIndex < this.questionLimit) {
          this.displayQuestion();
        } else {
          console.log("Quiz ended");
          document.getElementById(
            "quiz-score"
          ).textContent = ` ${this.userScore}`;
          this.smoothTransition("quiz-section", "quiz-summary");
        }
      }, 2000);
    } catch (error) {
      console.error("Error handling answer click:", error);
    }
  }

  randomizeQuizData() {
    try {
      console.log("Randomizing quiz data.");
      // Shuffle the questions first
      this.quizData = this.shuffleArray(this.quizData);

      // Then shuffle the answers for each question
      this.quizData.forEach((questionObj) => {
        questionObj.answers = this.shuffleArray(questionObj.answers);
      });
    } catch (error) {
      console.error("Error randomizing quiz data:", error);
    }
  }

  shuffleArray(arr) {
    try {
      console.log("Shuffling array.");
      let newArr = [...arr];
      for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
      }
      return newArr;
    } catch (error) {
      console.error("Error shuffling array:", error);
    }
  }

  smoothTransition(fromSection, toSection) {
    try {
      console.log(`Transitioning from ${fromSection} to ${toSection}.`);
      document.getElementById(fromSection).classList.add("fade-out");

      setTimeout(() => {
        document.getElementById(fromSection).style.display = "none";
        document.getElementById(fromSection).classList.remove("fade-out");

        document.getElementById(toSection).style.display = "block";
        document.getElementById(toSection).classList.add("fade-in");

        setTimeout(() => {
          document.getElementById(toSection).classList.remove("fade-in");
        }, 1000);
      }, 1000);
    } catch (error) {
      console.error("Error during transition:", error);
    }
  }

  saveUsernameAndScore() {
    const username = this.usernameInput.value;
    const score = this.userScore;

    // Save to local storage
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ username, score });
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    // Update and display the leaderboard
    this.loadLeaderboard();
    this.displayLeaderboard();
  }

  loadLeaderboard() {
    this.leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  }

  displayLeaderboard() {
    // Sort leaderboard
    this.leaderboard.sort((a, b) => b.score - a.score);

    // Update the DOM
    this.leaderboardList.innerHTML = "";
    this.leaderboard.forEach((entry, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${index + 1}. ${entry.username} - ${entry.score}`;
      this.leaderboardList.appendChild(listItem);
    });
  }
}

const quiz = new Quiz();

document.querySelectorAll(".category-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");
    quiz.handleCategoryClick(category);
  });
});
