/**
 * @typedef {Object} Blog
 * @property {string} title
 * @property {string} author
 */

/**
 * @typedef {Object} Props
 * @property {Blog} blog
 * */

/** @param {Props} props */
const Blog = ({blog}) => (
  <div>
    {blog.title} {blog.author}
  </div>
)

export default Blog