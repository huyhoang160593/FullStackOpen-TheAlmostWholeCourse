import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  /** @type {import('axios').RawAxiosRequestConfig<any>} */
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  /** @type {import('axios').RawAxiosRequestConfig<any>} */
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const put = async (id, newObject) => {
  /** @type {import('axios').RawAxiosRequestConfig<any>} */
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, put }