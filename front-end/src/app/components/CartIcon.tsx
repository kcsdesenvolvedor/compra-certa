import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

export default function CartIcon() {
  const { cart } = useCart();
  return (
    <Link href="/cart" className="relative">
      <FaShoppingCart className="text-2xl" />
      {cart.length > 0 && (
        <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1">
          {cart.length}
        </span>
      )}
    </Link>
  );
}