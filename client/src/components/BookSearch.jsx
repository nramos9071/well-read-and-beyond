import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { savedBooks} from '../utils/API';
import searchGoogleBooks from '../utils/API';
import './BookSearch.css';
// import Auth from '../utils/auth';

const BookSearch = () => {
    const [query, setQuery] = useState("");
    const [book, setBook] = useState("");
   const [data, setData] = useState([]);
    const [savedBookIds, setSavedBookIds] = useState([]);
    //checkif user is logged in retrieves the token then saves the book
    const handleSaveBook = async (book) => {
       try {
            const response = await savedBooks({
                bookId: book.id,
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors,
                description: book.volumeInfo.description,
                image: book.volumeInfo.imageLinks?.thumbnail,
                link: book.volumeInfo.infoLink,
            });
            console.log('Saved book:', response);
            // If the book is successfully saved to the user's account
            setSavedBookIds([...savedBookIds, response.bookId]);
        } catch (err) {
            console.error(err);
        }
    };


    function handleChange(event) {
        const book = event.target.value;
        setBook(book);
        setQuery(book); // Update the query state
    }

    

    return (
   
        <div>
            <form onSubmit={async (event) => {
                event.preventDefault();
                const data = await searchGoogleBooks(query);
                console.log(data);
                setData(data.data);
            }}
                className="input input-bordered flex items-center gap-2 color-white">
                <input onChange={handleChange} type="text" className="grow"
                    placeholder="Search" value={query} name='query'
                    style={{ color: "white" }}
                />
                <button type='submit'
                    className="badge badge-info"><FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#fcfcfc", }} /></button>
            </form>
            {/*search results */}
            <div>
                <h2>Search Results</h2>
                <div className="card-grid" id= "BookCard">
                    {data?.items?.map((book) => (
                        <div className="card-item" key={book.id || book.volumeInfo.title}>
                            <h2 className="card-title" id ="bookTitle">{book.volumeInfo.title}</h2>
                            <figure>
                                <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
                            </figure>
                            <div className="card-body">
                                <p>{book.searchInfo.textSnippet}</p>
                                <div className="card-actions justify-end"></div>
                                {/*if user is logged in, display save button*/}
                                {/* {user?.loggedIn && ( */}
                                <div>
                                    {/* Button to save book to user's book shelf */}
                            <button 
                                className="btn btn-primary" 
                                id={book.id}
                                disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                
                        onClick={() => handleSaveBook(book)}>
                        {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                          ? 'This book has already been saved!'
                          : 'Save to your Bookshelf!'}
                            </button>
                            <button 
                                className="btn btn-primary"
                               
                            >
                                See recomended films!
                            </button>
                        {/* )} */}
                            </div>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};
export default BookSearch;