import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Compra Certa</h1>
          <p className="text-sm">Sua loja online confiável</p>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-blue-200">
                Início
              </Link>
            </li>
            <li>
              <Link href="/my-purchases" className="hover:text-blue-200">
                Minhas Compras
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-blue-200">
                <FaShoppingCart className="text-2xl" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}