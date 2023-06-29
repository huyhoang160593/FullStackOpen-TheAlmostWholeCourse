import { Link } from 'react-router-dom'
import { routerPaths } from 'misc/router'

/**
 * @typedef {Object} Props
 * @property {Blog} blog
 * */

/** @param {Props} props */
const Blog = ({ blog }) => {
  return (
    <article className="card bg-base-100 shadow-xl">
      <Link
        to={routerPaths.BLOG_DETAIL.replace(':id', blog.id)}
        className="card-body"
      >
        <span className='card-title'>{blog.title}</span>
        <span className='italic'>{blog.author}</span>
      </Link>
    </article>
  )
}

export default Blog
