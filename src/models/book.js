const { ViewModuleSharp } = require('@material-ui/icons');
const mongoose = require('mongoose')

// CREATE SCHEMA
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 5
    },
    author: String,
    description: String,
    category: {
        type: String, 
        enum: ["Fiction", "Non-fiction", "Adventure", "Fantasy", "Action", "Comics", "Horror"],
        default: "Fiction"
    },
    purchaseCount: Number,
    imageURL: String,
    tags: Array
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;