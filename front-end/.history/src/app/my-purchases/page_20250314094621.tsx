import { useEffect, useState } from "react";
import PurchaseStatus from "../components/PurchaseStatus";
import api from "../utils/api";


export default function MyPurchasesPage() {
  const [purchases, setPurchases] = useState([]);

  const fetchPurchases = async () => {
    try {
       const response = await api.get('/Purchase/GetPurchases');
       setPurchases(response.data);
    }
    catch (error) {
      console.error('Erro ao buscar compras:', error);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto p-4">
        <h1 className="text-2xl text-zinc-400 font-bold mb-4">Minhas Compras</h1>
        <div className="space-y-4">
          {/* {purchases.map((purchase) => (
            <PurchaseStatus key={purchase.id} purchase={purchase} />
          ))} */}
        </div>
      </main>
    </div>
  );
}