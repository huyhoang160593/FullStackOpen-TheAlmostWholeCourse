import { Link } from 'react-router-dom'
import { routerPaths } from 'misc/router'

/**
 * @typedef {Object} Props
 * @property {Blog} blog
 * */

/** @param {Props} props */
const Blog = ({ blog }) => {
  /** @type {import('react').CSSProperties} */
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div aria-label="blogContainer" style={blogStyle}>
      <section aria-label="blogTitleAuthor">
        <Link to={routerPaths.BLOG_DETAIL.replace(':id', blog.id)}>{blog.title} {blog.author}</Link>
      </section>
    </div>
  )
}

export default Blog
