import express from 'express'; // Import the Express framework for building web applications
import mongoose from 'mongoose'; // Import Mongoose for MongoDB object modeling
import bookRoutes from './src/routes/bookRoutes.js'; // Import the book routes (ensure the .js extension is included)
import config from "./config.js"; // Import configuration settings from the config module

const app = express(); // Create an Express application instance

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount the book routes under the /api path
app.use('/api', bookRoutes);

// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
        await mongoose.connect(config.db, {}); // Connect to the MongoDB database
        console.log('Connected to MongoDB...'); // Log success message
    } catch (err) {
        console.error('Could not connect to MongoDB...', err); // Log error message if the connection fails
    }
};

connectDB(); // Call the function to connect to the database

// Root route to respond with a welcome message
app.get('/', (req, res) => {
    res.send('Welcome Book API!'); // Send a welcome message to the client
});

// Error-handling middleware to handle any errors that occur in the application
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the stack trace of the error
    res.status(500).send('Something went wrong!'); // Send a 500 error response to the client
});

// Start the Express application and listen on port 3000
app.listen(3000, () => {
    console.log(config.app_name + " started on Port 3000"); // Log a message indicating the application has started
});

export default app; // Export the app instance for use in other modules
