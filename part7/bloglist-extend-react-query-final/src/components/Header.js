import { useLoginUserDispatch, getUserFromStorageCurried, logoutCurried } from 'contexts/LoginUserContext'
import { routerPaths } from 'misc/router'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

/**
 * @typedef {Object} MenuItem
 * @property {string} to
 * @property {string} title
 */

/**
 * @typedef {Object} Props
 * @property {LoginUser} user
 *  */

/** @param {Props} props */
export function Header({ user }) {
  const dispatch = useLoginUserDispatch()
  const getUserFromStorage = getUserFromStorageCurried(dispatch)
  const logoutApp = logoutCurried(dispatch)

  useEffect(() => {
    getUserFromStorage()
  }, [])

  /** @type {readonly MenuItem[]} */
  const menuItems = [
    { title: 'users', to: routerPaths.USERS },
    { title: 'blogs', to: routerPaths.INDEX }
  ]

  /** @type {React.MouseEventHandler<HTMLButtonElement>} */
  const handleLogout = (event) => {
    event.preventDefault()
    logoutApp()
  }

  return (
    <header>
      {menuItems.map((item) => (
        <Link key={item.to} to={item.to}>
          {item.title}
        </Link>
      ))}
      <span>{user.username} logged in <button onClick={handleLogout}>logout</button></span>
    </header>
  )
}
