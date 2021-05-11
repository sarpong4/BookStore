const Book = require("../models/book");

exports.createNewBook = (req, res) => {
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
}

exports.fetchBooks = (req, res) => {
    // fetch all books
    Book.find({}, (err, books) => {
        if (err) {
            return res.status(500).json({message: err})
        } else {
            return res.status(200).json({message: books})
        }
    })
}

exports.fetchSingleBook =  (req, res) => {
    Book.findOne({_id: req.params.id}, (err, book) => {
        if (err) {
            return res.status(500).json({message: err});
        } else if (!book) {
            return res.status(404).json({message: "Book not Found."})
        } else {
            return res.status(200).json({message: book})
        }
    })
}

exports.updateSingleBook = (req, res) => {
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
}

exports.deleteSingleBook = (req, res) => {
    Book.findByIdAndDelete(req.params.id, (err, book) => {
        if (err) {
            return res.status(500).json({message: err});
        } else if (!book) {
            return res.status(404).json({message: "Book not found."})
        } else {
            return res.status(200).json({message: "Book deleted successfully!"})
        }
    })
}