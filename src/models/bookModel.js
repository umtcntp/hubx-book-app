import mongoose from 'mongoose'; // Importing the mongoose library for MongoDB interaction

// Defining the schema for the Book model
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title of the book (required field)
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true }, // Reference to the Author model (required field)
    price: Number, // Price of the book (optional field)
    isbn: String, // ISBN of the book (optional field)
    language: String, // Language of the book (optional field)
    numberOfPages: Number, // Total number of pages in the book (optional field)
    publisher: String, // Publisher of the book (optional field)
});

// Creating the Book model from the schema
const Book = mongoose.model('Book', bookSchema);
export default Book; // Exporting the Book model for use in other files
