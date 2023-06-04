import ky from "ky";
import { asObject } from "misc/utilities";

const baseURL = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const response = await ky.get(baseURL).json()
  return response
}

const createNew = async (content) => {
  const object = asObject(content)
  const response = await ky.post(baseURL, {
    json: object
  }).json()
  return response
}

const appendVote = async(anecdoteObject) => {
  const newAnecdoteObject = {
    ...anecdoteObject,
    votes: anecdoteObject.votes + 1
  }
  const response = await ky.put(`${baseURL}/${anecdoteObject.id}`, {
    json: newAnecdoteObject
  }).json()
  return response
}

const anecdoteServices = {
  getAll,
  createNew,
  appendVote
}
export default anecdoteServices