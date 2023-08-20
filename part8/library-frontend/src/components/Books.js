import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from 'apollo/queries';
import { useMemo, useState } from 'react';

const Books = (props) => {
  const [filterGenre, setFilterGenre] = useState('');

  /** @type {import('@apollo/client').QueryResult<import('apollo/queries').AllBooksResult>} */
  const result = useQuery(ALL_BOOKS);

  if (!props.show || result.loading) {
    return <section>Loading...</section>;
  }
  if (result.error) {
    return <section>{`Error! ${result.error.message}`}</section>;
  }

  const books = result.data.allBooks;
  const allGenres = books.reduce((genres, books) => {
    books.genres.forEach((genre) => genres.add(genre));
    return genres;
  }, /** @type {Set<string[]>} */ (new Set()));

  const booksFilter = books.filter((book) => filterGenre ? book.genres.includes(filterGenre) : true)
  return (
    <section>
      <h2>books</h2>

      <p>in genre <strong>{filterGenre ? filterGenre : 'all genres'}</strong></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksFilter.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <section>
        {Array.from(allGenres).map((genre) => (
          <button key={`genre_${genre}`} onClick={() => setFilterGenre(genre)}>{genre}</button>
        ))}
        <button onClick={() => setFilterGenre('')}>all genres</button>
      </section>
    </section>
  );
};

export default Books;
