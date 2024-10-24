import mongoose from "mongoose"; // Importing the mongoose library for MongoDB interaction

// Defining the schema for the Author model
const authorSchem = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the author (required field)
    country: String, // Country of the author (optional field)
    birthdate: Date, // Birthdate of the author (optional field)
});

// Creating the Author model from the schema
const Author = mongoose.model("Author", authorSchem);
export default Author; // Exporting the Author model for use in other files
