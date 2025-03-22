"use client";
import { useCart } from "../../context/CartContext";
import api from "../utils/api";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCartItems } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    const items = cart.map(item => ({
      productId: item.id,
      quantity: item.quantity,
    }));
  
    /* try {
      const response = await api.post('/Purchase/AddPurchase', { items });
      console.log('Compra enviada:', response.data);
      // Limpar o carrinho após a compra
      clearCartItems();
    } catch (error) {
      console.error('Erro ao enviar compra:', error);
    } */
   console.log(items)
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto p-4">
        <h1 className="text-2xl text-zinc-400 font-bold mb-4">Carrinho de Compras</h1>
        {cart.length === 0 ? (
          <p className="text-zinc-400">Seu carrinho está vazio.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl text-zinc-400 font-bold">{item.name}</h2>
                <p className="text-gray-600">R$ {item.price.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity === 1}
                    className="text-zinc-400 bg-gray-200 px-2 py-1 rounded-lg"
                  >
                    -
                  </button>
                  <span className="text-zinc-400 mx-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="text-zinc-400 bg-gray-200 px-2 py-1 rounded-lg"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Remover
                </button>
              </div>
            ))}
            <div className="mt-4">
              <p className="text-xl text-zinc-400 font-bold">Total: R$ {total.toFixed(2)}</p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                onClick={handleCheckout}>
                Finalizar Compra
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}