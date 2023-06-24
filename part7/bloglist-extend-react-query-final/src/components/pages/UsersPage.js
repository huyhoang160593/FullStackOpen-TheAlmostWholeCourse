import { queryKeys } from 'misc/queryKeys'
import { useQuery } from 'react-query'
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
      <h2>Users</h2>
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
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
