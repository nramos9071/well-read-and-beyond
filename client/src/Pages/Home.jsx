import { useQuery } from '@apollo/client';

import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import movieCard from '../components/movieCard';
import bookCard from '../components/bookCard';

const Home = () => {

    return (
        <div>
            <div className="container">
                <h1>Welcome to the Home Page</h1>
            </div>
            <div className="container" >
                <div className="myBooks" class="flex rounded box">
                    <h3>My Books</h3>
                    <div id="homePageBooks" class="flex-auto">
                        <ul id="homePageBooksList" class="flex-col">
                            {/* Append current books from user database? */}
                            {bookCard()}
                        </ul>
                    </div>
                </div>
                <div className="movieRecs" class="flex-auto">
                    <h3>Movie Recommendations</h3>
                    <div id="homePageMovies" class="flex-col ">
                        <ul id="homePageMovieList">
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