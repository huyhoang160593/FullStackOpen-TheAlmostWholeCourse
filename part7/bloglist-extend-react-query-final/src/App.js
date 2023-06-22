import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useQuery } from 'react-query'
import { queryKeys } from 'misc/queryKeys'

const App = () => {
  const [user, setUser] = useState(null)
  /** @type {import('react').MutableRefObject<import('./components/Togglable').ImperativeObject>} */
  const blogFormToggleRef = useRef()

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

  const updateBlogHandle = (_updatedBlog) => {
    // TODO: make update viable later
    // const injectUser = {
    //   id: updatedBlog.user,
    //   name: user.name,
    //   username: user.username,
    // }
    // updatedBlog.user = injectUser
    // setBlogs(
    //   blogs.map((currentBlog) =>
    //     currentBlog.id !== updatedBlog.id ? currentBlog : updatedBlog
    //   )
    // )
  }

  const deleteBlogHandle = (_deletedBlog) => {
    // TODO: make delete blog viable later
    // setBlogs(blogs.filter((currentBlog) => currentBlog.id !== deletedBlog.id))
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

          {blogs && blogs.concat()
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
