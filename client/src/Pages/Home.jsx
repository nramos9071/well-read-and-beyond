// import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { searchTMDBMovies } from '../utils/API';
import MovieCard from '../components/movieCard';
import BookCard from '../components/bookCard';
import BookSearch from '../components/BookSearch';



const Home = () => {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMovieRecommendations = async (bookTitle) => {
        try {
            const response = await searchTMDBMovies(bookTitle);
            setMovies(response.data.results); // Save movie results to state
            setLoading(false);
        } catch (error) {
            console.error('Error fetching movie recommendations:', error);
        }
    };

    useEffect(() => {
        const bookTitle = 'The Great Gatsby'; // Example book title
        fetchMovieRecommendations(bookTitle);
    }, []); // Trigger only once when component mounts

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
                <div id="homePageMovies" className="flex-auto">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="movie-list">
                                {movies.map((movie) => (
                                    <MovieCard
                                        key={movie.id}
                                        title={movie.title}
                                        image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                        releaseDate={movie.release_date}
                                    />
                                ))}
                            </div>
                        )}
                </div>
            </div>
        </div>

        
    )
}


export default Home;