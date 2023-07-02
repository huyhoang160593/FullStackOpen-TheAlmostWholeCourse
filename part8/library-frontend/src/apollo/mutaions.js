import { gql } from "@apollo/client";

/**
 * @typedef {Omit<Book, 'id'>} AddBookVariables
 * */
export const ADD_BOOK = gql`
mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    id
    author
    published
    title
    genres
  }
}
`