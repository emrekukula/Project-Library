const getName = document.getElementById('name')

const getAuthor = document.getElementById('author');
const getPages = document.getElementById('pages');
const getRead = document.getElementById('read');
const table = document.getElementById('table');
const tbody = document.querySelector('tbody');
const subBtn = document.querySelector('.subBtn');


const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
}

function addBookToLibrary(name, author, pages, read) {
    const newBook = new Book(name, author, pages, read);
    myLibrary.push(newBook);
    let newBookIndex = myLibrary.indexOf(newBook);
    createRow(newBook.title, newBook.author, newBook.pages, newBook.read, newBookIndex);
    deleteFunc(newBookIndex);
    changeRead(read, newBookIndex) 
}

addBookToLibrary('World of Warcraft', 'Walt Simonson', '999', 'Not Read');
addBookToLibrary('Game of Thrones', 'George R. R. Martin', '999', 'Read');


function createRow(name, author, pages, read, newBookIndex) {
    const lowerRead = read.replace(' ', "").toLowerCase();

        const newRow = `
        <tr class='${newBookIndex}'>
        <td>${name}</td>
        <td>${author}</td>
        <td>${pages}</td>
        <td><button class="change ${lowerRead}" id="${newBookIndex}">${read}</button></td>
        <td><button class="delete" id="${name}">delete</button></td>
        </tr>`;
        tbody.insertAdjacentHTML("afterbegin", newRow);
        
}

function deleteFunc(newBookIndex) {
    const button = document.querySelector('.delete');
    button.addEventListener('click', e => {
        e.preventDefault();
        deleteBook(newBookIndex);
    })
}

function deleteBook(newBookIndex) {
    const selectorNum = newBookIndex
    const selectedTr = document.getElementsByClassName(newBookIndex);

    if(newBookIndex ===  selectorNum) {
        selectedTr[0].remove();
        myLibrary.splice(newBookIndex, newBookIndex + 1);
    }
}

const arrayName = [...getName.attributes]
const requiredElement = arrayName[arrayName.length - 1]


subBtn.addEventListener('click', (e, a, b) => {
    e.preventDefault();

    if ( getRead.checked === true) {
        addBookToLibrary(getName.value, getAuthor.value, 
            getPages.value, 'Read' );
        } else {
            addBookToLibrary(getName.value, getAuthor.value, 
                getPages.value, 'Not Read' );  
            }

});
            
function changeRead(read, newBookIndex) {
    const button = document.querySelector('.change');
    const selectButton = document.getElementById(newBookIndex);

    button.addEventListener('click', () => {
        if (read === 'Not Read') {
            selectButton.textContent = 'Read';
            selectButton.classList.add('read');
            selectButton.classList.remove('notread');
            read = 'Read';
        } else if ( read === 'Read') {
            selectButton.textContent = 'Not Read';
            selectButton.classList.add('notread');
            selectButton.classList.remove('read');
            read = 'Not Read';
        }
    });
} 
