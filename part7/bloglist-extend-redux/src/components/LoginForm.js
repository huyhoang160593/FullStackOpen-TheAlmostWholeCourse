import { useState } from 'react'
import loginService from './../services/login'
import blogsService from './../services/blogs'
import PropTypes from 'prop-types'
import { ERROR, setNotification } from 'reducers/notificationReducer'
import { useAppDispatch } from 'store.js'

/**
 * @typedef Props
 * @property {React.Dispatch<React.SetStateAction<null>>} setUser
 * */

/** @param {Props} props */
const LoginForm = ({ setUser }) => {
  const dispatch = useAppDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
      dispatch(setNotification({
        type: ERROR,
        message:'wrong username or password'
      }))
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type="text" name="Username" value={username} onChange={({ target }) => setUsername(target.value)}/>
      </div>
      <div>
        password
        <input type="password" name="Password" value={password} onChange={({ target }) => setPassword(target.value)}/>
      </div>
      <button name='LoginButton' type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
}

export default LoginForm
