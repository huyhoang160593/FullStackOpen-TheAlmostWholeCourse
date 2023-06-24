import axios from 'axios'

const baseLoginUrl = '/api/login'
const baseUserUrl = '/api/users'

const login = async (credential) => {
  const response = await axios.post(baseLoginUrl, credential)
  return response.data
}

const getAllUsers = async () => {
  const response = await axios.get(baseUserUrl)
  return response.data
}

const userServices = { login, getAllUsers }
export default userServices
