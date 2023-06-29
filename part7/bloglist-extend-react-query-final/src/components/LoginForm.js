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
    <form onSubmit={handleLogin} className='flex flex-col gap-4'>
      <fieldset className='form-control'>
        <label htmlFor="username" className='label'>
          <span className='label-text'>username</span>
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className='input input-bordered w-full max-w-xs'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </fieldset>
      <fieldset className='form-control'>
        <label htmlFor="password" className='label'>
          <span className='label-text'>password</span>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className='input input-bordered w-full max-w-xs'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </fieldset>
      <fieldset className='card-actions justify-center'>
        <button className='btn btn-primary' name="LoginButton" type="submit">
          login
        </button>
      </fieldset>
    </form>
  )
}

export default LoginForm
