// Axios is a popular NPM package used for preforming API requests
import axios from 'axios';
// import { get } from 'mongoose';
const apiKey = import.meta.env.VITE_API_KEY;

console.log(apiKey);



// Using axios, we create a search method that is specific to the API we are using

export default {
searchGoogleBooks: (query) => {
        const baseURL = 'https://www.googleapis.com/books/v1/volumes';
        //setting the query to the base URL to produce a maximum of 10 results for non-fiction books
        const url = `${baseURL}?q=${query}&maxResults=10&fiction&orderBy=relevance&key=${apiKey}`;
    
    return axios
      .get(url)
      .then((response) => response.data) // Extract the data
      .catch((error) => {
        console.error('Error fetching books from Google Books API:', error);
        throw error;
      });
    },
};
//searching all books
export const searchBooks = async (query) => {
    try {
      const response = await axios.get('/api/books/search', {
        params: { query },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching books:', error);
      throw error;
    }
  };
  //savebook 
    export const savedBooks = async () => {
        try {
        const response = await axios.get('/api/books');
        return response.data;
        } catch (error) {
        console.error('Error getting saved books:', error);
        throw error;
        }
    };
//delete book
    export const deleteBook = async (bookId) => {
        try {
        const response = await axios.delete(`/api/books/${bookId}`);
        return response.data;
        } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
        }
    }
