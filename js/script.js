const statusDiv = document.querySelector(".status");
const addBookButton = document.querySelector(".add-button");
const submitBookButton = document.querySelector(".submit-book");
const newBookModal = document.querySelector(".new-book-modal");
const bookshelves = document.querySelector(".bookshelves");
const newBookForm = newBookModal.querySelector("form");

const myLibrary = [];
let chosenBook;

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
  bookDiv.tabIndex = 0;
  bookDiv.append(bookmarkShadow, bookmark, gradientShadow, spineText);
  bookDiv.addEventListener("click", () => {
    chosenBook = this;
    document.querySelector("span.number-of-pages").textContent =
      this.numberOfPages;
    if (this.isRead) statusDiv.classList.add("read");
    else statusDiv.classList.remove("read");
    document.querySelector(".book-name").textContent = this.title;
    document.querySelector(". author").textContent = this.author;
  });
  bookshelves.insertBefore(bookDiv, addBookButton);
};

Book.prototype.toggleStatus = function () {
  this.isRead = !this.isRead;
  if (chosenBook === this) {
    if (this.isRead) statusDiv.classList.add("read");
    else statusDiv.classList.remove("read");
  }
};

function addBookToLibrary(title, author, numberOfPages, isRead) {
  myLibrary.push(new Book(title, author, numberOfPages, isRead));
}

function displayBooks() {
  bookshelves.querySelectorAll(".book").forEach((book) => book.remove());
  myLibrary.forEach((book) => book.placeOnShelf());
}

displayBooks();

statusDiv.addEventListener("click", () => {
  if (!chosenBook) {
    // I'm leaving an example of an opened book for now
    statusDiv.classList.toggle("read");
    return;
  }
  chosenBook.toggleStatus();
});
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
    case " ":
      document.activeElement.click();
  }
});
