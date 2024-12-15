import { gql, useMutation } from '@apollo/client';
import Auth from './auth';

const SAVE_BOOK = gql`
  mutation saveBooks($book: BookInput!) {
    saveBooks(book: $book) {
      _id
      email
      username
      savedBooks {
        id
        title
        authors
        description
        image
        link
      }
    }
  }
`;

export const useHandleSavedButton = () => {
  const [saveBook] = useMutation(SAVE_BOOK, {
    fetchPolicy: 'network-only',  // Ensure it bypasses the cache and gets fresh data
  });

  const handleSavedButton = async (book) => {
    // Retrieve the token from cookies
    const token = Auth.getToken();

    if (!token) {
      console.error('No token found, please log in.');
      return;
    }

    console.log('Token:', token);
    console.log('Book to save:', book);

    // Ensure the book object has the expected structure
    if (!book || !book.volumeInfo) {
      console.error('Invalid book object:', book);
      return;
    }

    // Extract only the necessary properties from the book object
    const bookInput = {
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors?.join(', ') || 'Unknown',
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks?.thumbnail,
      link: book.volumeInfo.infoLink,
    };

    console.log('Sending book input to server:', bookInput);

    try {
      const { data } = await saveBook({
        variables: { book: bookInput },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      console.log(`Book with ID ${book.id} saved`, data);
      // Check if savedBooks are in the response
     
      console.log('Variables being sent to Apollo:', { book: bookInput });

    
    } catch (error) {
      console.error('Error saving book', error);
      if (error.networkError) {
        console.error('Network error details:', error.networkError.result.errors);
      }
    }
  };

  return handleSavedButton;
};