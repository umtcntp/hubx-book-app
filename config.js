import dotenv from 'dotenv'; // Import the dotenv library to manage environment variables
import mongoose from 'mongoose'; // Import mongoose for MongoDB object modeling (not used directly here)

dotenv.config(); // Load environment variables from the .env file into process.env

// Configuration object to hold application settings
const config = { 
    app_name: process.env['APP_NAME'], // Get the application name from the environment variable
    port: process.env['PORT'] ?? 3000, // Set the port from the environment variable, defaulting to 3000 if not provided
    db: process.env['DB_URI'] ?? 'mongodb://localhost:27017/test', // Set the database URI from the environment variable, defaulting to a local MongoDB URI
};

export default config; // Export the configuration object for use in other modules
