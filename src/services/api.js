import axios from 'axios'
const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'https://dev-coletor-api.azurewebsites.net/'
    : 'https://coletor-api.azurewebsites.net/'

console.log('ENV ->', process.env.NODE_ENV)
const api = axios.create({
  baseURL,
})

export default api
