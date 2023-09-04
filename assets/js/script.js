document.addEventListener("DOMContentLoaded", function () {
  // Grab the relevant elements
  const instructionPopup = document.getElementById("instruction-popup");
  const actionSection = document.getElementById("action-section");
  const initiateQuizBtn = document.getElementById("initiate-quiz");
  const closePopupBtn = document.getElementById("close-popup");

  // Function to show the popup
  const showPopup = () => {
    // Get the position of the action section
    const rect = actionSection.getBoundingClientRect();
    // Position the popup
    instructionPopup.style.top = `${rect.top}px`;
    instructionPopup.style.left = `${rect.left}px`;
    instructionPopup.style.width = `${rect.width}px`;
    instructionPopup.style.height = `${rect.height}px`;
    // Display the popup
    instructionPopup.style.display = "flex";
    instructionPopup.classList.add("show-popup");
  };

  // Function to hide the popup
  const hidePopup = () => {
    instructionPopup.style.display = "none";
    instructionPopup.classList.remove("show-popup");
  };

  // Show the popup when the "Instructions" button is clicked
  initiateQuizBtn.addEventListener("click", showPopup);

  // Close the popup when the close button is clicked
  closePopupBtn.addEventListener("click", hidePopup);
});
