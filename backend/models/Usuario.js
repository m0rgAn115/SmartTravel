const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Usuario = sequelize.define("Usuario", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    estadoSuscripcion: {
        type: DataTypes.STRING,
        defaultValue: "Pendiente"
    }
}, {
    tableName: "Usuarios",
    timestamps: false,
});

module.exports = Usuario;