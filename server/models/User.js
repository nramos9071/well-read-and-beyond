const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bookSchema = require('./Books'); // Import the book schema
const movieSchema = require('./movies'); // Import the movie schema

// Define the User schema (structure of the user data)
const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true,  // Username is required
    unique: true, 
    trim: true // Remove extra spaces
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 8 // Password must be at least 8 characters
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid e-mail address'] // Email format validation
  },
  bio: {
    type: String,
    trim: true  // Remove extra spaces
  },
  savedBooks: [bookSchema], // Store books the user saved
  savedMovies: [movieSchema] // Store movies the user saved
});

// Hash password before saving to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Skip if password is not changed
  this.password = await bcrypt.hash(this.password, 10); // Hash the password
  next(); // Continue saving the user
});

// Check if entered password matches the hashed one
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password); // Compare passwords
};

// Create the User model and export it
const User = mongoose.model('User', userSchema);

module.exports = User;
