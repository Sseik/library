const statusDiv = document.querySelector(".status");
const addBookButton = document.querySelector(".add-button");
const submitBookButton = document.querySelector(".submit-book");
const newBookModal = document.querySelector(".new-book-modal");

function toggleNewBookModalDisplay() {
  newBookModal.classList.toggle("not-displayed");
}

statusDiv.addEventListener("click", () => statusDiv.classList.toggle("read"));
addBookButton.addEventListener("click", toggleNewBookModalDisplay);
submitBookButton.addEventListener("click", (e) => {
  toggleNewBookModalDisplay();
});
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "Escape":
      newBookModal.classList.add("not-displayed");
      break;
    case "Enter":
      if (!newBookModal.classList.contains("not-displayed")) {
        submitBookButton.click();
      }
      break;
    case " ":
      document.activeElement.click();
  }
});
