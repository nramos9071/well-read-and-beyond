// import { useQuery } from '@apollo/client';
import React from 'react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
import MovieCard from '../components/movieCard';
import BookCard from '../components/BookCard';
import BookSearch from '../components/BookSearch';



const Home = () => {

   
    return (

        <div>
            {/* {search input} */}
            <div>
                <BookSearch />
            </div>
            {/* <div className="container">
                <h1>Welcome to the Home Page</h1>
            </div> */}
            
                <div className="movieRecs flex-auto flex-col rounded box grid-rows-2 grid-cols-4">
                    <h3 className="rounded box">Movie Recommendations</h3>
                    <div id="homePageMovies" className="flex-auto">
                        <ul id="homePageMovieList" className="flex-col">
                            {/* Append movie recommendations from TMDB API based on selected Book */}
                            {/* Auto generate recommendations based on first book in list? Or favorite Genre? */}
                            <div>
                                <MovieCard />
                            </div>
                        </ul>
                    </div>
                </div>
            </div>

       
    )
}


export default Home;