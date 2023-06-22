import { useState } from 'react'
import blogsServices from '../services/blogs'
import { useQueryClient, useMutation } from 'react-query'
import { queryKeys } from 'misc/queryKeys'

/**
 * @typedef {Object} Props
 * @property {Blog} blog
 * @property {User} user
 * */

/** @param {Props} props */
const Blog = ({ blog, user }) => {
  const queryClient = useQueryClient()
  /** @type {import('react-query').UseMutationResult<any, unknown, [string, Pick<Blog, 'author' | 'likes' | "title" | "url">], unknown>} */
  const updateBlogMutation = useMutation((variables) =>
    blogsServices.put(...variables)
  )
  const deleteBlogMutation = useMutation(blogsServices.deleteItem)

  const [toggle, setToggle] = useState(false)
  /** @type {import('react').CSSProperties} */
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  /** @type {React.MouseEventHandler<HTMLButtonElement>} */
  const onLikesClickHandle = async (event) => {
    event.preventDefault()
    updateBlogMutation.mutate(
      [
        blog.id,
        {
          likes: blog.likes + 1,
          author: blog.author,
          title: blog.title,
          url: blog.url,
        },
      ],
      {
        onSuccess: (updatedBlog) => {
          const injectUser = {
            id: updatedBlog.user,
            name: user.name,
            username: user.username,
          }
          updatedBlog.user = injectUser
          /** @type {Blog[]} */
          const blogs = queryClient.getQueryData(queryKeys.blogs)
          queryClient.setQueryData(
            queryKeys.blogs,
            blogs.map((currentBlog) =>
              currentBlog.id !== updatedBlog.id ? currentBlog : updatedBlog
            )
          )
        },
      }
    )
  }

  /** @type {React.MouseEventHandler<HTMLButtonElement>} */
  const onRemoveBlogHandle = async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id, {
        onSuccess: () => {
          /** @type {Blog[]} */
          const blogs = queryClient.getQueryData(queryKeys.blogs)
          queryClient.setQueryData(queryKeys.blogs, blogs.filter((currentBlog) => currentBlog.id !== blog.id))
        }
      })
    }
  }

  return (
    <div aria-label="blogContainer" style={blogStyle}>
      <section aria-label="blogTitleAuthor">
        {blog.title} {blog.author}
        <button onClick={() => setToggle(!toggle)}>
          {toggle ? 'hide' : 'view'}
        </button>
      </section>
      {toggle && (
        <>
          <section aria-label="blogURL">{blog.url}</section>
          <section aria-label="blogLikes">
            {blog.likes}
            <button name="LikeButton" onClick={onLikesClickHandle}>
              likes
            </button>
          </section>
          <section aria-label="blogUserName">{blog.user.name}</section>
          <button
            name="RemoveButton"
            style={{
              backgroundColor: 'blue',
              color: 'white',
              visibility:
                blog.user.username === user?.username ? 'visible' : 'hidden',
            }}
            onClick={onRemoveBlogHandle}
          >
            remove
          </button>
        </>
      )}
    </div>
  )
}

export default Blog
