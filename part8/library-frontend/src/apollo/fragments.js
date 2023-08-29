import { gql } from '@apollo/client';

export const BOOK_DETAIL = gql`
  fragment BookDetail on Book {
    id
    genres
    title
    published
    author {
      bookCount
      born
      id
      name
    }
  }
`;
