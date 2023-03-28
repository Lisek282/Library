const form = document.querySelector('form')
const formDiv = document.getElementById('form_div')
const display = document.getElementById('display')
const newBookBtn = document.getElementById('new_book')
const turnOffBtn = document.getElementById('turnOffBtn')
const removeBookBtn = document.querySelectorAll('.removeBookBtn')

let myLibrary = [];

form.addEventListener('submit', addBookToLibrary)

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

Book.prototype.changeReadStatus = function() {
  this.read = this.read == 'yes' ? 'no' : 'yes'
}

function displayBooks() {
  display.innerHTML = ``
  
  myLibrary.map((book, index) => {
    const card = `<div class="card" >
    <button class="removeBookBtn" data-id="${index}" type="button">x</button>
    <h2>${book.title}</h2>
    <p>${book.author}</p>
    <p>Number of pages: ${book.pages}</p>
    <button data-readid="${index}" class="${book.read}">${book.read.toUpperCase()}</button>
    </div>`
    display.innerHTML += card
  })
}

function addBookToLibrary(e) {
  e.preventDefault()
  
  let title = document.getElementById('title').value
  let author = document.getElementById('author').value
  let pages = document.getElementById('pages').value
  let read = ''
  let radioBtns = document.getElementsByName('read')

  radioBtns.forEach((btn) => {
    if (btn.checked) {
      read = btn.value
    }
  })

  const book = new Book(title, author, pages, read)
  myLibrary.push(book)

  displayBooks()
}

function removeBook(cardId){
  myLibrary = myLibrary.filter((book, index) => index !== +cardId)
  displayBooks()
}


newBookBtn.addEventListener('click', () => {
  formDiv.classList.add('visibility')
  newBookBtn.classList.add('notVisible')
})

turnOffBtn.addEventListener('click', () => {
  formDiv.classList.remove('visibility')
  newBookBtn.classList.remove('notVisible')
})

document.addEventListener('click', (e) => {
  if(e.target.dataset.id){
    removeBook(e.target.dataset.id)
  }
  if(e.target.dataset.readid){
    myLibrary[+e.target.dataset.readid].changeReadStatus()
    displayBooks()
  }
})