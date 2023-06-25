import { useState } from 'react'
import {
  NotificationTypes,
  displayNotificationCurried,
  useNotificationDispatch,
} from 'contexts/NotificationContext'
import {
  loginToBlogCurried,
  useLoginUserDispatch,
} from 'contexts/LoginUserContext'

const LoginForm = () => {
  const displayNotification = displayNotificationCurried(
    useNotificationDispatch()
  )
  const userLogin = loginToBlogCurried(useLoginUserDispatch())
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const handleLogin = async (event) => {
    event.preventDefault()
    const error = await userLogin({ username, password })
    setUsername('')
    setPassword('')
    if (error) {
      displayNotification({
        type: NotificationTypes.ERROR,
        message: 'wrong username or password',
      })
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          name="Username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          name="Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button name="LoginButton" type="submit">
        login
      </button>
    </form>
  )
}

export default LoginForm
