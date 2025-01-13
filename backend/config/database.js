require("dotenv").config();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.SMART_TRAVEL_DB_NAME,
    process.env.SMART_TRAVEL_DB_USER,
    process.env.SMART_TRAVEL_DB_PASSWORD,
    {
        host: process.env.SMART_TRAVEL_DB_HOST,
        dialect: "mysql",
        port: process.env.SMART_TRAVEL_DB_PORT
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexion establecida con la base de datos.");
    } catch (error) {
        console.error("Error al conectar o sincronizar: ", error);
    }
})();


module.exports = sequelize;