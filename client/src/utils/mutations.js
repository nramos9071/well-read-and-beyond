import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      email
      savedBooks {
        bookId
        title
        authors
        description
        link
        image
        }
      }
    }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($book: BookInput!) {
    saveBook(book: $book) {
      _id
      email
      savedBooks {
        bookId
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
        bookId
        title
        authors
        description
        link
        image
        }}}`;
