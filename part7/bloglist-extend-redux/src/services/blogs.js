import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

/**
 * @param {string} token
 * @returns {import('axios').RawAxiosRequestConfig<any>}
 * */
const generateConfig = (token) =>  ({
  headers: {
    Authorization: token
  }
})

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl, generateConfig(token))
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, generateConfig(token))
  return response.data
}

const put = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject, generateConfig(token))
  return response.data
}

const deleteItem = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, generateConfig(token))
}

const blogServices = { getAll, create, setToken, put, deleteItem }
export default blogServices