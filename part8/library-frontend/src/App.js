import { useCallback, useEffect, useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from 'components/LoginForm';
import Recommend from 'components/Recommend';
import { PageRoutes } from 'constants/pageRoutes';
import { LocalStorageKeys } from 'constants/localStorageKeys';
import { useApolloClient, useSubscription } from '@apollo/client';
import { BOOK_ADDED } from 'apollo/subscriptions';
import { ALL_BOOKS } from 'apollo/queries';
import { updateCache } from 'utilities/updateCache';

/** @typedef {PageRoutes[keyof PageRoutes]} PageState */

const App = () => {
  const client = useApolloClient();
  const [token, setToken] = useState(/** @type {string} */ (null));
  const [page, setPage] = useState(
    /** @type {PageState} */ (PageRoutes.AUTHORS)
  );

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = /** @type {Book} */ (data.data.bookAdded);
      window.alert(`${addedBook.title} is added to the library`);

      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  const handleBackToFrontPage = useCallback(() => {
    setPage(PageRoutes.BOOKS);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(LocalStorageKeys.LIBRARY_USER_TOKEN);
    if (token) setToken(token);
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => setPage(PageRoutes.AUTHORS)}>
          {PageRoutes.AUTHORS}
        </button>
        <button onClick={() => setPage(PageRoutes.BOOKS)}>
          {PageRoutes.BOOKS}
        </button>
        <button onClick={() => setPage(PageRoutes.RECOMMEND)}>
          {PageRoutes.RECOMMEND}
        </button>
        {token === null ? (
          <button onClick={() => setPage(PageRoutes.LOGIN)}>login</button>
        ) : (
          <>
            <button onClick={() => setPage(PageRoutes.ADD)}>add book</button>
            <button
              onClick={() => {
                setToken(null);
                localStorage.removeItem(LocalStorageKeys.LIBRARY_USER_TOKEN);
                client.resetStore();
              }}
            >
              logout
            </button>
          </>
        )}
      </div>

      <Authors show={page === PageRoutes.AUTHORS} token={token} />

      <Books show={page === PageRoutes.BOOKS} />

      <NewBook show={page === PageRoutes.ADD} />

      <Recommend show={page === PageRoutes.RECOMMEND} />

      <LoginForm
        show={page === PageRoutes.LOGIN}
        setToken={setToken}
        moveBackToFrontPage={handleBackToFrontPage}
      />
    </div>
  );
};

export default App;
