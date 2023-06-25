import { useRef } from 'react'
import Blog from '../Blog'
import CreateBlogForm from '../CreateBlogForm'
import Togglable from '../Togglable'

/**
 * @typedef {Object} Props
 * @property {Blog[]} blogs
 * */

/** @param {Props} props */
export function IndexPage({ blogs }) {
  /** @type {import('react').MutableRefObject<import('../Togglable').ImperativeObject>} */
  const blogFormToggleRef = useRef()
  return (
    <>
      <h2>create new</h2>
      <Togglable buttonLabel="new blog" ref={blogFormToggleRef}>
        <CreateBlogForm
          toggleVisibility={blogFormToggleRef.current?.toggleVisibility}
        />
      </Togglable>

      {blogs &&
        blogs
          .concat()
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => <Blog key={blog.id} blog={blog} />)}
    </>
  )
}
