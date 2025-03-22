import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "http://localhost:5062/api", // URL da API .NET
});

export default api;