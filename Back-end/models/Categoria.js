const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

const Categoria = sequelize.define("Categoria", {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true },
  nombre: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true },
});

module.exports = Categoria;
