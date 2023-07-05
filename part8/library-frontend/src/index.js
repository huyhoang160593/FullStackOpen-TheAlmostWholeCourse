import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LocalStorageKeys } from 'constants/localStorageKeys';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(LocalStorageKeys.LIBRARY_USER_TOKEN)
  const newHeaders = {
    ...headers,
    ...(token && ({authorization: `Bearer ${token}`}))
  }
  return {
    headers: newHeaders
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

ReactDOM.createRoot(document.getElementById('root')).render(
<ApolloProvider client={client}>
  <App />
</ApolloProvider>
)