import Footer from "../components/Footer";
import Header from "../components/Header";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Carrinho de Compras</h1>
        {/* Lista de itens do carrinho */}
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Finalizar Compra
        </button>
      </main>
      <Footer />
    </div>
  );
}