import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductoForm from "./ProductoForm";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [productoEdit, setProductoEdit] = useState(null);

  const cargarProductos = () => {
    api.get("/productos")
      .then(res => setProductos(res.data))
      .catch(err => console.error("Error al cargar productos:", err));
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleEliminar = async (id) => {
    if (confirm("¿Eliminar este producto?")) {
      await api.delete(`/productos/${id}`);
      cargarProductos();
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Productos</h1>

      <div className="mb-6">
        <ProductoForm
          producto={productoEdit}
          onSuccess={() => {
            cargarProductos();
            setProductoEdit(null);
          }}
        />
      </div>

      <table className="w-full border text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Precio</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Categoría</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.nombre}</td>
              <td className="p-2">${p.precio}</td>
              <td className="p-2">{p.stock}</td>
              <td className="p-2">{p.Categoria?.nombre}</td>
              <td className="p-2">
                <button
                  onClick={() => setProductoEdit(p)}
                  className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleEliminar(p.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
