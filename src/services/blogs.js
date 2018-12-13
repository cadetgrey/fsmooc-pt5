import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (newBlog) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': token
  }
  const res = await axios.post(baseUrl, newBlog, { headers: headers })
  return res.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default { getAll, create, setToken }