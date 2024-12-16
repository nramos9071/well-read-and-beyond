// Axios is a popular NPM package used for preforming API requests
import axios from 'axios';
const googleApiKey = import.meta.env.VITE_API_KEY;
const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;

// Base URLs for the APIs
const googleBooksBaseURL = 'https://www.googleapis.com/books/v1/volumes';
const tmdbBaseURL = 'https://api.themoviedb.org/3';


// Using axios, we create a search method that is specific to the API we are using

export default function searchGoogleBooks (query){
        //setting the query to the base URL to produce a maximum of 10 results for non-fiction books
        const url = `${googleBooksBaseURL}?q=${query}&maxResults=10&fiction&orderBy=relevance&key=${googleApiKey}`;
    
    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error('Error fetching books from Google Books API:', error);
        throw error;
      });
    };
  
//using the google books API to search for books based on the answers to the quiz
//using the function with quiz answers

export async function quizBooksResults(answers) {
  // Combine answers into a single query string that is compatible with the Google Books API
  const query = answers.join('&'); 
  const url = `${googleBooksBaseURL}?q=${query}&maxResults=5&key=${googleApiKey}`;
  return axios
      .get(url)
      .then((response) => {
        return response;
      })
   .catch ((error) => {
    console.error('Error fetching books:', error);
    throw error;
  });
};

// TMDB API Request - Search Movies by Title (from Book Title)
export async function searchTMDBMovies(query) {
  const encodedQuery = encodeURIComponent(query); // Properly encode the query string
  const url = `${tmdbBaseURL}/search/movie?api_key=${tmdbApiKey}&query=${encodedQuery}&language=en-US&page=1&include_adult=false`;
  
  try {
    const response = await axios.get(url);

    // Log the full response to check the structure
    console.log('TMDB API Response:', response);

    // Check if we have results, then slice the first 5 results
    const results = response.data.results ? response.data.results.slice(0, 5) : [];

    // Log the sliced results
    console.log('Sliced Results:', results);

    return { ...response, data: { ...response.data, results } };
  } catch (error) {
    console.error('Error fetching movies from TMDB API:', error);
    throw error;
}

}

// TMDB API Request - Fetch Movie Recommendations by Genre
export async function fetchMoviesByGenre(genreId) {
  const url = `${tmdbBaseURL}/discover/movie?api_key=${tmdbApiKey}&with_genres=${genreId}&language=en-US`;

  return axios
      .get(url)
      .then((response) => response)
      .catch((error) => {
          console.error('Error fetching movies by genre from TMDB API:', error);
          throw error;
      });
}