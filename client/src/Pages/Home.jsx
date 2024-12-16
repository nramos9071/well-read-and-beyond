import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/mutations'; // Import the query
import { searchTMDBMovies } from '../utils/API';
import MovieCard from '../components/movieCard';
import BookCard from '../components/bookCard';
import BookSearch from '../components/BookSearch';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';



const Home = () => {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bookTitles, setBookTitles] = useState([]); // State for book titles
    const [movieResults, setMovieResults] = useState({}); // State to store movie results for each book

    // Query to get the current user's saved books
    const { loading: booksLoading, error, data } = useQuery(GET_ME);



    // Fetch movie recommendations for all saved books
    useEffect(() => {
        console.log('useEffect triggered');
        console.log('Data:', data);
        if (data && data.me && data.me.savedBooks) {
            console.log('Data.me.savedBooks:', data.me.savedBooks);
            const bookTitles = data.me.savedBooks.map(book => book.title);
            // Fetch movies for all saved books
            const fetchMoviesForSavedBooks = async () => {
                setLoading(true); // Show loading while fetching movies
                const results = {};

                // Loop through each book title and fetch movie recommendations
                for (const title of bookTitles) {
                    try {
                      console.log(`Fetching movies for "${title}"`);
                      const movieRecs = await searchTMDBMovies(title);
                      console.log(`Movies for "${title}":`, movieRecs);
                      results[title] = movieRecs;
                    } catch (error) {
                      console.error(`Error fetching movies for "${title}":`, error);
                    }
                  }

                setMovieResults(results); // Save movie results for each book
                setLoading(false); // Hide loading after fetching
                console.log('Updated movieResults:', results);
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
            <div>
    <Navbar />
</div>
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
                        Object.entries(movieResults).map(([bookTitle, movieData]) => (
                            <div key={bookTitle}>
                              <h4>{bookTitle}</h4>
                              <div className="movie-list flex flex-wrap justify-center gap-2">
                                {/* Check if there are movies, and map them */}
                                {movieData.data.results && movieData.data.results.length > 0 ? (
                                  movieData.data.results.map((movie) => {
                                    // Debug: Check if movie has the necessary properties
                                    console.log('Movie:', movie); // Ensure movie object has 'poster_path'
                                    return (
                                      <MovieCard
                                        key={movie.id}
                                        title={movie.title}
                                        image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                        releaseDate={movie.release_date}
                                      />
                                    );
                                  })
                                    ) : (
                                        <p>No movie recommendations found.</p>
                                       
                                    )}
                  
                                </div>
                         
                            </div>
                           
                        ))
                    )}
                    <div>
<Footer />
</div>
                </div>
            </div>
        </div>

    );
};


export default Home;