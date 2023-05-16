import { useState } from 'react'
import blogsServices from '../services/blogs'

/**
 * @typedef {Object} User
 * @property {id} id
 * @property {string} name
 * @property {string} username
 * */

/**
 * @typedef {Object} Blog
 * @property {string} id
 * @property {string} title
 * @property {string} author
 * @property {string} url
 * @property {number} likes
 * @property {User} user
 */

/**
 * @typedef {Object} Props
 * @property {Blog} blog
 * @property {User} user
 * @property {(blog) => void} updateBlogList
 * @property {(blog) => void} deleteBlogList
 * */

/** @param {Props} props */
const Blog = ({ blog, user, updateBlogList, deleteBlogList }) => {
  const [toggle, setToggle] = useState(false)
  /** @type {import('react').CSSProperties} */
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  /** @type {React.MouseEventHandler<HTMLButtonElement>} */
  const onLikesClickHandle = async (event) => {
    event.preventDefault()
    try {
      const updatedBlog = await blogsServices.put(blog.id, {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      })
      updateBlogList(updatedBlog)
    } catch (error) {
      //TODO: add exception when needed
    }
  }

  /** @type {React.MouseEventHandler<HTMLButtonElement>} */
  const onRemoveBlogHandle = async (event) => {
    event.preventDefault()
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await blogsServices.deleteItem(blog.id)
        deleteBlogList(blog)
      }
    } catch (error) {
      //TODO: add exception when needed
    }
  }

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
            <button onClick={onLikesClickHandle}>likes</button>
          </section>
          <section>{blog.user.name}</section>
          <button
            style={{
              backgroundColor: 'blue',
              color: 'white',
              visibility: blog.user.username === user?.username ? 'visible' : 'hidden'
            }}
            onClick={onRemoveBlogHandle}
          >
            remove
          </button>
        </>
      )}
    </div>
  )
}

export default Blog
