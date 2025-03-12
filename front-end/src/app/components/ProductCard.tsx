"use client";
import { useState } from "react";
import ProductDetailsModal from "./ProductDetailsModal";
import Product from "@/Models/Product";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();

  return (
    <>
      <div
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-contain"
        />
        <div className="p-4">
          <h2 className="text-xl text-zinc-400 font-bold">{product.name}</h2>
          <p className="text-gray-600 font-bold">R$ {product.price.toFixed(2)}</p>
          <button
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={(e) => {
              e.stopPropagation(); // Evita abrir o modal ao clicar no botão
              addToCart(product);
            }}
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
      <ProductDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
      />
    </>
  );
}