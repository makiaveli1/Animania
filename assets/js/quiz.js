// Function to toggle visibility of elements
function toggleVisibility(elementId) {
  const element = document.getElementById(elementId);
  element.classList.toggle("hidden");
}
document.querySelectorAll(".category-btn").forEach((button) => {
  button.addEventListener("click", () => {
    toggleVisibility("category-section"); // Hide category section
    toggleVisibility("quiz-section"); // Show quiz section
  });

  document.querySelectorAll(".category-btn").forEach((button) => {
    button.addEventListener("click", () => {
      toggleVisibility("category-section"); // Hide category section
      toggleVisibility("quiz-section"); // Show quiz section
    });
  });
});
