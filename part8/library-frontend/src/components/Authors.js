import { useCallback } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { EDIT_AUTHOR } from "apollo/mutaions"
import { ALL_AUTHOR } from "apollo/queries"

/** @typedef {import('apollo/mutaions').EditAuthorVariables} EditAuthorVariables */

const Authors = (props) => {
  /** @type {import('@apollo/client').QueryResult<import('apollo/queries').AllAuthorsResult>} */
  const result = useQuery(ALL_AUTHOR)

  /** @type {import('@apollo/client').MutationTuple<any, EditAuthorVariables} */
  const [updateAuthor] = useMutation(EDIT_AUTHOR)

  const onUpdateAuthorHandle = useCallback(
  /** @type {React.FormEventHandler<HTMLFormElement>} */((event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const updateAuthorVariables = /** @type {Record<keyof EditAuthorVariables, string>} */ (Object.fromEntries(formData.entries()))
    updateAuthor({variables: {
      name: updateAuthorVariables.name,
      setBornTo: Number(updateAuthorVariables.setBornTo)
    }})
  }),[updateAuthor])

  if (!props.show || result.loading) {
    return null
  }
  const authors = result.data.allAuthors
  return (
    <div>
      <section>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section>
        <h2>Set birthyear</h2>
        <form onSubmit={onUpdateAuthorHandle}>
          <fieldset>
            <legend>Update author</legend>
            <label htmlFor="name">name</label><input id="name" name="name" type="text" />
            <br />
            <label htmlFor="setBornTo">born</label><input id="setBornTo" name="setBornTo" type="number" />
            <br />
            <button type="submit">update author</button>
          </fieldset>
        </form>
      </section>
    </div>
  )
}

export default Authors
