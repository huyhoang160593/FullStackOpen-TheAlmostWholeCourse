import { useState } from "react";
import blogsService from "../services/blogs"
const CreateBlogForm = ({blogs, setBlogs}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const handleCreateBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await blogsService.create({
        title, author, url
      })
      setBlogs(blogs.concat(newBlog))
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
        <input type="text" name="Title" value={title} onChange={({target}) => setTitle(target.value)} />
      </div>
      <div>
        author:
        <input type="text" name="Author" value={author} onChange={({target}) => setAuthor(target.value)} />
      </div>
      <div>
        url:
        <input type="text" name="Url" value={url} onChange={({target}) => setUrl(target.value)}/>
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default CreateBlogForm;
