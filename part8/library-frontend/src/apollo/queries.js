import { gql } from "@apollo/client";


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
 * @typedef {object} AllAuthorsResult
 * @property {Author[]} allAuthors
 */

/**
 * @typedef {{
 *  author?: string,
 *  genre?: string
 * }} AllBooksVariables
 */
export const ALL_BOOKS = gql`
query AllBooks($author: String, $genre: String) {
  allBooks(author: $author, genre: $genre) {
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
}
`
/**
 * @typedef {object} AllBooksResult
 * @property {Book[]} allBooks
 */

export const ME = gql`
query Me {
  me {
    username
    favoriteGenre
    id
  }
}
`
/**
 * @typedef {object} MeResult
 * @property {User} me
 */