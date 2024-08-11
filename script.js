const books = [
    { title: "The Great Gatsby", category: "Fiction", borrowed: "2024-08-01" },
    { title: "A Brief History of Time", category: "Science", borrowed: "2024-08-02" },
    { title: "The Art of War", category: "History", borrowed: "2024-08-03" },
    { title: "To Kill a Mockingbird", category: "Fiction", borrowed: "" },
    { title: "Sapiens", category: "History", borrowed: "2024-08-05" },
    { title: "Introduction to Algorithms", category: "Engineering", borrowed: "2024-08-08" },
    { title: "Fundamentals of Management", category: "Management", borrowed: "" },
    { title: "The Lean Startup", category: "Business", borrowed: "2024-08-07" },
    { title: "Art and Visual Perception", category: "Arts", borrowed: "" },
    { title: "Human Anatomy", category: "Medical", borrowed: "" },
    { title: "Digital Signal Processing", category: "Engineering", borrowed: "" },
    { title: "Principles of Marketing", category: "Management", borrowed: "" },
    { title: "The History of Art", category: "Arts", borrowed: "2024-08-04" },
    { title: "Gray's Anatomy", category: "Medical", borrowed: "2024-08-09" }
];

const categories = [...new Set(books.map(book => book.category))];
const categoryList = document.getElementById('categoryList');
const bookList = document.getElementById('bookList');
const borrowingHistoryList = document.getElementById('borrowingHistoryList');
const searchInput = document.getElementById('searchInput');

// Initialize the app
function init() {
    displayCategories();
    displayBooks();
    displayBorrowingHistory();

    searchInput.addEventListener('input', searchBooks);
}

// Display categories
function displayCategories() {
    categories.forEach(category => {
        const li = document.createElement('li');
        li.textContent = category;
        li.setAttribute('data-category', category);
        li.addEventListener('click', filterByCategory);
        categoryList.appendChild(li);
    });
}

// Display books
function displayBooks(category = 'all', searchQuery = '') {
    bookList.innerHTML = '';

    const filteredBooks = books.filter(book => {
        const matchesCategory = category === 'all' || book.category === category;
        const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    filteredBooks.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        bookDiv.textContent = `${book.title} (${book.category})`;
        bookList.appendChild(bookDiv);
    });
}

// Display borrowing history
function displayBorrowingHistory() {
    borrowingHistoryList.innerHTML = '';
    
    const borrowedBooks = books.filter(book => book.borrowed !== '');
    
    borrowedBooks.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} - Borrowed on ${book.borrowed}`;
        borrowingHistoryList.appendChild(li);
    });
}

// Filter books by category
function filterByCategory(e) {
    const category = e.target.getAttribute('data-category');
    document.querySelectorAll('#categoryList li').forEach(li => li.classList.remove('active'));
    e.target.classList.add('active');
    displayBooks(category, searchInput.value);
}

// Search books
function searchBooks(e) {
    const searchQuery = e.target.value;
    const activeCategory = document.querySelector('#categoryList li.active');
    const category = activeCategory ? activeCategory.getAttribute('data-category') : 'all';
    displayBooks(category, searchQuery);
}

// Initial call to setup the app
init();
