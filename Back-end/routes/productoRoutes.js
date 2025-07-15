const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware.js");
const {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers/productoController.js");

router.post("/", auth, crearProducto);
router.get("/", auth, obtenerProductos);
router.get("/:id", auth, obtenerProductoPorId);
router.put("/:id", auth, actualizarProducto);
router.delete("/:id", auth, eliminarProducto);

module.exports = router;
