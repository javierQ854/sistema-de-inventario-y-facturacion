import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState("");

  const cargarCategorias = () => {
    api.get("/categorias").then((res) => setCategorias(res.data));
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) return alert("Nombre requerido");

    try {
      await api.post("/categorias", { nombre });
      setNombre("");
      cargarCategorias();
    } catch (err) {
      alert("Error al crear categoría");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Categorías</h1>

      <form onSubmit={handleSubmit} className="mb-6 flex gap-4 items-center">
        <input
          type="text"
          placeholder="Nueva categoría"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Crear
        </button>
      </form>

      <table className="w-full border text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Nombre</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((cat) => (
            <tr key={cat.id} className="border-t">
              <td className="p-2">{cat.id}</td>
              <td className="p-2">{cat.nombre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
