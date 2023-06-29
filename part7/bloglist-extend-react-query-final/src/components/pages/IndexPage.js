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
  /** @type {React.MutableRefObject<import('../Togglable').ImperativeObject>} */
  const blogFormToggleRef = useRef(null)
  console.log(blogFormToggleRef)
  return (
    <>
      <h2 className="text-xl font-bold">create new</h2>
      <Togglable
        buttonLabel="new blog"
        ref={blogFormToggleRef}
        hiddenCancel={true}
      >
        <CreateBlogForm
          toggleRef={blogFormToggleRef}
        />
      </Togglable>
      <div className="divider"></div>
      <section className='flex flex-col gap-4'>
        {blogs &&
          blogs
            .concat()
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => <Blog key={blog.id} blog={blog} />)}
      </section>
    </>
  )
}
