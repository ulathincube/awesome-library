const table = document.querySelector('.books');
const tableBody = document.querySelector('.table-body');
const addBookForm = document.querySelector('.book-form');
const addBookButton = document.querySelector('.add-book');
const submitBookButton = document.querySelector('.submit');

const authorInput = addBookForm.querySelector('#author');
const titleInput = addBookForm.querySelector('#title');
const pagesInput = addBookForm.querySelector('#pages');
const yearInput = addBookForm.querySelector('#year');
const isReadInput = addBookForm.querySelector('#is-read');

let tableRows, deleteButtons;

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
    const editsCell = document.createElement('td');
    const button = document.createElement('button');

    button.classList.add('delete-button');
    button.textContent = 'Delete';
    editsCell.appendChild(button);

    const { author, title, pages, isRead, year, id } = book;
    authorCell.textContent = author;
    titleCell.textContent = title;
    yearCell.textContent = year;
    pagesCell.textContent = pages;

    tableRow.setAttribute('class', 'table-row');
    tableRow.setAttribute('data-id', id);

    tableRow.appendChild(authorCell);
    tableRow.appendChild(titleCell);
    tableRow.appendChild(pagesCell);
    tableRow.appendChild(yearCell);
    tableRow.appendChild(editsCell);

    tableBody.appendChild(tableRow);
  }

  tableRows = tableBody.querySelectorAll('.table-row');
  deleteButtons = tableBody.querySelectorAll('.delete-button');

  tableRows.forEach(tableRow => {
    tableRow.addEventListener('click', handleTableRowClick);
  });
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

function clearBooks() {
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.lastChild);
  }
}

function findAndDeleteBook(id) {
  const indexOfBook = books.findIndex(book => book.id === id);

  if (indexOfBook !== -1) {
    // const booksCopy = [...books];
    books.splice(indexOfBook, 1);
    console.log('Book deleted');
  } else {
    console.log('No book found!');
  }
}

// helper funcs

function getFormData() {
  const author = authorInput.value;
  const title = titleInput.value;
  const pages = pagesInput.value;
  const year = yearInput.value;
  const isRead = isReadInput.checked;

  console.log({ author, title, pages, year, isRead });

  createBook({ author, title, pages, year, isRead });
}

function handleSubmitBook(event) {
  event.preventDefault();
  addBookButton.classList.remove('hidden');
  addBookForm.classList.toggle('hidden');

  clearBooks();
  getFormData();
  displayBooks(books);

  console.log(tableRows);
}

function handleTableRowClick(event) {
  console.log('click');
  const clickedElement = event.target;
  const clickedElementParent = event.currentTarget;

  const deleteButtonsArr = Array.from(deleteButtons);

  if (!deleteButtonsArr.includes(clickedElement)) {
    return;
  }

  const id = clickedElementParent.dataset.id;

  console.dir(tableRows);

  findAndDeleteBook(id);
  clearBooks();
  displayBooks(books);

  console.dir(tableRows);
}

addBookButton.addEventListener('click', handleAddButtonClick);
submitBookButton.addEventListener('click', handleSubmitBook);
