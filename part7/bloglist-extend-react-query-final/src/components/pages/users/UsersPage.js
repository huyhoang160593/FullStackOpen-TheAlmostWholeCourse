import { queryKeys } from 'misc/queryKeys'
import { routerPaths } from 'misc/router'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import userServices from 'services/users'

export function UsersPage() {
  const result = useQuery(queryKeys.users, userServices.getAllUsers)
  if (result.isLoading) {
    return <section>Data is loading...</section>
  }
  /** @type {User[]} */
  const users = result.data
  return (
    <>
      <h2 className='text-xl font-bold'>users</h2>
      <table>
        <thead>
          <tr>
            <th />
            <th>blog created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td><Link to={`${routerPaths.USERS}/${user.id}`} >{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
