const statusDiv = document.querySelector(".status");
const addBookButton = document.querySelector(".add-button");
const submitBookButton = document.querySelector(".submit-book");
const newBookModal = document.querySelector(".new-book-modal");
const bookshelves = document.querySelector(".bookshelves");
const newBookForm = newBookModal.querySelector("form");
const removeBookButton = document.querySelector(".remove-button");
const leftPage = document.querySelector(".left-page");
const rightPage = document.querySelector(".right-page");
const editBookButton = document.querySelector(".edit-button");
const errorMessageDiv = document.querySelector(".error-message");

const myLibrary = [];
let chosenBook;
let isBeingEdited = false;

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

Book.prototype.open = function () {
  chosenBook = this;
  document.querySelector("span.number-of-pages").textContent =
    this.numberOfPages;
  if (this.isRead) statusDiv.classList.add("read");
  else statusDiv.classList.remove("read");
  document.querySelector(".book-name").textContent = this.title;
  document.querySelector(".author").textContent = this.author;
  leftPage.classList.remove("not-displayed");
  rightPage.classList.remove("not-displayed");
  document.activeElement.blur();
};

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
  bookDiv.id = `book${this.id}`;
  bookDiv.title = this.title;
  bookDiv.tabIndex = 0;
  bookDiv.append(bookmarkShadow, bookmark, gradientShadow, spineText);
  bookDiv.addEventListener("click", () => this.open());
  bookshelves.insertBefore(bookDiv, addBookButton);
};

Book.prototype.toggleStatus = function () {
  this.isRead = !this.isRead;
  if (chosenBook === this) {
    if (this.isRead) statusDiv.classList.add("read");
    else statusDiv.classList.remove("read");
  }
};

// I want to make the paramethers named using destructuring
Book.prototype.edit = function ({ title, author, numberOfPages, isRead }) {
  this.title = title ?? this.title;
  this.author = author ?? this.author;
  this.numberOfPages = numberOfPages ?? this.numberOfPages;
  this.isRead = isRead ?? this.isRead;
  this.open();
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
  const checkedStatusInput = document.querySelector("input:checked[name='status']");
  if (!checkedStatusInput) {
    errorMessageDiv.textContent = "You forgot to tell me whether you have read this book!";
    return;
  }
  const isRead = !!document.querySelector("input:checked[name='status']").value;
  if (isBeingEdited) {
    chosenBook.edit({ title, author, numberOfPages, isRead });
    isBeingEdited = false;
  } else {
    addBookToLibrary(title, author, numberOfPages, isRead);
  }
  displayBooks();
  newBookForm.reset();
  errorMessageDiv.textContent = "";
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

removeBookButton.addEventListener("click", () => {
  document.querySelector(`#book${chosenBook.id}`).remove();
  myLibrary.splice(myLibrary.indexOf(chosenBook), 1);
  chosenBook = null;
  leftPage.classList.add("not-displayed");
  rightPage.classList.add("not-displayed");
});

editBookButton.addEventListener("click", () => {
  isBeingEdited = true;
  toggleNewBookModalDisplay();
  document.querySelector("#book-title-input").value = chosenBook.title;
  document.querySelector("#book-author-input").value = chosenBook.author;
  document.querySelector("#pages-number-input").value = chosenBook.numberOfPages;
  document.querySelector(`input[name='status'][value="${chosenBook.isRead ? 1 : ""}"]`).checked = true;
});
