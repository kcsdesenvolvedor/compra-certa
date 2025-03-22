import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "https://localhost:7284/api", // URL da API .NET
});

export default api;