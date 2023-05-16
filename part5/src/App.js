import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification, { SUCCESS } from './components/Notification'
import Togglable from './components/Togglable'

/**
 * @callback DisplayEvent
 * @param {string} message
 * @param {string} type
 * @param {number} timeout
 * @returns {void}
 */

const defaultNotificationState = {
  type: null,
  message: null,
}

const App = () => {
  const [blogs, setBlogs] = useState(
    /** @type {import('./components/Blog').Blog[]} */ ([])
  )
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    ...defaultNotificationState,
  })
  /** @type {import('react').MutableRefObject<import('./components/Togglable').ImperativeObject>} */
  const blogFormToggleRef = useRef()

  useEffect(() => {
    if (!user) return
    blogService.getAll().then((blogs) => setBlogs(blogs))
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
    setBlogs(
      blogs.map((currentBlog) =>
        currentBlog.id !== updatedBlog.id ? currentBlog : updatedBlog
      )
    )
  }

  const deleteBlogHandle = (deletedBlog) => {
    setBlogs(blogs.filter((currentBlog) => currentBlog.id !== deletedBlog.id))
  }

  /** @type {DisplayEvent} */
  const displayNotification = (message, type = SUCCESS, timeout = 3000) => {
    setNotification({
      message,
      type,
    })
    setTimeout(() => {
      setNotification({
        ...defaultNotificationState,
      })
    }, timeout)
  }
  return (
    <div>
      {!user && (
        <>
          <h2>log in to application</h2>
          <Notification
            message={notification.message}
            type={notification.type}
          />
          <LoginForm
            setUser={setUser}
            displayNotification={displayNotification}
          />
        </>
      )}
      {user && (
        <>
          <h2>blogs</h2>
          <Notification
            message={notification.message}
            type={notification.type}
          />
          <p>
            {user.username} logged in{' '}
            <button onClick={handleLogout}>logout</button>
          </p>

          <h2>create new</h2>
          <Togglable buttonLabel="new blog" ref={blogFormToggleRef}>
            <CreateBlogForm
              user={user}
              blogs={blogs}
              setBlogs={setBlogs}
              displayNotification={displayNotification}
              toggleVisibility={blogFormToggleRef.current?.toggleVisibility}
            />
          </Togglable>

          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
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
