import { useState } from 'react'
import blogsServices from '../services/blogs'

/**
 * @typedef {Object} Props
 * @property {Blog} blog
 * @property {User} user
 * @property {(blog: Blog) => void} [updateBlogList]
 * @property {(blog: Blog) => void} [deleteBlogList]
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
    <div aria-label='blogContainer' style={blogStyle}>
      <section aria-label="blogTitleAuthor">
        {blog.title} {blog.author}
        <button onClick={() => setToggle(!toggle)}>
          {toggle ? 'hide' : 'view'}
        </button>
      </section>
      {toggle && (
        <>
          <section aria-label='blogURL'>{blog.url}</section>
          <section aria-label='blogLikes'>
            {blog.likes}
            <button name='LikeButton' onClick={onLikesClickHandle}>likes</button>
          </section>
          <section aria-label='blogUserName'>{blog.user.name}</section>
          <button
            name='RemoveButton'
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
