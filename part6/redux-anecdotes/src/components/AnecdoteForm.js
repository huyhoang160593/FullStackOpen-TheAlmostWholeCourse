import { useDispatch } from 'react-redux';
import { createAnecdote } from 'reducers/anecdoteReducer';
import { setNotification } from 'reducers/notificationReducer';

export function AnecdoteForm() {
  const dispatch = useDispatch();
  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const addAnecdote = async (event) => {
    event.preventDefault();
    const newAnecdoteContent = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(newAnecdoteContent))
    dispatch(setNotification(`new anecdote '${newAnecdoteContent}'`))
  }
  return (<>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <div><input name="anecdote" /></div>
      <button>create</button>
    </form>
  </>);
}
