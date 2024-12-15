const mongoose = require('mongoose');

const QuizResultSchema = new mongoose.Schema({
  answers: [String],
  bookList: [String],
});

const UserResultSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  quizResults: [QuizResultSchema],
});

module.exports = mongoose.model('UserResult', UserResultSchema);
