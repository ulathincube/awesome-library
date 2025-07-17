const table = document.querySelector('.books');
const tableBody = document.querySelector('.table-body');
const addBookForm = document.querySelector('.book-form');
const addBookButton = document.querySelector('.add-book');
const submitBookButton = document.querySelector('.submit');

const books = [];

function Book(author, title, pages, isRead, year) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.isRead = isRead;
  this.year = year;
}

function createBook(book) {
  const { author, title, pages, isRead, year } = book;
  const newBook = new Book(author, title, pages, isRead, year);
  const uuid = self.crypto.randomUUID();
  newBook.id = uuid;

  books.push(newBook);
}

createBook({
  author: 'Moore Stitch',
  title: 'The Good Son',
  year: 1996,
  pages: 316,
  isRead: false,
});

createBook({
  author: 'Claudetta Benzing',
  title: 'Fantastic Planet, The (Planète sauvage, La)',
  year: 1994,
  pages: 445,
  isRead: true,
});

createBook({
  author: 'Urbanus Kondrachenko',
  title: 'Manzanar Fishing Club, The',
  year: 1995,
  pages: 431,
  isRead: false,
});

function displayBooks(books) {
  // const isRead = document.createElement('td');

  for (const book of books) {
    const tableRow = document.createElement('tr');
    const authorCell = document.createElement('th');
    const titleCell = document.createElement('td');
    const pagesCell = document.createElement('td');
    const yearCell = document.createElement('td');

    const { author, title, pages, isRead, year } = book;
    authorCell.textContent = author;
    titleCell.textContent = title;
    yearCell.textContent = year;
    pagesCell.textContent = pages;

    tableRow.appendChild(authorCell);
    tableRow.appendChild(titleCell);
    tableRow.appendChild(pagesCell);
    tableRow.appendChild(yearCell);

    tableBody.appendChild(tableRow);
  }

  books.forEach(book => {});
}

displayBooks(books);

function handleAddButtonClick(event) {
  hideForm();
}

// Helper funcs

function hideForm() {
  addBookForm.classList.toggle('hidden');
  if (addBookForm.classList.contains('hidden')) {
    addBookButton.classList.remove('hidden');
  } else {
    addBookButton.classList.add('hidden');
  }
}

// helper funcs

function handleSubmitBook(event) {
  event.preventDefault();
  addBookButton.classList.remove('hidden');
  addBookForm.classList.toggle('hidden');
}

addBookButton.addEventListener('click', handleAddButtonClick);
submitBookButton.addEventListener('click', handleSubmitBook);
