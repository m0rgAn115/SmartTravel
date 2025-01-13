const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Usuario = require("./Usuario");
const Paquete = require("./Paquete");

const Reservacion = sequelize.define("Reservacion", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fechaReservacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    estadoReservacion: {
        type: DataTypes.STRING, // "Pendiente", "Confirmada", "Cancelada"
        defaultValue: "Pendiente",
    },
}, {
    tableName: "Reservaciones",
    timestamps: false,
});

Usuario.hasMany(Reservacion, { foreignKey: "idUsuario" });
Paquete.hasMany(Reservacion, { foreignKey: "idPaquete" });
Reservacion.belongsTo(Usuario, { foreignKey: "idUsuario" });
Reservacion.belongsTo(Paquete, { foreignKey: "idPaquete" });

module.exports = Reservacion;