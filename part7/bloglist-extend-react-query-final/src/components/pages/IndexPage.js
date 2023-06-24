import { useRef } from 'react'
import Blog from '../Blog'
import blogService from '../../services/blogs'
import CreateBlogForm from '../CreateBlogForm'
import Togglable from '../Togglable'
import { useQuery } from 'react-query'
import { queryKeys } from 'misc/queryKeys'
import { useLoginUserValue } from 'contexts/LoginUserContext'

export function IndexPage() {
  const user = useLoginUserValue()

  /** @type {import('react').MutableRefObject<import('../Togglable').ImperativeObject>} */
  const blogFormToggleRef = useRef()

  const result = useQuery(queryKeys.blogs, blogService.getAll, {
    retry: false,
    enabled: !!user,
  })
  /** @type {Blog[]} */
  const blogs = result.data
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
