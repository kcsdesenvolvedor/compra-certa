import PurchaseProduct from "@/Models/PurchaseProduct";

interface PurchaseStatusProps {
    purchase: PurchaseProduct;
}

export default function PurchaseStatus({ purchase }: PurchaseStatusProps) {

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
  
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  const infoPurchase = (): string => {
    switch (purchase.status) {
      case 'Pendente':
        return 'Sua compra está aguardando pagamento';
      case 'Processando':  
        return 'Sua compra está sendo processada';
      case 'Aprovada':
        return 'Sua compra foi aprovada e está sendo preparada para envio'; 
      default:
        return 'Sua compra foi enviada';
    }
  };

    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-zinc-600 font-semibold mb-2">{formatDate(purchase.createdAt)}</h3>
        <hr />
        <h2 className="text-xl text-zinc-400 font-bold mt-2">{purchase.status}</h2>
        <h2 className="text-zinc-600">{infoPurchase()}</h2>
        <div className="flex flex-col mt-2">
          {purchase.purchaseProducts.map((product) => (
            <div key={product.productId} className="bg-white p-4">
              <h2 className="text-xl text-zinc-400 font-bold">{product.product.name}</h2>
              <div className="flex items-center mt-2">
                <span className="text-zinc-400 mx-2">{product.quantity} un.</span>
                <p className="text-gray-600">R$ {product.product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }