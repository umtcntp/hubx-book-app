import express from 'express'; // Importing the express library for creating the server
import Book from '../models/bookModel.js'; // Importing the Book model
import Author from '../models/authorModel.js'; // Importing the Author model
const router = express.Router(); // Creating a new router instance

// Route to create a new book
router.post('/books', async (req, res) => {
    const { title, author, price, isbn, language, numberOfPages, publisher } = req.body; // Destructuring request body
    try {
        // Check if the author already exists
        let authorDoc = await Author.findOne({ name: author.name });

        if (!authorDoc) {
            // If not found, create a new author document
            authorDoc = new Author(author);
            console.log("authorDoc" + authorDoc);
            await authorDoc.save(); // Save the new author to the database
        }

        // Creating a new book document
        const book = new Book({
            title,
            author: authorDoc._id, // Using the author's ObjectId
            price,
            isbn,
            language,
            numberOfPages,
            publisher
        });

        await book.save(); // Save the book to the database
        res.status(201).send(book); // Respond with the created book
    } catch (error) {
        res.status(400).send(error); // Respond with error if something goes wrong
    }
});

// Route to retrieve all books
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find(); // Fetching all books

        // Mapping over books to include author's name
        const bookWithAuthorName = await Promise.all(
            books.map(async (book) => {
                const author = await Author.findOne({ _id: book.author }); // Finding the author by ObjectId
                return {
                    ...book.toObject(), // Converting book document to a plain object
                    author: author ? author.name : null // Adding author name or null if not found
                };
            })
        );

        res.send(bookWithAuthorName); // Respond with the list of books with author names
    } catch (error) {
        res.status(500).send(error); // Respond with error if something goes wrong
    }
});

// Route to update an existing book by ID
router.put('/books/:id', async (req, res) => {
    const { id } = req.params; // Extracting book ID from parameters
    const { title, author, price, isbn, language, numberOfPages, publisher } = req.body; // Destructuring request body

    try {
        // Updating the book document by ID
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { title, author, price, isbn, language, numberOfPages, publisher },
            { new: true } // Return the updated document
        );

        if (!updatedBook) {
            return res.status(404).send({ message: 'Book not found' }); // Respond if book is not found
        }

        res.send(updatedBook); // Respond with the updated book
    } catch (error) {
        res.status(400).send(error); // Respond with error if something goes wrong
    }
});

// Route to delete a book by ID
router.delete('/books/:id', async (req, res) => {
    const { id } = req.params; // Extracting book ID from parameters

    try {
        const deletedBook = await Book.findByIdAndDelete(id); // Deleting the book by ID

        if (!deletedBook) {
            return res.status(404).send({ message: 'Book not found' }); // Respond if book is not found
        }

        res.send({ message: 'Book deleted successfully', deletedBook }); // Respond with success message and deleted book
    } catch (error) {
        res.status(500).send(error); // Respond with error if something goes wrong
    }
});

export default router; // Exporting the router for use in other files
