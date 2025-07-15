const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const Categoria = require("./Categoria.js");

const Producto = sequelize.define("Producto", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: { 
        type: DataTypes.STRING 
    },
    precio: { 
        type: DataTypes.FLOAT, 
        allowNull: false 
    },
    stock: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
});

// Relación: Un producto pertenece a una categoría
Producto.belongsTo(Categoria, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE",
});
Categoria.hasMany(Producto);

module.exports = Producto;
