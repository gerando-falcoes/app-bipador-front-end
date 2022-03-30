import axios from 'axios';
// const nuvem = 'https://api-bipador.azurewebsites.net'
const local = 'http://localhost:3000'

const api = axios.create({
  baseURL: local
});

export default api;