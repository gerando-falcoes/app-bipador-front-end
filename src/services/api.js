import axios from 'axios';
const nuvem = 'https://coletor-api.azurewebsites.net/'
// const local = 'http://localhost:3000'

const api = axios.create({
  baseURL: nuvem
});

export default api;