import React, { useState, useEffect } from 'react';

// Fetch book data from Google Books API
const fetchBookData = async (bookTitle) => {
  const apiKey = 'REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyBLc3oN3uOhxklqrsSQONHY_gIvs-Jc7nE';
  const url = `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.items ? data.items[0].volumeInfo : null;
  } catch (error) {
    console.error('Error fetching book data:', error);
    return null;
  }
};

const fetchMovieData = async (bookTitle) => {
  const apiKey = '6e7a2b9da1c781e65f8f1763ae61eac5';
  // const url = `http://www.omdbapi.com/?t=${encodeURIComponent(bookTitle)}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie data:', error);
    return null;
  }
};

const BookWithMovieRecommendation = ({ bookTitle }) => {
  const [bookData, setBookData] = useState(null);
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBookAndMovieData = async () => {
      // Fetch book data from Google Books API
      const bookResponse = await fetchBookData(bookTitle);
      setBookData(bookResponse);

      // Fetch movie data from OMDb API
      const movieResponse = await fetchMovieData(bookTitle);
      setMovieData(movieResponse);

      setLoading(false);
    };

    getBookAndMovieData();
  }, [bookTitle]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!bookData) {
    return <p>Book not found.</p>;
  }

  return (
    <div>
      <h2>{bookData.title}</h2>
      <p><strong>Authors:</strong> {bookData.authors?.join(', ')}</p>
      <p><strong>Description:</strong> {bookData.description}</p>
      <img src={bookData.imageLinks?.thumbnail} alt={bookData.title} />

      {movieData && movieData.Response === 'True' ? (
        <div>
          <h3>Movie Recommendation</h3>
          <p><strong>Title:</strong> {movieData.Title}</p>
          <p><strong>Year:</strong> {movieData.Year}</p>
          <p><strong>Plot:</strong> {movieData.Plot}</p>
          <img src={movieData.Poster} alt={movieData.Title} />
        </div>
      ) : (
        <p>No movie found for this book.</p>
      )}
    </div>
  );
};

export default BookWithMovieRecommendation;
