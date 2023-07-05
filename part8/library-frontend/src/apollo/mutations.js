import { gql } from "@apollo/client";

/**
 * @typedef {Omit<Book, 'id' | 'author'> & { author: string }} AddBookVariables
 * */
export const ADD_BOOK = gql`
mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    author {
      id
      name
      born
      bookCount
    }
    genres
    id
    published
    title
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

/**
 * @typedef {{
 *  username: string,
 *  password: string
 * }} LoginVariables
 */
export const LOGIN = gql`
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`
/**
 * @typedef {{
 *  login: {
 *    value: string
 *  }
 * }} LoginResult
 * */