import queryKeys from "misc/queryKey"
import { asObject } from "misc/utilities"
import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "requests"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(asObject(content), {
      onSuccess: (newAnecdote) => {
        const anecdotes = queryClient.getQueryData(queryKeys.anecdotes)
        queryClient.setQueryData(queryKeys.anecdotes, anecdotes.concat(newAnecdote))
      }
    })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
