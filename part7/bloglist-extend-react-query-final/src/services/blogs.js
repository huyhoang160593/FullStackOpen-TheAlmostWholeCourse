import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  /** @type {import('axios').RawAxiosRequestConfig<any>} */
  const config = {
    headers: {
      Authorization: token,
    },
  }
  /** @type {Promise<import('axios').AxiosResponse<Blog[]>>} */
  const request = axios.get(baseUrl, config)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  /** @type {import('axios').RawAxiosRequestConfig<any>} */
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const put = async (id, newObject) => {
  /** @type {import('axios').RawAxiosRequestConfig<any>} */
  const config = {
    headers: {
      Authorization: token,
    },
  }

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const deleteItem = async (id) => {
  /** @type {import('axios').RawAxiosRequestConfig<any>} */
  const config = {
    headers: {
      Authorization: token,
    },
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

/**
 * @param {string} blogId
 * @param {Pick<BlogComment, 'content'>} commentObject
 */
const addCommentToBlog = async (blogId, commentObject) => {
  /** @type {import('axios').RawAxiosRequestConfig<any>} */
  const config = {
    headers: {
      Authorization: token,
    },
  }

  /** @type {import('axios').AxiosResponse<RawBlog>} */
  const response = await axios.post(
    `${baseUrl}/${blogId}/comment`,
    commentObject,
    config
  )
  return response.data
}

const blogsServices = { getAll, create, setToken, put, deleteItem, addCommentToBlog }
export default blogsServices
