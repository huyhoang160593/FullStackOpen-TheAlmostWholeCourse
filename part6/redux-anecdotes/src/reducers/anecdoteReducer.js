import { createSlice } from "@reduxjs/toolkit"
import anecdoteServices from "services/anecdote"

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const id = action.payload.id
      return state.map(anecdote => anecdote.id !== id ? anecdote : action.payload)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(_state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, setAnecdotes, updateAnecdote} = anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (anecdoteContent) => {
  return async dispatch => {
    const anecdoteObject = await anecdoteServices.createNew(anecdoteContent)
    dispatch(appendAnecdote(anecdoteObject))
  }
}
export const voteAnecdote = (anecdoteObject) => {
  return async dispatch => {
    const updatedAnecdoteObject = await anecdoteServices.appendVote(anecdoteObject)
    dispatch(updateAnecdote(updatedAnecdoteObject))
  }
}
export default anecdotesSlice.reducer;