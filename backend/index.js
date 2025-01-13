const express = require("express");
const cors = require("cors"); // Importar CORS para manejar solicitudes cruzadas
const app = express();
const multer = require("multer");
const path = require("path");
const puerto = 9999;
// Importar modelos
const Usuario = require("./models/Usuario");
const Paquete = require("./models/Paquete");
const Reservacion = require("./models/Reservacion");

const routes = require('./routes');

// Middleware para manejar solicitudes JSON
app.use(express.json()); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuración de CORS
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// RUTAS PARA PAQUETES
 
// Obtener todos los paquetes
app.get("/paquetes", async (req, res) => {
    try {
        const paquetes = await Paquete.findAll();
        res.status(200).json(paquetes);
    } catch (error) {
        console.error("Error al obtener paquetes:", error);
        res.status(500).json({ status: "error", message: "Error al obtener paquetes" });
    }
});

// Obtener los paquetes dependiendo el tipo
app.get('/paquetes/type', async (req, res) => {
    try {
        const tipo = req.query.tipo;

        const filtros = {};
        if (tipo) {
            filtros.tipoDestino = tipo;
        }

        const paquetes = await Paquete.findAll({
           attributes: ['id', 'nombre', 'descripcion', 'imagen', 'tipoDestino'],
           where: filtros, 
        });

        res.status(200).json(paquetes);

    } catch (error) {
        console.error("Error al obtener los destinos:", error);
        res.status(500).json({ status: 'error', message: 'Error al obtener los destinos' });
    }
});

// Obtener un paquete de detalles
app.get('/paquete/detail', async (req, res) => {
    const id = req.query.id;
    try {
        const destino = await Paquete.findByPk(id, {
            attributes: ['id', 'nombre', 'precio', 'hospedaje', 'lugares', 'fechaSalida', 'fechaRegreso', 'imagenDetalles']
        });

        if (destino) {
            res.status(200).json(destino);
        } else {
            res.status(404).json({ status: "error", message: "Destino no encontrado" });
        }

    } catch (error) {
        console.error("Error al obtener el destino:", error);
        res.status(500).json({ status: 'error', message: 'Error al obtener el destino' });
    }
});

// Obtener un paquete por ID
app.get("/paquete/:id", async (req, res) => {
    try {
        const paquete = await Paquete.findByPk(req.params.id);
        if (paquete) {
            res.status(200).json(paquete);
        } else {
            res.status(404).json({ status: "error", message: "Paquete no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener el paquete: ", error);
        res.status(500).json({ status: "error", message: "Error al obtener paquete" });
    }
});

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Filtro para validar que el archivo sea una imagen
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error("Solo se permiten archivos de imagen"));
    }
};

// Configuración de multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Límite de 5 MB
});

// Crear un nuevo paquete
app.post("/paquete", upload.single("image"), async (req, res) => {
    try {
        const {
            nombre,
            descripcion,
            lugares,
            hospedaje,
            fechaSalida,
            fechaRegreso,
            precio,
            promocion,
            stock,
            estado,
            tipoDestino
        } = req.body;

        if (!nombre || !precio || !stock) {
            return res.status(400).json({ status: "error", message: "Nombre, precio y stock son obligatorios." });
        }

        let imagePath = null;
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }

        const nuevoPaquete = await Paquete.create({
            nombre,
            descripcion,
            lugares,
            hospedaje,
            fechaSalida,
            fechaRegreso,
            precio,
            promocion,
            stock,
            estado,
            tipoDestino,
            imagen: imagePath,
            imagenDetalles: imagePath
        });

        res.status(201).json({ status: "success", message: "Paquete creado exitosamente", paquete: nuevoPaquete });
    } catch (error) {
        console.error("Error al crear el paquete:", error);
        res.status(500).json({ status: "error", message: "Error al crear el paquete" });
    }
});


// Actualizar un paquete por ID
app.put("/paquete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const {
            nombre,
            descripcion,
            lugares,
            hospedaje,
            fechaSalida,
            fechaRegreso,
            precio,
            promocion,
            stock,
            estado,
            tipoDestino
        } = req.body;

        const paquete = await Paquete.findByPk(id);

        if (!paquete) {
            return res.status(404).json({ status: "error", message: "Paquete no encontrado" });
        }

        await paquete.update({
            nombre,
            descripcion,
            lugares,
            hospedaje,
            fechaSalida,
            fechaRegreso,
            precio,
            promocion,
            stock,
            estado,
            tipoDestino
        });

        res.status(200).json({ status: "success", message: "Paquete actualizado exitosamente", paquete });
    } catch(error) {
        console.error("Error al actualizar el paquete:", error);
        res.status(500).json({ status: "error", message: "Error al actualizar el paquete" });
    }
});

// Eliminar un paquete por ID
app.delete("/paquete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const paquete = await Paquete.findByPk(id);

        if (!paquete) {
            return res.status(404).json({ status: "error", message: "Paquete no encontrado" });
        }

        await paquete.destroy();

        return res.status(200).json({ status: "success", message: "Paquete eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar el paquete:", error);
        res.status(500).json({ status: "error", message: "Error al eliminar el paquete" });
    }
});

// RUTAS PARA USUARIOS

// Obtener todos los usuarios
app.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        console.log("Error al obtener usuarios:", error);
        res.status(500).json({ status: "error", message: "Error al obtener usuarios" });
    }
});

// Crear un nuevo usuario
app.post("/usuario", async (req, res) => {
    try {
        const { correo } = req.body;
        if (!correo) {
            return res.status(400).json({ status: "error", message: "Datos incompletos" });
        }
        const nuevoUsuario = await Usuario.create({ correo });
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.log("Error al crear usuario", error);
        res.status(500).json({ status: "error", message: "Error al crear usuario" });
    }
});

// Obtener un usuario por ID
app.get("/usuario/:id", async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ status: "error", message: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        res.status(500).json({ status: "error", message: "Error al obtener usuario" });
    }
});

// Actualizar un usuario por ID
app.put("/usuario/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { correo, estadoSuscripcion } = req.body;

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
        }

        await usuario.update({
            correo,
            estadoSuscripcion
        });

        res.status(200).json({
            status: "success",
            message: "Usuario actualizado exitosamente",
            usuario
        });
    }catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ status: "error", message: "Error al actualizar usuario" });
    }
});

// Eliminar un usuario por ID
app.delete("/usuario/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);

        if (usuario) {
            await usuario.destroy();
            res.status(200).json({ status: "success", message: "Usuario eliminado" });
        } else {
            res.status(404).json({ status: "error", message: "Usuario no encontrado" });
        }
    }catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ status: "error", message: "Error al eliminar usuario" });
    }
});

// RUTAS PARA RESERVACIONES

// Crear una reservacion
app.post("/reservacion", async (req, res) => {
    const { correo, idPaquete } = req.body;
    try {
        // Verificar si el usuario ya existe
        let usuario = await Usuario.findOne({ where: { correo } });

        if (!usuario) {
            // Crear el usuario si no existe
            usuario = await Usuario.create({ correo });
        }

        // Verificar si el paquete existe
        const paquete = await Paquete.findByPk(idPaquete);
        if (!paquete) {
            return res.status(404).json({ message: "Destino no encontrado" });
        }

        // Crear la reservacion
        const reservacion = await Reservacion.create({
            idUsuario: usuario.id,
            idPaquete,
            estadoReservacion: "Pendiente",
        });

        res.status(201).json({
            message: "Reservación creada con éxito",
            reservacion
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error all crear la reservacion" });
    }
});

// Eliminar una reservacion
app.delete("/reservacion/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const reservacion = await Reservacion.findByPk(id);

        if (reservacion) {
            await reservacion.destroy();
            res.status(200).json({ status: "success", message: "Reservacion eliminada" });
        } else {
            res.status(404).json({ status: "error", message: "Reservacion no encontrada" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar la reservacion" });
    }
});

// Obtener todos los destinos reservados por un usuario
app.get("/usuario/:idUsuario/reservaciones", async (req, res) => {
    const { idUsuario } = req.params;

    try {
        const reservaciones = await Reservacion.findAll({
            where: { idUsuario },
            include: [ { model: Paquete, attributes: ["id", "nombre", "precio", "fechaSalida", "fechaRegreso"] } ]
        });
        res.status(200).json({ reservaciones });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las reservaciones" });
    }
});

// Obtener todas las reservaciones con detalles
app.get("/reservaciones", async (req, res) => {
    try {
        const reservaciones = await Reservacion.findAll({
            include: [
                { model: Usuario, attributes: ["id", "correo"] },
                { model: Paquete, attributes: ["id", "nombre", "precio", "fechaSalida", "fechaRegreso"] },
            ],
        });

        res.status(200).json(reservaciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las reservaciones" });
    }
});

// Ruta de prueba para verificar el servidor
app.get("/", (req, res) => {
    res.status(200).json({ status: "success", message: "Servidor funcionando correctamente" });
});

app.use('/', routes);

// Iniciar el servidor
app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`);
});