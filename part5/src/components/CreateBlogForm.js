import { useState } from 'react';
import blogsService from '../services/blogs';

/**
 * @typedef {Object} Props
 * @property {import("./Blog").Blog[]} blogs
 * @property {import("./Blog").User} user
 * @property {React.Dispatch<React.SetStateAction<never[]>>} setBlogs
 * @property {import("../App").DisplayEvent} displayNotification
 */

/** @param {Props} props */
const CreateBlogForm = ({ user, blogs, setBlogs, displayNotification }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const handleCreateBlog = async (event) => {
    event.preventDefault();

    try {
      const newBlog = await blogsService.create({
        title,
        author,
        url,
      });
      newBlog.user = {
        name: user.name,
        username: user.username,
      };
      setBlogs(blogs.concat(newBlog));
      displayNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`
      );
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (exception) {
      // TODO: add exception if request failed
    }
  };
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
  );
};

export default CreateBlogForm;
