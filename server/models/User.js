const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bookSchema = require('./Books');

// This sets up what a User, Pass looks like in the database
const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: false, 
    unique: true, 
    trim: true 
  }, // Username is needed and must be unique
  password: { 
    type: String, 
    required: true, 
    minlength: 8 }, // Password must be at least 8 characters
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
  }, 
  bio: {
    type: String,
    trim: true,// Email is needed and must be unique
  savedBooks: [bookSchema], // Books are stored as an array
  }

});

// Automatically hashes the password before saving to keep it secure
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Skip if the password hasn't changed
  this.password = await bcrypt.hash(this.password, 10); // Hash the password
  next();
});

// Checks if the given password matches the saved (hashed) one
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password); // Returns true or false
}

const User = mongoose.model('User', userSchema);

module.exports = User;