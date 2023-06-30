import clsx from 'clsx'
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

  /** @type {import('react-query').UseMutationResult<RawBlog, unknown, [string, Pick<BlogComment, 'content'>], unknown>} */
  const addCommentToBlogMutation = useMutation((variables) =>
    blogsServices.addCommentToBlog(...variables)
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

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  function onAddCommentSubmitHandle(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const commentObject = /** @type {Pick<BlogComment, 'content'>} */ (
      Object.fromEntries(formData.entries())
    )
    event.currentTarget.reset()
    addCommentToBlogMutation.mutate([blog.id, commentObject], {
      onSuccess: (rawUpdatedBlog) => {
        const injectUser = {
          id: rawUpdatedBlog.user,
          name: user.name,
          username: user.username,
        }
        const updatedBlog = /** @type {Blog}*/ ({
          ...rawUpdatedBlog,
          user: injectUser,
        })
        /** @type {Blog[]} */
        const blogs = queryClient.getQueryData(queryKeys.blogs)
        queryClient.setQueryData(
          queryKeys.blogs,
          blogs.map((currentBlog) =>
            currentBlog.id === updatedBlog.id ? updatedBlog : currentBlog
          )
        )
      },
    })
  }

  return (
    <article className='prose'>
      <h2>{blog.title}</h2>
      <a href={blog.url} target="_blank" rel="noopener noreferrer">
        {blog.url}
      </a>
      <section className='text-info'>
        {blog.likes}
        <button className='btn btn-accent btn-xs' onClick={onLikesClickHandle}>
          likes
        </button>
      </section>
      <section className='italic'>{blog.user.name}</section>
      <button
        className={clsx('btn btn-outline btn-warning btn-md',{ ['invisible']: blog.user.username !== user.username })}
        onClick={onRemoveBlogHandle}
      >
        remove
      </button>
      <div className='divider'></div>
      <h2>comments</h2>
      <form className='flex gap-4' onSubmit={onAddCommentSubmitHandle}>
        <input className='input input-bordered input-accent' type="text" name="content" id="content" />
        <button className='btn glass' type="submit">add comment</button>
      </form>
      <ul>
        {blog.comment.map((item) => (
          <li key={item._id}>{item.content}</li>
        ))}
      </ul>
    </article>
  )
}
