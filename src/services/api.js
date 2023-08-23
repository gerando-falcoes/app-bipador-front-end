import axios from 'axios'

const baseURL = process.env.REACT_APP_URL ?? 'http://localhost:3000'

const api = axios.create({
  baseURL,
})

export default api
