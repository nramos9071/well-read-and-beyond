const { Schema } = require('mongoose');

// Define the movie schema
const Movie = new Schema({
  title: {
    type: String,   // Movie title
    required: true, // Title is required
    trim: true      // Remove extra spaces
  },
  genre: {
    type: String,   // Movie genre
    required: true, // Genre is needed
    trim: true      // Remove extra spaces
  }
});

// Create and export the Movie model
module.exports = Movie;
