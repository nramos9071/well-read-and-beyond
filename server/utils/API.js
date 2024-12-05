// Axios is a popular NPM package used for preforming API requests
import axios from 'axios';
const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

// Using axios, we create a search method that is specific to the API we are using
const search = (query) => {
        axios.get(`https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC?key=${apiKey}&q=${query}`)}

export default search;
