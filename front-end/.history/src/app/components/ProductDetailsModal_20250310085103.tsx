import ReactModal from "react-modal";

interface ProductDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product;
}

export default function ProductDetailsModal({ isOpen, onClose, product }: ProductDetailsModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Detalhes do Produto"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover mt-4"
        />
        <p className="mt-4 text-gray-600">{product.description}</p>
        <p className="mt-2 text-xl font-bold">R$ {product.price.toFixed(2)}</p>
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => {
            // Lógica para adicionar ao carrinho
            onClose();
          }}
        >
          Adicionar ao Carrinho
        </button>
        <button
          className="mt-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </ReactModal>
  );
}