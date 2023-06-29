import {
  useLoginUserDispatch,
  logoutCurried,
} from 'contexts/LoginUserContext'
import { routerPaths } from 'misc/router'
import { Link } from 'react-router-dom'
import MdiMenu from './svgs/MdiMenu'

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
  const logoutApp = logoutCurried(dispatch)

  /** @type {readonly MenuItem[]} */
  const menuItems = [
    { title: 'users', to: routerPaths.USERS },
    { title: 'blogs', to: routerPaths.INDEX },
  ]

  /** @type {React.MouseEventHandler<HTMLButtonElement>} */
  const handleLogout = (event) => {
    event.preventDefault()
    logoutApp()
  }

  return (
    <header className="bg-base-100">
      <nav className="navbar bg-base-100">
        <section className="navbar-start">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <MdiMenu />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItems.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <Link to={routerPaths.INDEX} className='lg:flex btn btn-ghost bg-transparent hover:bg-transparent normal-case text-xl no-animation'>blog app</Link>
        </section>

        <section className="navbar-center hidden lg:flex">
          <ul className='menu menu-horizontal px-1'>
            {menuItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="navbar-end flex items-center">
          <span><strong>{user.username}</strong> logged in</span>
          <button className="btn btn-outline btn-error btn-sm" onClick={handleLogout}>
            logout
          </button>
        </section>
      </nav>
    </header>
  )
}
