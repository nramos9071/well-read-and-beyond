// Axios is a popular NPM package used for preforming API requests
import axios from 'axios';
// import { get } from 'mongoose';
const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

// Using axios, we create a search method that is specific to the API we are using

export default {
searchGoogleBooks: (query) => {
  return axios.get(`https://www.googleapis.com/books/v1/volumes?q=maxResults=10&filter=non-fiction&${query}&key=${apiKey}`)
},
// Gets all books

getBooks: function() {
  return axios.get('/api/books');
},
// Gets the book with the given id
getBook: function(id) {
  return axios.get('/api/books/' + id);
},
//saves book to the database
saveBook: function(bookData) {
  return axios.post('/api/books', bookData);
},
// Deletes the book with the given id
deleteBook: function(id) {
  return axios.delete('/api/books/' + id);
}

};
