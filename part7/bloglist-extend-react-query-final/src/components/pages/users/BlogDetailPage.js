import { useLoginUserValue } from 'contexts/LoginUserContext'
import { mutationKeys } from 'misc/mutaionKeys'
import { queryKeys } from 'misc/queryKeys'
import { routerPaths } from 'misc/router'
import { useQueryClient, useMutation } from 'react-query'
import { redirect, Navigate } from 'react-router-dom'
import blogsServices from 'services/blogs'

/**
 * @typedef {Object} Props
 * @property {Blog} blog
 * */

/** @param {Props} props*/
export function BlogDetailPage({ blog }) {
  if (!blog) {
    return <Navigate to={routerPaths.INDEX} />
  }

  const user = useLoginUserValue()
  const queryClient = useQueryClient()
  /** @type {import('react-query').UseMutationResult<any, unknown, [string, Pick<Blog, 'author' | 'likes' | "title" | "url">], unknown>} */
  const updateBlogMutation = useMutation(
    (variables) => blogsServices.put(...variables),
    { mutationKey: [mutationKeys.updateBlog] }
  )

  const deleteBlogMutation = useMutation(blogsServices.deleteItem)
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
              currentBlog.id === updatedBlog.id ? updatedBlog : currentBlog
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
          queryClient.setQueryData(
            queryKeys.blogs,
            blogs.filter((currentBlog) => currentBlog.id !== blog.id)
          )
          redirect(routerPaths.INDEX)
        },
      })
    }
  }

  return (
    <>
      <h2>{blog.title}</h2>
      <a href={blog.url} target="_blank" rel="noopener noreferrer">
        {blog.url}
      </a>
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
            blog.user.username === user.username ? 'visible' : 'hidden',
        }}
        onClick={onRemoveBlogHandle}
      >
        remove
      </button>
    </>
  )
}
