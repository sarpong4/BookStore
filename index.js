const express = require('express');
const app = express();
const port = 4000;

app.use(express.json())

// Setup mongoose
const mongoose = require('mongoose');
const connectionString = "mongodb://localhost:27017/bookapp";

mongoose.connect(connectionString, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Connection to database Successful...")
    }
});

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

// POST request /books to create a new book.
app.post('/books', (req, res) => {
    // retrieve new book details from request body
    Book.create({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        category: req.body.category,
        purchaseCount: req.body.purchaseCount,
        imageURL: req.body.imageURL,
        tags: req.body.tags
    }, (err, newBook) => {
        if (err) {
            return res.status(500).json({message: err})
        } else{
            return res.status(200).json({message: "New Book created."})
        }
    })
    // create and save new book into database
    // send a response to client
})

// GET request /books to fetch all books
app.get('/books', (req, res) => {
    // fetch all books
    Book.find({}, (err, books) => {
        if (err) {
            return res.status(500).json({message: err})
        } else {
            return res.status(200).json({message: books})
        }
    })
    // and send response to client
})
// GET request /books/id to fetch a single book
app.get("/books/:id", (req, res) => {
    Book.findOne({_id: req.params.id}, (err, book) => {
        if (err) {
            return res.status(500).json({message: err});
        } else if (!book) {
            return res.status(404).json({message: "Book not Found."})
        } else {
            return res.status(200).json({message: book})
        }
    })
})
// PUT  request /books/id to update a single book
app.put('/books/:id', (req, res) => {
    Book.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        author: req.body.author
    }, (err, book) => {
        if (err) {
            return res.status(200).json({message: err})
        }else if (!book) {
            return res.status(404).json({message: "Book not found."})
        }else {
            book.save((err, savedBook) => {
                if (err) {
                    return res.status(400).json({message: err})
                }else {
                    return res.status(200).json({message: "Book update successful!"})
                }
            });
        }
    })
})
// DELETE request /books/id to delete a single book
app.delete("/books/:id", (req, res) => {
    Book.findByIdAndDelete(req.params.id, (err, book) => {
        if (err) {
            return res.status(500).json({message: err});
        } else if (!book) {
            return res.status(404).json({message: "Book not found."})
        } else {
            return res.status(200).json({message: "Book deleted successfully!"})
        }
    })
})

app.listen(port, () => { console.log(`App is listening on port ${port}`)});