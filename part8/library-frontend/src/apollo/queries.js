import { gql } from "@apollo/client";

/**
 * @typedef {object} AllAuthorsResult
 * @property {Author[]} allAuthors
 */

export const ALL_AUTHOR = gql`
query AllAuthors {
  allAuthors {
    id
    name
    born
    bookCount
  }
}`

/**
 * @typedef {object} AllBooksResult
 * @property {Omit<Book, 'genres'>[]} allBooks
 */
export const ALL_BOOKS = gql`
query AllBooks {
  allBooks {
    title
    published
    author {
      id
      name
      born
      bookCount
    }
    id
    genres
  }
}`
