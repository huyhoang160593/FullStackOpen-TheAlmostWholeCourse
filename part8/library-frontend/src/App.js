import { useEffect, useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from 'components/LoginForm';
import { PageRoutes } from 'constants/pageRoutes';
import { LocalStorageKeys } from 'constants/localStorageKeys';
import { useApolloClient } from '@apollo/client';

/** @typedef {PageRoutes[keyof PageRoutes]} PageState */

const App = () => {
  const client = useApolloClient();
  const [token, setToken] = useState(/** @type {string} */ (null));
  const [page, setPage] = useState(
    /** @type {PageState} */ (PageRoutes.AUTHORS)
  );

  useEffect(() => {
    const token = localStorage.getItem(LocalStorageKeys.LIBRARY_USER_TOKEN);
    if (token) setToken(token);
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => setPage(PageRoutes.AUTHORS)}>authors</button>
        <button onClick={() => setPage(PageRoutes.BOOKS)}>books</button>
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

      <Authors show={page === PageRoutes.AUTHORS} />

      <Books show={page === PageRoutes.BOOKS} />

      <NewBook show={page === PageRoutes.ADD} />

      <LoginForm show={page === PageRoutes.LOGIN} setToken={setToken} />
    </div>
  );
};

export default App;
