import { useDispatch } from 'react-redux';
import { createAnecdote } from 'reducers/anecdoteReducer';
import anecdoteServices from 'services/anecdote';

export function AnecdoteForm() {
  const dispatch = useDispatch();
  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const addAnecdote = async (event) => {
    event.preventDefault();
    const newAnecdoteContent = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdoteObject = await anecdoteServices.createNew(newAnecdoteContent)
    dispatch(createAnecdote(newAnecdoteObject))
  }
  return (<>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <div><input name="anecdote" /></div>
      <button>create</button>
    </form>
  </>);
}
