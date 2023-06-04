import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from 'reducers/anecdoteReducer';
import { displayNotification, removeNotification } from 'reducers/notificationReducer';

export function AnecdoteList() {
  const dispatch = useDispatch();
  const anecdotes = useSelector(state => {
    const anecdotesSort = [...state.anecdotes].sort((a, b) => b.votes - a.votes)
    if(!state.filter || state.filter === '') {
      return anecdotesSort
    }
    return anecdotesSort.filter(anecdote => anecdote.content.includes(state.filter))
  });
  const vote = (anecdotesObject) => {
    dispatch(voteAnecdote(anecdotesObject));
    dispatch(displayNotification(`you voted '${anecdotesObject.content}'`))
    setTimeout(() =>{
      dispatch(removeNotification())
    }, 5000)
  };
  return (<>
    {anecdotes.map(anecdote => <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
    )}
  </>);
}
