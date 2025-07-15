const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/database");

// Modelos
const User = require("./models/User");
const Categoria = require("./models/Categoria");
const Producto = require("./models/Producto");

// Rutas
const authRoutes = require("./routes/authRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const productoRoutes = require("./routes/productoRoutes");

// Middlewares
app.use(cors());
app.use(express.json());

// Prefijos de rutas
app.use("/api/auth", authRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/productos", productoRoutes);

// Sincronizar base de datos y levantar servidor
sequelize.sync({ alter: true }) // puedes usar { force: true } si deseas limpiar la base
  .then(() => {
    console.log("✅ Base de datos sincronizada");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar con la base de datos:", err);
  });
