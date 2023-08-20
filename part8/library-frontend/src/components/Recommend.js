import { useLazyQuery, useQuery } from '@apollo/client';
import { ALL_BOOKS, ME } from 'apollo/queries';
import { useEffect } from 'react';

/** @typedef {import('apollo/queries').MeResult} MeResult */
/** @typedef {import('apollo/queries').AllBooksVariables} AllBooksVariables */
/** @typedef {import('apollo/queries').AllBooksResult} AllBooksResult */

const Recommend = (props) => {
  /** @type {import('@apollo/client').QueryResult<MeResult>} */
  const { data: meData, loading: meLoading, error: meError } = useQuery(ME);
  /** @type {import('@apollo/client').LazyQueryResultTuple<AllBooksResult,AllBooksVariables>} */
  const [getBook, { loading, error, data }] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy:'no-cache'
  });

  useEffect(() => {
    if(!props.show) return
    if (!meData) return;
    getBook({
      variables: {
        genre: meData.me.favoriteGenre
      },
    });
  }, [getBook, meData, props.show]);

  if (!props.show) return null;
  if (meLoading || loading) {
    return <section>Loading...</section>;
  }
  if (meError || error) {
    return <section>
      <p>{`User Error! ${meError.message}`}</p>
      <p>{`Book errors! ${error.message}`}</p>
    </section>;
  }

  const books = data?.allBooks

  if (!props.show) return null;
  return (
    <section>
      <h2>Recommendations</h2>

      <p>
        Books in your favorite genre <strong>{meData.me.favoriteGenre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books?.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Recommend;
