import React, { useState } from "react";
import { useHandleSavedButton } from '../utils/handleSavedButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


import searchGoogleBooks from '../utils/API';
import '../index.css';
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
                <div className="card-grid" id="BookCard">
                    {data?.items?.map((book) => (
                        <div className="card-item w-full max-w-md" key={book.id || book.volumeInfo.title}>
                            {/* Card Structure */}
                            <div className="card card-side flex flex-row w-full max-w-md">
                                {/* Image on left side */}
                                <figure className="flex-shrink-0 mr-4">
                                    <img
                                        className="w-40 h-auto object-cover"
                                        src={book.volumeInfo.imageLinks?.thumbnail}
                                        alt={book.volumeInfo.title} />
                                </figure>
                                {/* Text content on the right side */}
                                <div className="card-body flex flex-col justify-between w-2/3">
                                    <h2 className="card-title text-xl font-semibold">{book.volumeInfo.title}</h2>
                                    <p className="text-sm">{book.searchInfo?.textSnippet || 'No description available.'}</p>
                                    <div className="card-actions justify-center w-full mt-4">
                                        {/*if user is logged in, display save button*/}
                                        <button
                                            className="btn btn-primary w-full max-w-xs"
                                            disabled={savedBookIds?.some((savedBookId) => savedBookId === book.id)}
                                            onClick={() => handleSavedButton(book)}
                                        >
                                            {savedBookIds?.some((savedBookId) => savedBookId === book.id)
                                                ? 'This book has already been saved!'
                                                : 'Save to your Bookshelf!'}
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div >
        </div >
    );
};
export default BookSearch;