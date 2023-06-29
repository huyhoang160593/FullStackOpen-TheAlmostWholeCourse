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
 * @property {React.MutableRefObject<import('./Togglable').ImperativeObject>} [toggleRef]
 */

/** @param {Props} props */
const CreateBlogForm = ({ toggleRef }) => {
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
          if(toggleRef.current) toggleRef.current.toggleVisibility(false)
        },
      }
    )

    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <form onSubmit={handleCreateBlog} className='flex flex-col gap-4'>
      <fieldset>
        <label htmlFor="title" className='label'>
          <span className='label-text'>title</span>
        </label>
        <input
          type="text"
          id='title'
          name="title"
          className='input input-bordered'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="author" className='label'>
          <span className='label-text'>author</span>
        </label>
        <input
          type="text"
          id='author'
          name="author"
          className='input input-bordered'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="url" className='label'>
          <span className='label-text'>url</span>
        </label>
        <input
          type="text"
          id='url'
          name="url"
          className='input input-bordered'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </fieldset>
      <fieldset className='flex gap-2'>
        <button className='btn btn-success' type="submit">
          create
        </button>
        <button type='button' className='btn btn-outline btn-secondary' onClick={(event) => {
          event.preventDefault()
          console.log(toggleRef.current)
          if(toggleRef.current) toggleRef.current.toggleVisibility(false)
        }}>cancel</button>
      </fieldset>
    </form>
  )
}

export default CreateBlogForm
