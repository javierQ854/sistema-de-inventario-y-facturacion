import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ProductoForm({ producto, onSuccess }) {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    CategoriaId: "",
  });

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    if (producto) setForm(producto);
    api.get("/categorias").then(res => setCategorias(res.data));
  }, [producto]);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (producto) {
        await api.put(`/productos/${producto.id}`, form);
      } else {
        await api.post("/productos", form);
      }
      onSuccess();
      setForm({ nombre: "", descripcion: "", precio: "", stock: "", CategoriaId: "" });
    } catch (err) {
      alert("Error al guardar");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded">
      <h2 className="text-lg font-semibold mb-2">{producto ? "Editar" : "Nuevo"} Producto</h2>
      <input
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        className="w-full mb-2 p-2 border"
        required
      />
      <input
        name="descripcion"
        value={form.descripcion}
        onChange={handleChange}
        placeholder="Descripción"
        className="w-full mb-2 p-2 border"
      />
      <input
        name="precio"
        type="number"
        value={form.precio}
        onChange={handleChange}
        placeholder="Precio"
        className="w-full mb-2 p-2 border"
        required
      />
      <input
        name="stock"
        type="number"
        value={form.stock}
        onChange={handleChange}
        placeholder="Stock"
        className="w-full mb-2 p-2 border"
        required
      />
      <select
        name="CategoriaId"
        value={form.CategoriaId}
        onChange={handleChange}
        className="w-full mb-2 p-2 border"
        required
      >
        <option value="">Seleccione Categoría</option>
        {categorias.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.nombre}</option>
        ))}
      </select>
      <button className="bg-green-600 text-white py-2 px-4 rounded">
        {producto ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
}
