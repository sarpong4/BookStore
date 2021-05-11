const { Book } = require('@material-ui/icons');
const express = require('express');
const router = express.Router();
const  BookCtrl = require('../controllers/bookControllers')

// POST request /books to create a new book.
router.post('/books', BookCtrl.createNewBook)

// GET request /books to fetch all books
router.get('/books', BookCtrl.fetchBooks)
// GET request /books/id to fetch a single book
router.get("/books/:id", BookCtrl.fetchSingleBook)
// PUT  request /books/id to update a single book
router.put('/books/:id', BookCtrl.updateSingleBook)
// DELETE request /books/id to delete a single book
router.delete("/books/:id", BookCtrl.deleteSingleBook)

module.exports = router;