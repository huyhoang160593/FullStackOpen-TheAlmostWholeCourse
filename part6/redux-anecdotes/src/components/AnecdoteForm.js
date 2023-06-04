import { useDispatch } from 'react-redux';
import { createAnecdote } from 'reducers/anecdoteReducer';

export function AnecdoteForm() {
  const dispatch = useDispatch();
  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const addAnecdote = (event) => {
    event.preventDefault();
    const newAnecdote = event.target.anecdote.value
    dispatch(createAnecdote({anecdote: newAnecdote}))
  }
  return (<>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <div><input name="anecdote" /></div>
      <button>create</button>
    </form>
  </>);
}
