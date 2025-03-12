import PurchaseStatus from "../components/PurchaseStatus";


export default function MyPurchasesPage() {
  const purchases = [
    { id: 1, productName: "Produto 1", status: "Pendente" },
    { id: 2, productName: "Produto 2", status: "Aprovada" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto p-4">
        <h1 className="text-2xl text-zinc-400 font-bold mb-4">Minhas Compras</h1>
        <div className="space-y-4">
          {purchases.map((purchase) => (
            <PurchaseStatus key={purchase.id} purchase={purchase} />
          ))}
        </div>
      </main>
    </div>
  );
}