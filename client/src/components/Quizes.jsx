import React, { useState } from 'react';
import { quizBooksResults } from '../utils/API';
import { useHandleSavedButton } from '../utils/handleSavedButton';
import Auth from '../utils/auth'; // Import Auth for authentication check

const Quizes = ({ selectedQuiz }) => {
  const [answers, setAnswers] = useState([]);
  const [quizHistory, setQuizHistory] = useState([]);
  const [data, setData] = useState([]);
  const handleSavedButton = useHandleSavedButton();


  // Define questions for each quiz
  const questions = [
    { id: 1, question: 'What kind of stories do you enjoy?', options: ['Adventure', 'Mystery', 'Romance'] },
    { id: 2, question: 'What settings do you prefer?', options: ['Fantasy worlds', 'Outer space', 'Urban'] },
    { id: 3, question: 'What kind of characters do you like?', options: ['Superheroes', 'Detectives', 'Everyday people'] },
    { id: 4, question: 'What kind of endings do you prefer?', options: ['Happy', 'Sad', 'Surprising'] },
  ];

  const questions2 = [ // Mood quiz
    { id: 1, question: 'How are you feeling today?', options: ['Happy', 'Sad', 'Anxious', 'Bored', 'Energetic'] },
    { id: 2, question: 'What kind of stories do you enjoy?', options: ['Adventure', 'Mystery', 'Romance', 'Horror'] },
    { id: 3, question: 'Do you prefer', options: ['Fiction', 'Nonfiction'] },
    { id: 4, question: 'What kind of endings do you prefer?', options: ['Happy', 'Sad', 'Surprising'] },
  ];

  const questions3 = [ // Horror quiz
    { id: 1, question: 'What kind of horror do you like?', options: ['Gore', 'Psychological', 'Supernatural', 'Thriller'] },
    { id: 2, question: 'What kind of setting do you prefer?', options: ['Haunted House', 'Small Town', 'Isolated Location', 'Urban'] },
    { id: 3, question: 'What kind of characters do you like?', options: ['Everyday People', 'Detectives', 'Monsters', 'Survivors'] },
    { id: 4, question: 'What kind of endings do you prefer?', options: ['Happy', 'Sad', 'Surprising'] },
  ];

  const handleAnswerChange = (questionId, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionId - 1] = answer;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    const response = await quizBooksResults(answers);
    const books = response.data.items;
    console.log(books);
    setQuizHistory([...quizHistory, answers]);
    setData(books);
  };

  // Render questions based on selectedQuiz
  let quizQuestions;
  if (selectedQuiz === 1) {
    quizQuestions = questions;
  } else if (selectedQuiz === 2) {
    quizQuestions = questions2;
  } else if (selectedQuiz === 3) {
    quizQuestions = questions3;
  }

  return (
    <div className="quizBox flex items-center justify-center min-h-screen bg-base-200">
      <div className="w-full h-full max-w-5xl border border-gray-300 shadow-lg bg-white p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          {selectedQuiz === 1 && "What's your next book"}
          {selectedQuiz === 2 && "Tell us your mood!"}
          {selectedQuiz === 3 && "What's your next horror book"}
        </h2>
        {quizQuestions?.map((q) => (
          <div key={q.id} className="mb-8">
            <h3 className="text-xl font-semibold mb-2">QUESTION {q.id}</h3>
            <p className="text-lg mb-4">{q.question}</p>
            <div className="space-y-2">
              {q.options.map((option) => (
                <label key={option} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={option}
                    onChange={() => handleAnswerChange(q.id, option)}
                    className="radio radio-primary"
                  />
                  <span className="text-lg">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className="card-actions justify-center mt-8">
          <button onClick={handleSubmit} className="btn btn-primary btn-wide text-lg">
            Submit Quiz
          </button>
        </div>
      </div>
      <div className="card-grid" id="BookCard">
        {data.map((book) => (
          <div className="card-item w-full max-w-md" key={book.id || book.volumeInfo.title}>
            <figure className="flex-shrink-0 mr-4">
              <img
                className="w-40 h-auto object-cover"
                src={book.volumeInfo.imageLinks?.thumbnail}
                alt={book.volumeInfo.title} />
            </figure>
            {/* <h2 className="card-title text-xl font-semibold" id="bookTitle">{book.volumeInfo.title}</h2> */}

            <div className="card-body flex flex-col justify-between w-2/3">
              <h2 className="card-title text-xl font-semibold">{book.volumeInfo.title}</h2>
              <p className="text-sm">{book.searchInfo?.textSnippet || 'No description available.'}</p>
              <div className="card-actions justify-center w-full mt-4">
                {/*if user is logged in, display save button*/}
                <button
                  className="btn btn-primary w-full max-w-xs"
                  id={book.id}
                  onClick={Auth?.loggedIn ? () => handleSavedButton(book) : null}
                >
                  {Auth?.loggedIn ? 'Save to Bookshelf' : 'Log in to save book'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default Quizes;
