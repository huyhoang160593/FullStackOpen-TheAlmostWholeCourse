import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from 'reducers/anecdoteReducer';

export function AnecdoteList() {
  const dispatch = useDispatch();
  const anecdotes = useSelector(state => state);
  const vote = (id) => {
    dispatch(voteAnecdote(id));
  };
  return (<>
    {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote => <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
    )}
  </>);
}
