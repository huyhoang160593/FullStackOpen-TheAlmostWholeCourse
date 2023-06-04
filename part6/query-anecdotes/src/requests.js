import ky from "ky";

const baseURL = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => {
  return ky.get(baseURL).json()
}

export const createAnecdote = (newAnecdote) => ky.post(baseURL, {
  json: newAnecdote
}).json()