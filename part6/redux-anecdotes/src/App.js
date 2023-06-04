import { useSelector, useDispatch } from 'react-redux'
import { ACTIONS } from 'reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch({
      type: ACTIONS.VOTE,
      payload: {
        id
      }
    })
  }

  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const addAnecdote = (event) => {
    event.preventDefault();
    console.log(event.target.anecdote.value)
    const newAnecdote = event.target.anecdote.value
    dispatch({
      type: ACTIONS.NEW,
      payload: {
        anecdote: newAnecdote,
      }
    })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App