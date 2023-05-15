import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) return
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [user]);

  return (
    <div>
      {!user && <LoginForm setUser={setUser} />}
      {user && (
        <>
          <h2>blogs</h2>
          <p>{user.username} logged in</p>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;