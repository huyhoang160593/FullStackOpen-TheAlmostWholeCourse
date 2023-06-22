import { useState } from 'react'
import { addBlog } from 'reducers/blogsReducers'
import { useAppDispatch } from 'store.js'

/**
 * @typedef {Object} Props
 * @property {import("./Togglable").ImperativeObject['toggleVisibility']} [toggleVisibility]
 */

/** @param {Props} props */
const CreateBlogForm = ({ toggleVisibility }) => {
  const dispatch = useAppDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const handleCreateBlog = async (event) => {
    event.preventDefault()
    await dispatch(addBlog({ title, author, url }))
    setTitle('')
    setAuthor('')
    setUrl('')
    toggleVisibility(false)
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
