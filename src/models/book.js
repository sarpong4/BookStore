const { ViewModuleSharp } = require('@material-ui/icons');
const mongoose = require('mongoose')

// CREATE SCHEMA
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    category: String,
    purchaseCount: Number,
    imageURL: String,
    tags: Array
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;