'use client';
import { useEffect, useState } from "react";
import PurchaseStatus from "../components/PurchaseStatus";
import api from "../utils/api";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import PurchaseProduct from "@/Models/PurchaseProduct";

export default function MyPurchasesPage() {
  const [purchases, setPurchases] = useState<PurchaseProduct[]>([]);

  const fetchPurchases = async () => {
    try {
      const response = await api.get<PurchaseProduct[]>('/Purchase/GetPurchases');
      setPurchases(response.data);
    } catch (error) {
      console.error('Erro ao buscar compras:', error);
    }
  };

  useEffect(() => {
    fetchPurchases();

    // Configura a conexão com o SignalR
    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5062/purchaseHub") // URL do Hub
      .configureLogging(LogLevel.Information) // Habilita logs para depuração
      .build();

    // Inicia a conexão
    connection.start()
      .then(() => console.log("Conectado ao SignalR"))
      .catch(err => console.error("Erro ao conectar ao SignalR:", err));

    // Escuta atualizações de status
    connection.on("PurchaseStatusChanged", (purchaseId: number, newStatus: string) => {
      setPurchases(prevPurchases =>
        prevPurchases.map(purchase =>
          purchase.id === purchaseId ? { ...purchase, status: newStatus } : purchase
        )
      );
    });

    // Limpa a conexão ao desmontar o componente
    return () => {
      connection.stop();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto p-4">
        <h1 className="text-2xl text-zinc-400 font-bold mb-4">Minhas Compras</h1>
        <div className="space-y-4">
          {purchases.map((purchase, index) => (
            <PurchaseStatus key={index} purchase={purchase} />
          ))}
        </div>
      </main>
    </div>
  );
}