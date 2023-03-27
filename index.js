const form = document.querySelector('form')
const display = document.getElementById('display')

let myLibrary = [];

form.addEventListener('submit', addBookToLibrary)

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function displayBooks(){
  display.innerHTML = ``
  myLibrary.map(book => {
    let card = `<div class="card">
                    <h2>${book.title}</h2>
                    <p>${book.author}</p>
                    <p>Number of pages: ${book.pages}</p>
                    <p>Read status: ${book.read}</p>
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

  radioBtns.forEach(btn => {
    if(btn.checked){
      read = btn.value
    }
  })

  const book = new Book(title, author, pages, read)

  myLibrary.push(book)
  
  displayBooks()
}
