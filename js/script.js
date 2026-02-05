const statusDiv = document.querySelector(".status");
const addBookButton = document.querySelector(".add-button");
const submitBookButton = document.querySelector(".submit-book");
const newBookModal = document.querySelector(".new-book-modal");
const bookshelves = document.querySelector(".bookshelves");
const newBookForm = newBookModal.querySelector("form");

const myLibrary = [];

function toggleNewBookModalDisplay() {
  newBookModal.classList.toggle("not-displayed");
}

function Book(title, author, numberOfPages, isRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.isRead = isRead;
}

Book.prototype.placeOnShelf = function () {
  const bookDiv = document.createElement("div");
  bookDiv.classList.add("book");
  const bookmarkShadow = document.createElement("div");
  bookmarkShadow.classList.add(".bookmark-shadow");
  const bookmark = document.createElement("div");
  bookmark.classList.add("bookmark");
  const gradientShadow = document.createElement("div");
  gradientShadow.classList.add("gradient-shadow");
  const spineText = document.createElement("div");
  spineText.classList.add("spine-text");
  spineText.textContent = this.title;
  bookDiv.id = this.id;
  bookDiv.title = this.title;
  bookDiv.append(bookmarkShadow, bookmark, gradientShadow, spineText);
  bookshelves.insertBefore(bookDiv, addBookButton);
};

function addBookToLibrary(title, author, numberOfPages, isRead) {
  myLibrary.push(new Book(title, author, numberOfPages, isRead));
}

function displayBooks() {
  bookshelves.querySelectorAll(".book").forEach((book) => book.remove());
  myLibrary.forEach((book) => book.placeOnShelf());
}

displayBooks();

statusDiv.addEventListener("click", () => statusDiv.classList.toggle("read"));
addBookButton.addEventListener("click", toggleNewBookModalDisplay);
submitBookButton.addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.querySelector("#book-title-input").value;
  const author = document.querySelector("#book-author-input").value;
  const numberOfPages = document.querySelector("#pages-number-input").value;
  const isRead = !!document.querySelector("input:checked[name='status']");
  addBookToLibrary(title, author, numberOfPages, isRead);
  displayBooks();
  newBookForm.reset();
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
