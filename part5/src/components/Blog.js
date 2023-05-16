import { useState } from 'react';

/**
 * @typedef {Object} User
 * @property {string} name
 * @property {string} username
 * */

/**
 * @typedef {Object} Blog
 * @property {string} title
 * @property {string} author
 * @property {string} url
 * @property {number} likes
 * @property {User} user
 */

/**
 * @typedef {Object} Props
 * @property {Blog} blog
 * */

/** @param {Props} props */
const Blog = ({ blog }) => {
  const [toggle, setToggle] = useState(false);
  /** @type {import('react').CSSProperties} */
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      <section>
        {blog.title} {blog.author}
        <button onClick={() => setToggle(!toggle)}>
          {toggle ? 'hide' : 'view'}
        </button>
      </section>
      {toggle && (
        <>
          <section>{blog.url}</section>
          <section>
            {blog.likes}
            <button>likes</button>
          </section>
          <section>{blog.user.name}</section>
        </>
      )}
    </div>
  );
};

export default Blog;
