let myLib = [];
let bookCount = 0;
let addBookBtn = document.querySelector('.addBookBtn');
let addBook = document.querySelector('.addBook');
let addBookForm = document.querySelector('.addBookForm');
let mainPage = document.querySelector('.main');
let titleInput = document.querySelector('#titleName');
let authorInput = document.querySelector('#authorname');
let pages = document.querySelector('#noOfPages');
let readCheckBox = document.querySelector('#readCheckBox');
let formSubmit = document.querySelector('button[type="submit"]');
let bookList = document.querySelector('.books');
let deleteBtns;

function book(index, author, bookName, noOfPages, read){
    this.index = index;
    this.bookName = bookName;
    this.author = author;
    this.noOfPages = noOfPages;
    this.read = read;
}

addBookBtn.addEventListener('click', ()=>{
    addBook.style.visibility = 'visible';
    addBook.style.opacity = 1;
    mainPage.style.filter = `brightness(0.5)`;
});

function removeForm(){
    addBook.style.opacity = 0;
    mainPage.style.filter = `brightness(1)`;
    setTimeout(()=>{
        addBook.style.visibility = `hidden`;
    },500)
}

mainPage.addEventListener('click', ()=>{
    if(addBook.style.visibility === 'visible'){
        removeForm();
    }
});

function addBookToLib(){
    myLib[bookCount] = new book(bookCount,titleInput.value, authorInput.value, pages.value, readCheckBox.checked);
}

formSubmit.addEventListener('click', (evt)=>{
    evt.preventDefault();
    addBookToLib();
    removeForm();
    if(myLib.length == 1){
        addBookBtn.style.top = '150px';
        bookList.style.visibility = 'visible';
        bookList.style.opacity = 1;
    }
    displayBooks();
    bookCount++;
});

function displayBooks(){
    let book = document.createElement('tr');
    book.setAttribute('index', `${bookCount}`);
    let Name = document.createElement('td');
    Name.innerHTML = myLib[bookCount].bookName;
    let Author = document.createElement('td');
    Author.innerHTML = myLib[bookCount].author;
    let Pages = document.createElement('td');
    Pages.innerHTML = myLib[bookCount].noOfPages;
    let Read = document.createElement('td');
    if(myLib[bookCount].read){
        Read.innerHTML = `Read`;
    }
    else{
        Read.innerHTML = `Unread`;
    }
    let btnTd = document.createElement('td');
    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = `Delete`;
    deleteBtn.setAttribute('index', `${bookCount}`);
    deleteBtn.setAttribute('onclick', 'deleteFunc(this)');
    let lineTr = document.createElement('tr');
    lineTr.style.height = `1px`;
    lineTr.setAttribute('index', `${bookCount}`);
    let lineTd = document.createElement('td');
    lineTd.setAttribute('colspan', '5');
    let line = document.createElement('div');
    line.classList.add('line');
    lineTd.appendChild(line);
    lineTr.appendChild(lineTd);
    btnTd.appendChild(deleteBtn);
    book.appendChild(Name);
    book.appendChild(Author);
    book.appendChild(Pages);
    book.appendChild(Read);
    book.appendChild(btnTd);
    document.querySelector('.books>tbody').appendChild(book);
    document.querySelector('.books>tbody').appendChild(lineTr);
    deleteBtns = document.querySelectorAll('.delete');
}

function deleteFunc(e){
    let indx = e.getAttribute('index');
    let book = document.querySelectorAll(`*[index='${indx}']`);
    book.forEach(foo=>{
        foo.remove();
    });
    myLib = myLib.filter(removeEntry);
    function removeEntry(value){
        return value.index != indx;
    }
    if(!myLib.length){
        bookList.style.visibility = 'hidden';
        bookList.style.opacity = 0;
        addBookBtn.style.top = '50%';
    }
}
