import request from 'supertest'; // Importing supertest for HTTP assertions
import { expect } from 'chai'; // Importing Chai's expect for assertions
import app from '../../index.js'; // Importing the Express app
import mongoose from 'mongoose'; // Importing mongoose for MongoDB interactions
import Author from '../../src/models/authorModel.js'; // Importing the Author model
import Book from '../../src/models/bookModel.js'; // Importing the Book model

describe('Books API', () => {
    
    // Before all tests, connect to the MongoDB test database
    before(async function() {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
        }
    });
    
    // After all tests, disconnect from the database
    after(async function() {
        await mongoose.disconnect();
    });

    // Before each test, clear the Author and Book collections
    beforeEach(async () => {
        await Author.deleteMany({});
        await Book.deleteMany({});
    });

    // Test for the POST /books endpoint
    describe('POST /books', () => {
        it('should create a new book', async () => {
            const authorData = { name: 'John Doe' }; // Author data for the test
            const bookData = {
                title: 'Test Book', // Book details
                author: authorData,
                price: 9.99,
                isbn: '1234567890',
                language: 'English',
                numberOfPages: 100,
                publisher: 'Test Publisher',
            };

            // Sending a POST request to create a new book
            const res = await request(app).post('/api/books').send(bookData);
            expect(res.status).to.equal(201); // Expecting a 201 status code
            expect(res.body).to.include({ title: 'Test Book', price: 9.99 }); // Checking response body
            expect(res.body).to.have.property('author'); // Checking if author property exists
        });
    });

    // Test for the GET /books endpoint
    describe('GET /books', () => {
        it('should get all books', async () => {
            // Creating and saving an author
            const author = new Author({ name: 'Jane Doe' });
            await author.save();

            // Creating and saving a book
            const book = new Book({
                title: 'Sample Book',
                author: author._id,
                price: 19.99,
                isbn: '0987654321',
                language: 'English',
                numberOfPages: 200,
                publisher: 'Sample Publisher',
            });
            await book.save();

            // Sending a GET request to fetch all books
            const res = await request(app).get('/api/books');
            expect(res.status).to.equal(200); // Expecting a 200 status code
            expect(res.body).to.be.an('array'); // Checking if response body is an array
            expect(res.body[0]).to.have.property('author', 'Jane Doe'); // Checking author name
        });
    });

    // Test for the PUT /books/:id endpoint
    describe('PUT /books/:id', () => {
        it('should update a book', async () => {
            // Creating and saving an author
            const author = new Author({ name: 'Alice' });
            await author.save();

            // Creating and saving a book
            const book = new Book({
                title: 'Old Book Title',
                author: author._id,
                price: 15.00,
                isbn: '123456789',
                language: 'English',
                numberOfPages: 150,
                publisher: 'Old Publisher',
            });
            await book.save();

            // Sending a PUT request to update the book
            const res = await request(app)
                .put(`/api/books/${book._id}`)
                .send({ title: 'Updated Book Title', price: 20.00 });

            expect(res.status).to.equal(200); // Expecting a 200 status code
            expect(res.body).to.include({ title: 'Updated Book Title', price: 20.00 }); // Checking updated details
        });

        it('should return 404 for a non-existent book', async () => {
            // Sending a PUT request to an invalid book ID
            const res = await request(app).put('/books/invalidId').send({ title: 'Some Title' });
            expect(res.status).to.equal(404); // Expecting a 404 status code
            expect(res.body).to.have.property('message', 'Book not found'); // Checking error message
        });
    });

    // Test for the DELETE /books/:id endpoint
    describe('DELETE /books/:id', () => {
        it('should delete a book', async () => {
            // Creating and saving an author
            const author = new Author({ name: 'Bob' });
            await author.save();

            // Creating and saving a book
            const book = new Book({
                title: 'Book to Delete',
                author: author._id,
                price: 10.00,
                isbn: '1122334455',
                language: 'English',
                numberOfPages: 300,
                publisher: 'Publisher',
            });
            await book.save();

            // Sending a DELETE request to delete the book
            const res = await request(app).delete(`/api/books/${book._id}`);
            expect(res.status).to.equal(200); // Expecting a 200 status code
            expect(res.body).to.have.property('message', 'Book deleted successfully'); // Checking success message
        });

        it('should return 404 for a non-existent book', async () => {
            // Sending a DELETE request to an invalid book ID
            const res = await request(app).delete('/books/invalidId');
            expect(res.status).to.equal(404); // Expecting a 404 status code
            expect(res.body).to.have.property('message', 'Book not found'); // Checking error message
        });
    });
});
