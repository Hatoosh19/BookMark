var nameBookInput = document.getElementById("bookName");
var siteNameInput = document.getElementById("siteName");
var button = document.querySelector('.submit');
var layer = document.querySelector('.layer');
var xmark = document.querySelector('header button');
var bookList = [];

// Load book list from localStorage if available
if (localStorage.getItem('bookList') !== null) {
    bookList = JSON.parse(localStorage.getItem('bookList'));
    displayDate();
}

// Function to add a new book
function addBook() {
    // Validate both inputs
    const bookNameValid = validateBookName();
    const siteNameValid = validateSiteName();

    if (!bookNameValid || !siteNameValid) {
        // Show the layer if either input is invalid
        layer.classList.replace("d-none", "d-flex");
    } else {
        // Create the book object and add to the bookList
        var book = {
            name: nameBookInput.value,
            site: "https://" + siteNameInput.value // Ensure "https://" is added
        };

        // Clear the form after adding the book
        clearForm();

        // Add the book to the list and save it to localStorage
        bookList.push(book);
        localStorage.setItem("bookList", JSON.stringify(bookList));

        // Display the last added book
        displayLastIndex();
    }
}

// Function to clear the form inputs
function clearForm() {
    nameBookInput.value = null;
    siteNameInput.value = null;
}

// Function to display the last added book
function displayLastIndex() {
    var container = `<tr>
        <td class="text-uppercase">${bookList.length}</td>
        <td class="text-uppercase">${bookList[bookList.length - 1].name}</td>
        <td>
            <a href="${bookList[bookList.length - 1].site}" target="_blank">
                <button class="btn btn-success px-4 py-2">Visit</button>
            </a>
        </td>
        <td><button onclick="deleteBook(${bookList.length - 1})" class="btn btn-danger px-4 py-2">Delete</button></td>
    </tr>`;

    document.getElementById("tableContent").innerHTML += container;
}

// Function to display all books
function displayDate() {
    var container = '';
    for (var i = 0; i < bookList.length; i++) {
        container += `<tr>
            <td class="text-uppercase">${i + 1}</td>
            <td class="text-uppercase">${bookList[i].name}</td>
            <td><a href="${bookList[i].site}" target="_blank"><button class="btn btn-success px-4 py-2">Visit</button></a></td>
            <td><button onclick="deleteBook(${i})" class="btn btn-danger px-4 py-2">Delete</button></td>
        </tr>`;
    }
    document.getElementById("tableContent").innerHTML = container;
}

// Function to delete a book
function deleteBook(index) {
    bookList.splice(index, 1); // Remove the book from the list
    localStorage.setItem("bookList", JSON.stringify(bookList)); // Save to localStorage
    displayDate(); // Re-render the book list
}

// Function to validate the book name
function validateBookName() {
    var regex = /^[^\s!@#$%^&*()+=\[\]{};':"\\|,.<>/?~`-].{2,}$/;
    if (regex.test(nameBookInput.value)) {
        nameBookInput.classList.add("is-valid");
        nameBookInput.classList.remove("is-invalid");
        return true;
    } else {
        nameBookInput.classList.add("is-invalid");
        nameBookInput.classList.remove("is-valid");
        return false;
    }
}

// Function to validate the site URL (without https:// part)
function validateSiteName() {
    var regex = /^(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(siteNameInput.value)) {
        siteNameInput.classList.add("is-valid");
        siteNameInput.classList.remove("is-invalid");
        return true;
    } else {
        siteNameInput.classList.add("is-invalid");
        siteNameInput.classList.remove("is-valid");
        return false;
    }
}

// Event listener for book name input
nameBookInput.addEventListener('keyup', function () {
    validateBookName();
});

// Event listener for site name input
siteNameInput.addEventListener('keyup', function () {
    validateSiteName();
});

// Event listener for the submit button
button.addEventListener('click', function () {
    addBook();
});

// Event listener for the close button (layer)
xmark.addEventListener('click', function () {
    layer.classList.replace("d-flex", "d-none");
});
