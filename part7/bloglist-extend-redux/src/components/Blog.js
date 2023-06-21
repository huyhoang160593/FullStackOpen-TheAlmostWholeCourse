import { useState } from 'react'
import blogsServices from '../services/blogs'
import { useAppDispatch } from 'store.js'
import { changeBlog } from 'reducers/blogsReducers'

/**
 * @typedef {Object} Props
 * @property {Blog} blog
 * @property {User} user
 * @property {(blog: Blog) => void} [deleteBlogList]
 * */

/** @param {Props} props */
const Blog = ({ blog, user, deleteBlogList }) => {
  const dispatch = useAppDispatch()
  const [toggle, setToggle] = useState(false)
  /** @type {import('react').CSSProperties} */
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  /** @param {React.MouseEvent<HTMLButtonElement, MouseEvent> & { target: HTMLButtonElement }} event */
  const onLikesClickHandle = async (event) => {
    event.preventDefault()
    event.currentTarget.disabled = true

    const error = await dispatch(changeBlog(blog.id, {
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }, user))
    event.target.disabled = false
    if(error) {
      // TODO: handle error here
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
