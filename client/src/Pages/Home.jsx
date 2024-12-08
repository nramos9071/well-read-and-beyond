import { useQuery } from '@apollo/client';

import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import movieCard from '../components/movieCard';
import bookCard from '../components/bookCard';


const Home = () => {

    return (
        <div>
            {/* <div className="container">
                <h1>Welcome to the Home Page</h1>
            </div> */}
            <div className="contentContainer flex-auto grid-flow-row grid-cols-6" >
                <div className="myBooks flex rounded box flex-col grid-rows-1 grid-cols-2">
                    <h3 className="rounded box">My Books</h3>
                    <div id="homePageBooks" className="flex-auto">
                        <ul id="homePageBooksList" className="flex justify-center flex-col">
                            {/* Append current books from user database? */}
                            {bookCard()}
                        </ul>
                    </div>
                </div>
                <div className="movieRecs flex-auto flex-col rounded box grid-rows-2 grid-cols-4">
                    <h3 className="rounded box">Movie Recommendations</h3>
                    <div id="homePageMovies" className="flex-auto">
                        <ul id="homePageMovieList" className="flex-col">
                            {/* Append movie recommendations from TMDB API based on selected Book */}
                            {/* Auto generate recommendations based on first book in list? Or favorite Genre? */}
                            {movieCard()}
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )

};

export default Home;