import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useQuery } from 'react-query'
import { queryKeys } from 'misc/queryKeys'
import { getUserFromStorageCurried, logoutCurried, useLoginUserDispatch, useLoginUserValue } from 'contexts/LoginUserContext'

const App = () => {
  const user = useLoginUserValue()
  const dispatch = useLoginUserDispatch()
  /** @type {import('react').MutableRefObject<import('./components/Togglable').ImperativeObject>} */
  const blogFormToggleRef = useRef()
  const getUserFromStorage = getUserFromStorageCurried(dispatch)
  const logoutApp = logoutCurried(dispatch)

  useEffect(() => {
    getUserFromStorage()
  }, [])

  /** @type {React.MouseEventHandler<HTMLButtonElement>} */
  const handleLogout = (event) => {
    event.preventDefault()
    logoutApp()
  }

  const result = useQuery(queryKeys.blogs, blogService.getAll, {
    retry: false,
    enabled: !!user
  })

  /** @type {Blog[]} */
  const blogs = result.data

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
              user={user}
              toggleVisibility={blogFormToggleRef.current?.toggleVisibility}
            />
          </Togglable>

          {blogs && blogs.concat()
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                user={user}
                key={blog.id}
                blog={blog}
              />
            ))}
        </>
      )}
    </div>
  )
}

export default App
