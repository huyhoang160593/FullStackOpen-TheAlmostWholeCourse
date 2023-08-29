/** @typedef {import('@apollo/client').ApolloCache<object>} ApolloCache */
export const updateCache = (
  /** @type {ApolloCache<object>} */ cache,
  /** @type {string} */ query,
  /** @type {Book} */addedBook
) => {
  // helper that is used to eliminate saving same book twice
  const uniqByID = (/** @type {Book[]} */ books) => {
    let seen = /** @type {Set<Book[]>} */ (new Set());
    return books.filter((item) => {
      let k = item.id;
      return seen.has(k) ? false : Boolean(seen.add(k));
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByID(allBooks.concat(addedBook)),
    };
  });
};