import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const res = await axios.get(baseUrl)
  console.log(res.data)
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

const update = async (id, newBlogObject) => {
  const res = await axios.put(`${baseUrl}/${id}`, newBlogObject)
  return res.data
}

const remove = async (id) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': token
  }
  const res = await axios.delete(`${baseUrl}/${id}`, { headers: headers })
  return res.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default { getAll, create, update, remove, setToken }