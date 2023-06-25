import { useEffect, useMemo } from 'react'
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
import { UsersPage } from 'components/pages/users/UsersPage'
import { UserDetail } from 'components/pages/users/UserDetail'
import { useMatch } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { queryKeys } from 'misc/queryKeys'
import { routerPaths } from 'misc/router'

const App = () => {
  const queryClient = useQueryClient()
  const user = useLoginUserValue()
  const dispatch = useLoginUserDispatch()
  const getUserFromStorage = getUserFromStorageCurried(dispatch)
  const logoutApp = logoutCurried(dispatch)
  const match = useMatch('/users/:id')
  const detailUser = useMemo(() => getDetailUserGuard(), [match])

  useEffect(() => {
    getUserFromStorage()
  }, [])

  /** @type {React.MouseEventHandler<HTMLButtonElement>} */
  const handleLogout = (event) => {
    event.preventDefault()
    logoutApp()
  }

  function getDetailUserGuard () {
    /** @type {User[]} */
    const users = queryClient.getQueryData(queryKeys.users)
    if(match && users) {
      return users.find(user => user.id === match.params.id)
    }
    return null
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
        <Route path={routerPaths.USER_DETAIL} element={<UserDetail user={detailUser} />} />
        <Route path={routerPaths.USERS} element={<UsersPage />} />
        <Route path={routerPaths.INDEX} element={<IndexPage />} />
      </Routes>
    </>
  )
}

export default App
