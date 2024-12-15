// Axios is a popular NPM package used for preforming API requests
import axios from 'axios';
// import { get } from 'mongoose';
const apiKey = import.meta.env.VITE_API_KEY;
const baseURL = 'https://www.googleapis.com/books/v1/volumes';
console.log(apiKey);



// Using axios, we create a search method that is specific to the API we are using

export default function searchGoogleBooks (query){
        //setting the query to the base URL to produce a maximum of 10 results for non-fiction books
        const url = `${baseURL}?q=${query}&maxResults=10&fiction&orderBy=relevance&key=${apiKey}`;
    
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
  const url = `${baseURL}?q=${query}&maxResults=5&key=${apiKey}`;
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
