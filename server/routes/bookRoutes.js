const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); // Import the Book model

// REST endpoint to save a book
router.post('/books', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Error saving book' });
  }
});

// REST endpoint for deleting a book
router.delete('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting book' });
  }
});

module.exports = router;