const Categoria = require("../models/Categoria.js");

exports.crearCategoria = async (req, res) => {
  try {
    const nueva = await Categoria.create(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(400).json({ error: "Error al crear categoría" });
  }
};

exports.obtenerCategorias = async (req, res) => {
  const categorias = await Categoria.findAll();
  res.json(categorias);
};
