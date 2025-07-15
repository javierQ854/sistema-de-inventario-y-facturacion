import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export default function Navbar() {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <div className="flex gap-4">
        <Link to="/productos" className="hover:underline">Productos</Link>
        <Link to="/categorias" className="hover:underline">Categorías</Link>
      </div>
      <div>
        {usuario && (
          <>
            <span className="mr-4">👋 {usuario.nombre}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
