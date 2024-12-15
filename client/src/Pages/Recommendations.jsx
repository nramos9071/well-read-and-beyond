import React, { useState } from 'react';
import {quizBooksResults} from '../utils/API';
import { useHandleSavedButton } from '../utils/handleSavedButton';
// import '../components/BookSearch.css';
const Recommendations = () => {


    const [answers, setAnswers] = useState([]);
    const [quizHistory, setQuizHistory] = useState([]);
    const [data, setData] = useState([]);
    const handleSavedButton = useHandleSavedButton();

    const questions = [
        { id: 1, question: 'What kind of stories do you enjoy?', options: ['Adventure', 'Mystery', 'Romance'] },
        { id: 2, question: 'What settings do you prefer?', options: ['Fantasy worlds', 'Outer space', 'Urban'] },
    ];

    const handleAnswerChange = (questionId, answer) => {
        const updatedAnswers = [...answers];
        updatedAnswers[questionId - 1] = answer;
        setAnswers(updatedAnswers);
    };

    const handleSubmit = async () => {
        const response =await quizBooksResults(answers);
        const books= response.data.items;
        console.log(books);
        setQuizHistory([...quizHistory, answers]);
        setData(books);
    };



    return (
        <div>
            <div className="collapse bg-base-200">
  <input type="checkbox" className="peer" />
  <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
    Click me to show/hide content
  </div>
  <div className="collapse-content bg-base-300 text-base-content">
    <p>Content inside the collapse works!</p>
  </div>
</div>
            <div className="carousel w-full">
  <div id="item1" className="carousel-item w-full">
    <img
      src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
      className="w-full" />
  </div>
  <div id="item2" className="carousel-item w-full">
    <img
      src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
      className="w-full" />
  </div>
  <div id="item3" className="carousel-item w-full">
    <img
      src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
      className="w-full" />
  </div>
  <div id="item4" className="carousel-item w-full">
    <img
      src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
      className="w-full" />
  </div>
</div>
<div style={{ border: '2px solid red' }}>
  <h1>Debugging Visibility</h1>
</div>
<div className="flex w-full justify-center gap-2 py-2">
  <a href="#item1" className="btn btn-xs">1</a>
  <a href="#item2" className="btn btn-xs">2</a>
  <a href="#item3" className="btn btn-xs">3</a>
  <a href="#item4" className="btn btn-xs">4</a>
</div>
            
            <h1>Book Quiz</h1>

            {questions.map((q) => (
                <div key={q.id}>
                    <h3>{q.question}</h3>
                    {q.options.map((option) => (
                        <label key={option}>
                            <input
                                type="radio"
                                name={`question-${q.id}`}
                                value={option}
                                onChange={() => handleAnswerChange(q.id, option)}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            ))}
            <button onClick={handleSubmit}>Submit Quiz</button>
            <div>
               
                <div className="card-grid" id="BookCard">
                    {data.map((book) => (
                        <div className="card-item" key={book.id || book.volumeInfo.title}>
                            <h2 className="card-title" id="bookTitle">{book.volumeInfo.title}</h2>
                            <figure>
                                <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
                            </figure>
                            <div className="card-body">
                                <p>{book.searchInfo.textSnippet}</p>
                                <div className="card-actions justify-end"></div>
                                {/*if user is logged in, display save button*/}
                                {/* {user?.loggedIn && ( */}
                                <button
                                    className="btn btn-primary"
                                    id={book.id}
                                    onClick={() => handleSavedButton(book)}
                                >
                                    Save to your Bookshelf!
                                </button>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    );
};


export default Recommendations;
