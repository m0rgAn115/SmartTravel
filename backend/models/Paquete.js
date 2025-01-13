const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Paquete = sequelize.define("Paquete", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
    },
    lugares: {
        type: DataTypes.TEXT,
    },
    hospedaje: {
        type: DataTypes.TEXT,
    },
    fechaSalida: {
        type: DataTypes.DATE
    },
    fechaRegreso: {
        type: DataTypes.DATE,
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    promocion: {
        type: DataTypes.STRING,
        defaultValue: "No Aplica",
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    estado: {
        type: DataTypes.STRING, // "Activo", "Inactivo", "Eliminado"
        defaultValue: "Activo",
    },
    tipoDestino: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen: {
      type: DataTypes.STRING  
    },
    imagenDetalles: {
        type: DataTypes.STRING
    }
}, {
    tableName: "Paquetes",
    timestamps: false,
});

module.exports = Paquete;