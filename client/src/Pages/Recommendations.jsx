import React, { useState } from 'react';
import Quizes from '../components/Quizes'; // Import your Quizes component

const Recommendations = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false); // State to toggle quiz visibility
  const [selectedQuiz, setSelectedQuiz] = useState(null); // State to track selected quiz

  const cards = [
    {
      title: "What's your style?",
      description: "Tell us what books you like for recommendations?",
      image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      quizId: 1, // quizId for each card
    },
    {
      title: "What's your mood?",
      description: "Tell us your mood for recommendations?",
      image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      quizId: 2, 
    },
    {
      title: "What's your horror style?",
      description: "Tell us what horror you like for recommendations?",
      image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      quizId: 3, 
    }
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const handleStartQuiz = (quizId) => {
    setSelectedQuiz(quizId); // Set the selected quiz based on the card clicked by id
    setShowQuiz(true); // Show the quiz when the button is clicked
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-2xl font-bold mb-4">
        Not sure what book you should read next? Answer some questions and we’ll give you a book recommendation!
      </h1>
      <h2 className="text-xl mb-6">Click on the quiz to get started!</h2>

      {/* Carousel Container */}
      <div className="relative w-80vw overflow-hidden">
        {/* Cards */}
        <div className="flex flex-nowrap transition-transform duration-500 ease-in-out">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`w-full flex-shrink-0 ${index === currentIndex ? "block" : "hidden"}`}
            >
              <div className="card card-compact bg-base-100 shadow-xl">
                <figure>
                  <img src={card.image} alt="Quiz" className="w-full h-auto" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{card.title}</h2>
                  <p>{card.description}</p>
                  <div className="card-actions justify-end">
                    <button 
                      className="btn btn-primary"
                      onClick={() => handleStartQuiz(card.quizId)} // Pass quizId to handleStartQuiz
                    >
                      Start Quiz
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white bg-black p-2 rounded-full"
          onClick={handlePrev}
        >
          Prev
        </button>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white bg-black p-2 rounded-full"
          onClick={handleNext}
        >
          Next
        </button>
      </div>

      {/* Show Quiz Component when selected */}
      {showQuiz && <Quizes selectedQuiz={selectedQuiz} />} {/* Pass selectedQuiz as a prop */}

    </div>
  );
};

export default Recommendations;
