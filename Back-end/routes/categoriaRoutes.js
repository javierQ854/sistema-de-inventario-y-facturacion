const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware.js");
const { crearCategoria, obtenerCategorias } = require("../controllers/categoriaController.js");

router.post("/", auth, crearCategoria);
router.get("/", auth, obtenerCategorias);

module.exports = router;
