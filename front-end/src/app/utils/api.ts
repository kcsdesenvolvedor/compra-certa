import Product from "@/Models/Product";
import Purchase from "@/Models/Purchase";
import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // URL da API .NET
});

export const getProducts = (): Promise<Product[]> => axios.get("http://localhost:3333/products").then((response: AxiosResponse<Product[]>) => response.data);

export const addPurchase = (purchase: Purchase) => api.post("/purchases", purchase);

export const getPurchaseStatus = (id: Number) => api.get(`/purchases/${id}`);