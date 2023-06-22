import { useEffect, useRef } from 'react'
import Blog from './components/Blog'

import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useAppDispatch, useAppSelector } from 'store.js'
import { fetchBlogs } from 'reducers/blogsReducers'
import { logout, receiveUserFromLocalStorage } from 'reducers/userReducers'

const App = () => {
  const blogs = useAppSelector((state) =>
    state.blogs.concat().sort((a, b) => b.likes - a.likes)
  )
  const user = useAppSelector((state) => state.user)

  const dispatch = useAppDispatch()

  /** @type {import('react').MutableRefObject<import('./components/Togglable').ImperativeObject>} */
  const blogFormToggleRef = useRef()
  useEffect(() => {
    if (user) return
    dispatch(receiveUserFromLocalStorage())
  }, [])

  useEffect(() => {
    if (!user) return
    dispatch(fetchBlogs())
  }, [user])

  /** @type {React.MouseEventHandler<HTMLButtonElement>} */
  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  return (
    <div>
      {!user && (
        <>
          <h2>log in to application</h2>
          <Notification />
          <LoginForm />
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
              toggleVisibility={blogFormToggleRef.current?.toggleVisibility}
            />
          </Togglable>

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  )
}

export default App
