import { useLoginUserValue } from 'contexts/LoginUserContext'
import {
  NotificationTypes,
  displayNotificationCurried,
  useNotificationDispatch,
} from 'contexts/NotificationContext'
import { queryKeys } from 'misc/queryKeys'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import blogsServices from 'services/blogs'

/**
 * @typedef {Object} Props
 * @property {() => void} [toggleVisibility]
 */

/** @param {Props} props */
const CreateBlogForm = ({ toggleVisibility }) => {
  const user = useLoginUserValue()
  const queryClient = useQueryClient()
  const createBlogMutation = useMutation(blogsServices.create)
  const displayNotification = displayNotificationCurried(
    useNotificationDispatch()
  )

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const handleCreateBlog = async (event) => {
    event.preventDefault()
    createBlogMutation.mutate(
      { title, author, url },
      {
        onSuccess: (createdBlog) => {
          const injectUser = {
            id: createdBlog.user,
            name: user.name,
            username: user.username,
          }
          createdBlog.user = injectUser
          /** @type {Blog[]} */
          const blogs = queryClient.getQueryData(queryKeys.blogs)
          queryClient.setQueryData(queryKeys.blogs, blogs.concat(createdBlog))
          displayNotification({
            type: NotificationTypes.SUCCESS,
            message: `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
          })
          toggleVisibility()
        },
      }
    )

    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <form onSubmit={handleCreateBlog}>
      <div>
        title:
        <input
          type="text"
          name="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          name="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          name="Url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button name="createButton" type="submit">
        create
      </button>
    </form>
  )
}

export default CreateBlogForm
