import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

interface CartIconProps {
  itemCount: number;
}

export default function CartIcon({ itemCount }: CartIconProps) {
  return (
    <Link href="/cart" className="relative">
      <FaShoppingCart className="text-2xl" />
      {itemCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1">
          {itemCount}
        </span>
      )}
    </Link>
  );
}