import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/mutations'; // Import the query
import { searchTMDBMovies } from '../utils/API';
import MovieCard from '../components/movieCard';
import BookCard from '../components/bookCard';
import BookSearch from '../components/BookSearch';



const Home = () => {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bookTitles, setBookTitles] = useState([]); // State for book titles
    const [movieResults, setMovieResults] = useState({}); // State to store movie results for each book

    // Query to get the current user's saved books
    const { loading: booksLoading, error, data } = useQuery(GET_ME);

    // const fetchMovieRecommendations = async (bookTitle) => {
    //     try {
    //         const response = await searchTMDBMovies(bookTitle);
    //         return response.data.results.slice(0, 5); // Limit to 5 results
    //     } catch (error) {
    //         console.error('Error fetching movie recommendations:', error);
    //         return []; // Return empty if there's an error
    //     }
    // };


    // const { error, data } = useQuery(GET_SAVED_BOOKS);

    // Fetch movie recommendations for all saved books
    useEffect(() => {
        if (data) {
            const bookTitles = data.me.savedBooks.map(book => book.title);
            // Fetch movies for all saved books
            const fetchMoviesForSavedBooks = async () => {
                setLoading(true); // Show loading while fetching movies
                const results = {};

                // Loop through each book title and fetch movie recommendations
                for (const title of bookTitles) {
                    const movieRecs = await searchTMDBMovies(title);
                    results[title] = movieRecs;
                }

                setMovieResults(results); // Save movie results for each book
                setLoading(false); // Hide loading after fetching
            };
            fetchMoviesForSavedBooks();
        }
    }, [data]);

    if (booksLoading) {
        return <p>Loading saved books...</p>;
    }

    if (error) {
        return <p>Error loading saved books!</p>;
    }

    return (

        <div className="contentContainer">
            <div id="searchContentContainer">
                {/* {search input} */}
                <div>
                    <BookSearch />
                </div>
            </div>

            {/* The div holding Movie Recommendations */}
            <div className="movieRecs rounded box  justify-center">
                <h3 className="rounded box">Movie Recommendations</h3>
                <div id="homePageMovies" className="flex flex-wrap justify-center gap-4">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        Object.entries(movieResults).map(([bookTitle, movies]) => (
                            <div key={bookTitle}>
                                <h4>{bookTitle}</h4>
                                <div className="movie-list flex flex-wrap justify-center gap-2">
                                    {movies.length > 0 ? (
                                        movies.map((movie) => (
                                            <MovieCard
                                                key={movie.id}
                                                title={movie.title}
                                                image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                                releaseDate={movie.release_date}
                                            />
                                        ))
                                    ) : (
                                        <p>No movie recommendations found.</p>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>

    );
};


export default Home;