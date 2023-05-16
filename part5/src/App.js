import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';

import LoginForm from './components/LoginForm';
import CreateBlogForm from './components/CreateBlogForm';
import Notification, { SUCCESS } from './components/Notification';
import Togglable from './components/Togglable';

/**
 * @callback DisplayEvent
 * @param {string} message
 * @param {string} type
 * @param {number} timeout
 * @returns {void}
 */

const defaultNotificationState = {
  type: null,
  message: null,
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    ...defaultNotificationState,
  });
  console.log(user)
  useEffect(() => {
    if (!user) return;
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  /** @type {React.MouseEventHandler<HTMLButtonElement>} */
  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedBlogUser');
    setUser(null);
  };

  /** @type {DisplayEvent} */
  const displayNotification = (message, type = SUCCESS, timeout = 3000) => {
    setNotification({
      message,
      type,
    });
    setTimeout(() => {
      setNotification({
        ...defaultNotificationState,
      });
    }, timeout);
  };
  return (
    <div>
      {!user && (
        <>
          <h2>log in to application</h2>
          <Notification
            message={notification.message}
            type={notification.type}
          />
          <LoginForm
            setUser={setUser}
            displayNotification={displayNotification}
          />
        </>
      )}
      {user && (
        <>
          <h2>blogs</h2>
          <Notification
            message={notification.message}
            type={notification.type}
          />
          <p>
            {user.username} logged in{' '}
            <button onClick={handleLogout}>logout</button>
          </p>

          <h2>create new</h2>
          <Togglable buttonLabel="new blog">
            <CreateBlogForm
              user={user}
              blogs={blogs}
              setBlogs={setBlogs}
              displayNotification={displayNotification}
            />
          </Togglable>

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
