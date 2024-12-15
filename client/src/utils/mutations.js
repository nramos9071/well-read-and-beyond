import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
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

export const SAVE_BOOK = gql`
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
        link
        image
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
       id
        title
        authors
        description
        link
        image
        }}}`;
