import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-4">
          <a href="https://github.com/seu-usuario" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-2xl hover:text-blue-400" />
          </a>
          <a href="https://linkedin.com/in/seu-usuario" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-2xl hover:text-blue-400" />
          </a>
          <a href="https://instagram.com/seu-usuario" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-2xl hover:text-blue-400" />
          </a>
        </div>
        <p className="mt-4 text-sm">© 2023 Compra Certa. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}