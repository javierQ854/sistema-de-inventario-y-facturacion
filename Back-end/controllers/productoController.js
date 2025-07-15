const Producto = require("../models/Producto.js");
const Categoria = require("../models/Categoria.js");

exports.crearProducto = async (req, res) => {
  try {
    const nuevo = await Producto.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: "Error al crear producto" });
  }
};

exports.obtenerProductos = async (req, res) => {
  const productos = await Producto.findAll({
    include: [{ model: Categoria, attributes: ["nombre"] }],
  });
  res.json(productos);
};

exports.obtenerProductoPorId = async (req, res) => {
  const { id } = req.params;
  const producto = await Producto.findByPk(id);
  if (!producto) return res.status(404).json({ error: "No encontrado" });
  res.json(producto);
};

exports.actualizarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const actualizado = await Producto.update(req.body, { where: { id } });
    res.json({ message: "Producto actualizado", actualizado });
  } catch (err) {
    res.status(400).json({ error: "Error al actualizar" });
  }
};

exports.eliminarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    await Producto.destroy({ where: { id } });
    res.json({ message: "Producto eliminado" });
  } catch (err) {
    res.status(400).json({ error: "Error al eliminar" });
  }
};
