const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ nombre, email, password: hashed });
    res.status(201).json({ message: "Usuario creado" });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "No existe el usuario" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Credenciales inválidas" });

    const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, user: { id: user.id, nombre: user.nombre, rol: user.rol } });
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};
