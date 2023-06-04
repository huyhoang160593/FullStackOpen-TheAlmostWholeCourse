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

const anecdoteServices = {
  getAll,
  createNew
}
export default anecdoteServices