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

/**
 * @typedef {{
 *  name: string,
 *  setBornTo: number
 * }} EditAuthorVariables
 * */
export const EDIT_AUTHOR = gql`
mutation EditAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    id
    born
    name
    bookCount
  }
}
`