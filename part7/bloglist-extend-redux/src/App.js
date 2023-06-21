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
            <Blog user={user} key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  )
}

export default App
