import axios from "axios";
const baseURL = "https://coletor-api.azurewebsites.net/";
// const baseURL = "http://localhost:3000";

const api = axios.create({
  baseURL,
});

export default api;
