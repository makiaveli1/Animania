// Function to toggle visibility of elements
function toggleVisibility(elementId, className = "hidden") {
  const element = document.getElementById(elementId);
  element.classList.toggle(className);
}

// Function to handle category button clicks
function handleCategoryClick() {
  const categorySection = document.getElementById("category-section");
  const quizSection = document.getElementById("quiz-section");

  // Initial setup for smooth transition
  categorySection.style.opacity = "0";
  quizSection.style.opacity = "0";
  quizSection.style.display = "flex";

  // Hide category section after transition
  setTimeout(() => {
    categorySection.style.display = "none";
    quizSection.style.opacity = "1";
  }, 500);  // 500ms delay to match the CSS transition
}

// Add click event listeners to the category buttons
document.querySelectorAll(".category-btn").forEach((button) => {
  button.addEventListener("click", handleCategoryClick);
});

