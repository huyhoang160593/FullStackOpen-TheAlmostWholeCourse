import { useState } from 'react'

/**
 * @typedef {Object} Props
 * @property {Function} createBlogHandle
 * @property {() => void} [toggleVisibility]
 */

/** @param {Props} props */
const CreateBlogForm = ({ toggleVisibility, createBlogHandle }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      await createBlogHandle({ title, author, url })
      toggleVisibility()
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      // TODO: add exception if request failed
    }
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
      <button type="submit">create</button>
    </form>
  )
}

export default CreateBlogForm
