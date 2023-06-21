import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useAppDispatch, useAppSelector } from 'store.js'
import { fetchBlogs } from 'reducers/blogsReducers'

const App = () => {
  const blogs = useAppSelector((state) =>
    state.blogs.concat().sort((a, b) => b.likes - a.likes)
  )
  const dispatch = useAppDispatch()
  const [user, setUser] = useState(null)

  /** @type {import('react').MutableRefObject<import('./components/Togglable').ImperativeObject>} */
  const blogFormToggleRef = useRef()

  useEffect(() => {
    if (!user) return
    dispatch(fetchBlogs())
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  /** @type {React.MouseEventHandler<HTMLButtonElement>} */
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const updateBlogHandle = (updatedBlog) => {
    const injectUser = {
      id: updatedBlog.user,
      name: user.name,
      username: user.username,
    }
    updatedBlog.user = injectUser
    // TODO: using redux to modified the blog
    // setBlogs(
    //   blogs.map((currentBlog) =>
    //     currentBlog.id !== updatedBlog.id ? currentBlog : updatedBlog
    //   )
    // )
  }

  const deleteBlogHandle = (_deletedBlog) => {
    // TODO: using redux to delete the blog
    // setBlogs(blogs.filter((currentBlog) => currentBlog.id !== deletedBlog.id))
  }

  return (
    <div>
      {!user && (
        <>
          <h2>log in to application</h2>
          <Notification />
          <LoginForm setUser={setUser} />
        </>
      )}
      {user && (
        <>
          <h2>blogs</h2>
          <Notification />
          <p>
            {user.username} logged in{' '}
            <button onClick={handleLogout}>logout</button>
          </p>

          <h2>create new</h2>
          <Togglable buttonLabel="new blog" ref={blogFormToggleRef}>
            <CreateBlogForm
              user={user}
              toggleVisibility={blogFormToggleRef.current?.toggleVisibility}
            />
          </Togglable>

          {blogs.map((blog) => (
            <Blog
              user={user}
              key={blog.id}
              blog={blog}
              updateBlogList={updateBlogHandle}
              deleteBlogList={deleteBlogHandle}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default App
