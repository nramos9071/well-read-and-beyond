import React, { useState } from "react";
import { useHandleSavedButton } from '../utils/handleSavedButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


import searchGoogleBooks from '../utils/API';
import './BookSearch.css';

const BookSearch = () => {
    const [query, setQuery] = useState("");
    const [book, setBook] = useState("");
    const [data, setData] = useState([]);
    const [savedBookIds, setSavedBookIds] = useState([]);
    const handleSavedButton = useHandleSavedButton();

    function handleChange(event) {
        const book = event.target.value;
        setBook(book);
        setQuery(book); // Update the query state
    }

    const callAPI = (event) => {

        event.preventDefault(); // Prevent form submission
        searchGoogleBooks(query)
            .then(data => {
                console.log("API call", data.data.items);
                // setData(data.data.items);
            }).catch(error => {
                console.error("Error fetching data: ", error);
            });

    };
    return (
        <div id="bookSearchDiv" className="flex-auto rounded box">
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
                        <div className="card-item size-45" key={book.id || book.volumeInfo.title}>
                            <h2 className="card-title" id ="bookTitle">{book.volumeInfo.title}</h2>
                            <figure>
                                <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
                            </figure>
                            <div className="card-body">
                                <p>{book.searchInfo?.textSnippet}</p>
                                <div className="card-actions justify-end"></div>
                                {/*if user is logged in, display save button*/}
                                {/* {user?.loggedIn && ( */}
                            <button 
                                className="btn btn-primary" 
                                disabled={savedBookIds?.some((savedBookId) => savedBookId === book.id)}
                                onClick={() => handleSavedButton(book)}
                            >
                               {savedBookIds?.some((savedBookId) => savedBookId === book.id)
                                            ? 'This book has already been saved!'
                                            : 'Save to your Bookshelf!'}
                            </button>
                      
                            </div>
                        </div>
                    ))}
                </div>
            </div >
        </div >
    );
};
export default BookSearch;