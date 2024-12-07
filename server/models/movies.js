const mongoose = require('mongoose');

// Define the movie schema
const movieSchema = new mongoose.Schema({
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
const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
