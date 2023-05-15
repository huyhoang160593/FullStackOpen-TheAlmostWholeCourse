import { useState } from "react";
import loginService from "./../services/login"
import blogsService from "./../services/blogs"

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.getAll({
        username, password
      })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogsService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      // TODO: add exception later
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username
        <input type="text" name="Username" value={username} onChange={({target}) => setUsername(target.value)}/>
      </div>
      <div>
        password
        <input type="password" name="Password" value={password} onChange={({target}) => setPassword(target.value)}/>
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
