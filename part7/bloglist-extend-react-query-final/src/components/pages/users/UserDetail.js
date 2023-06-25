import { routerPaths } from 'misc/router'
import { Navigate } from 'react-router-dom'

/**
 * @typedef {Object} Props
 * @property {User} user
 */

/** @param {Props} props */
export function UserDetail({ user }) {
  if (!user) return <Navigate to={routerPaths.USERS} />
  return (
    <section>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </section>
  )
}
