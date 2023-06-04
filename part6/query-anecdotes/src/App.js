import { useMutation, useQuery, useQueryClient } from 'react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { appendVote, getAnecdotes } from 'requests';
import queryKeys from 'misc/queryKey';
import { displayNotificationCurried, useNotificationDispatch } from 'NotificationContext';

const App = () => {
  const queryClient = useQueryClient();
  const appendVoteMutation = useMutation(appendVote);
  const displayNotification = displayNotificationCurried(useNotificationDispatch())

  const handleVote = (anecdote) => {
    appendVoteMutation.mutate(
      {
        ...anecdote,
        votes: anecdote.votes + 1,
      },
      {
        onSuccess: (updatedAnecdote) => {
          const anecdotes = queryClient.getQueryData(queryKeys.anecdotes);
          queryClient.setQueryData(
            queryKeys.anecdotes,
            anecdotes.map((anecdote) =>
              anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
            )
          );
          displayNotification(`anecdote '${updatedAnecdote.content}' voted`)
        },
      }
    );
  };

  const result = useQuery(queryKeys.anecdotes, getAnecdotes, {
    retry: false,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>anecdote services not available due to problems in server</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
