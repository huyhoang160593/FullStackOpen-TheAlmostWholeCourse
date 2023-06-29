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
    <section className='mx-4 lg:mx-40 xl:mx-80'>
      <h2 className='text-xl font-bold'>create new</h2>
      <Togglable buttonLabel="new blog" ref={blogFormToggleRef} hiddenCancel={true}>
        <CreateBlogForm
          toggleVisibility={blogFormToggleRef.current?.toggleVisibility}
        />
      </Togglable>
      <div className="divider"></div>
      {blogs &&
        blogs
          .concat()
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => <Blog key={blog.id} blog={blog} />)}
    </section>
  )
}
