import Product from "@/Models/Product";
import Purchase from "@/Models/Purchase";
import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "https://localhost:7284", // URL da API .NET
});

export default api;