import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import {
  getUserFromStorageCurried,
  logoutCurried,
  useLoginUserDispatch,
  useLoginUserValue,
} from 'contexts/LoginUserContext'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { IndexPage } from 'components/pages/IndexPage'
import { UsersPage } from 'components/pages/UsersPage'

const App = () => {
  const user = useLoginUserValue()
  const dispatch = useLoginUserDispatch()
  const getUserFromStorage = getUserFromStorageCurried(dispatch)
  const logoutApp = logoutCurried(dispatch)

  useEffect(() => {
    getUserFromStorage()
  }, [])

  /** @type {React.MouseEventHandler<HTMLButtonElement>} */
  const handleLogout = (event) => {
    event.preventDefault()
    logoutApp()
  }

  if (!user) {
    return (
      <>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
      </>
    )
  }

  return (
    <>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Routes>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/" element={<IndexPage />} />
      </Routes>
    </>
  )
}

export default App
