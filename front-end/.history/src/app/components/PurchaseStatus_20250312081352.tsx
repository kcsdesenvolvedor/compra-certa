import Purchase from "@/Models/Purchase";

interface PurchaseStatusProps {
    purchase: Purchase;
}

export default function PurchaseStatus({ purchase }: PurchaseStatusProps) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl text-zinc-400 font-bold">{purchase.productName}</h2>
        <p className="text-gray-600">Status: {purchase.status}</p>
      </div>
    );
  }