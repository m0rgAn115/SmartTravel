DROP DATABASE IF EXISTS smart_travel;
CREATE DATABASE smart_travel;
USE smart_travel;

-- Tabla Paquetes
CREATE TABLE IF NOT EXISTS Paquetes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    lugares TEXT,
    hospedaje TEXT,
    fechaSalida DATETIME,
    fechaRegreso DATETIME,
    precio DECIMAL(10, 2) NOT NULL,
    promocion VARCHAR(255) DEFAULT 'No Aplica',
    stock INT NOT NULL DEFAULT 0,
    estado VARCHAR(255) DEFAULT 'Activo',
    tipoDestino VARCHAR(255) NOT NULL,
    imagen VARCHAR(255),
    imagenDetalles VARCHAR(255)
);

-- Tabla Usuarios
CREATE TABLE IF NOT EXISTS Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    correo VARCHAR(255) NOT NULL UNIQUE,
    estadoSuscripcion VARCHAR(255) DEFAULT 'Pendiente'
);

-- Tabla Reservaciones
CREATE TABLE IF NOT EXISTS Reservaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fechaReservacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    estadoReservacion VARCHAR(255) DEFAULT 'Pendiente',
    idUsuario INT NOT NULL,
    idPaquete INT NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES Usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (idPaquete) REFERENCES Paquetes(id) ON DELETE CASCADE
);

INSERT INTO Paquetes (nombre, descripcion, lugares, hospedaje, fechaSalida, fechaRegreso, precio, promocion, stock, estado, tipoDestino, imagen, imagenDetalles) 
VALUES
('Cancún', 'Cancún es un paraíso tropical con sus playas de arena blanca, aguas cristalinas y un ambiente vibrante. Disfruta de la increíble vida nocturna, la hospitalidad de su gente y los fascinantes vestigios mayas. No te pierdas la oportunidad de explorar los arrecifes de coral y sumergirte en sus impactantes cenotes.', 'Cancún ofrece una mezcla perfecta de relax, aventura y cultura. Disfruta de sus playas, como Playa Tortugas, y visita Isla Mujeres, famosa por su tranquilidad. Tendrás la oportunidad de explorar los parques eco-arqueológicos Xcaret o Xel-Há, donde podrás nadar en ríos subterráneos y disfrutar de la fauna local. También conocerás Tulum, con sus ruinas mayas frente al mar y la Playa Paraíso. No te pierdas el Cenote Dos Ojos, ideal para nadar o bucear. Realiza snorkel en el Museo Subacuático de Arte (MUSA) y disfruta de la vibrante Playa del Carmen. Tendrás un día libre para descansar o probar actividades acuáticas como parasailing o jet ski. En tu último día, relájate en la playa o visita Xplor o Xcaret antes de tu regreso, habiendo disfrutado de una experiencia única en Cancún.', 'Royal Solaris Cancun Resort Marina & Spa All Inclusive', '2025-01-21 16:00:00', '2025-01-30 12:00:00', 2050.00, 'HOTEL + AÉREO', 30, 'Activo', 'Nacional', '/uploads/cancun.jpg', '/uploads/cancun-details.jpg'),
('Chichén Itzá', 'Chichén Itzá es un destino mágico donde la historia cobra vida. Maravíllate con la majestuosidad de la pirámide de Kukulkán y explora las enigmáticas estructuras que cuentan la historia de la civilización maya. Rodeado por selvas y cenotes, este sitio te conectará con el pasado como ningún otro lugar.', 'Chichén Itzá es un sitio arqueológico impresionante que te transportará a la antigua civilización maya. Conocerás la famosa **Pirámide de Kukulkán**, el **Observatorio** y el **Juego de Pelota**, todos rodeados de historia y misterio. Después, puedes relajarte en el **Cenote Ik Kil**, un hermoso cenote para nadar. Disfruta de la gastronomía local en los alrededores y sumérgete en la cultura maya. Este día será una experiencia única de historia, cultura y naturaleza.', 'Hacienda Chichen Resort and Yaxkin Spa', '2025-01-30 16:00:00', '2025-02-05 12:00:00', 2550.00, 'Descuento especial de 10%', 50, 'Activo', 'Nacional', '/uploads/chichen-itza.jpg', '/uploads/chichen-details.jpeg'),
('Puerto Vallarta', 'Puerto Vallarta te cautivará con su encanto mexicano, sus atardeceres dorados y su mezcla perfecta de mar, montaña y cultura. Pasea por su malecón lleno de arte, prueba la deliciosa gastronomía local y vive la calidez de su gente. No olvides explorar las caletas y bahías cercanas para una experiencia inolvidable.', 'Puerto Vallarta te ofrece una mezcla de naturaleza, cultura y relajación. Disfruta de sus hermosas playas como Playa de los Muertos, ideal para nadar o pasear en bote. Explora el Malecón, donde podrás admirar esculturas y disfrutar de la vista al mar. No te pierdas una excursión al **Parque Nacional Marino Los Arcos**, perfecto para hacer snorkel o buceo. También puedes visitar el pueblo de **Bucerías** para conocer sus tiendas y comer en restaurantes locales. En tu día libre, disfruta del sol en sus playas o prueba actividades como el kayak o el paddleboard. Finaliza tu visita con una cena frente al mar mientras ves el atardecer.', 'Sheraton Buganvilias Resort and Convention Center', '2025-02-24 16:00:00', '2025-03-03 12:00:00', 2400.00, '30% de descuento para grupos', 20, 'Activo', 'Nacional', '/uploads/vallarta.jpg', '/uploads/vallarta-details.jpg'),
('Tokio', 'Tokio es una ciudad fascinante donde lo antiguo y lo moderno conviven en perfecta armonía. Disfruta de su innovadora tecnología, la espectacular comida, y los jardines que te invitan a descansar. Es el lugar donde cada calle tiene algo nuevo por descubrir, y la tradición se mezcla con el futuro en cada rincón.', 'Tokio es una ciudad que combina lo tradicional con lo futurista. Admira los rascacielos de **Shibuya** y disfruta de las tiendas de lujo en **Ginza**. Visita el tranquilo **Templo Senso-ji** en **Asakusa**, donde podrás experimentar la espiritualidad japonesa. No te pierdas el **Parque Ueno**, donde puedes ver museos y disfrutar de la naturaleza. En tu día libre, explora los modernos barrios de **Akihabara** o **Harajuku**. Tokio es una ciudad vibrante llena de sorpresas y cultura.', 'Toyoko Inn Tokyo Shinjuku gyoemmae eki 3 ban Deguchi', '2025-01-14 16:00:00', '2025-01-21 12:00:00', 3650.00, 'HOTEL + AÉREO', 15, 'Activo', 'Internacional', '/uploads/tokyo.png', '/uploads/tokio-details.png'),
('Roma', 'Roma es una ciudad eterna donde cada rincón narra siglos de historia. Camina por sus calles empedradas, admira el imponente Coliseo y déjate maravillar por la grandeza del Vaticano. Disfruta de la auténtica comida italiana mientras descubres fuentes, plazas y monumentos icónicos que te transportarán en el tiempo.', 'Roma es una ciudad llena de historia y maravillas arquitectónicas. Visita el **Coliseo**, donde podrás imaginar las antiguas batallas de gladiadores. Explora el **Vaticano**, incluyendo la majestuosa **Basílica de San Pedro** y los impresionantes **Museos Vaticanos**. Camina por las calles empedradas hacia la **Fontana di Trevi**, la **Plaza de España** y el **Panteón de Agripa**. En tu día libre, disfruta de la auténtica comida italiana y visita sus encantadores cafés y boutiques. Roma te dejará sin palabras con su mezcla de cultura y modernidad.','Golden Tulip Rome Piram', '2025-02-04 16:00:00', '2025-02-10 12:00:00', 4290.00, 'No Aplica', 15, 'Activo', 'Internacional', '/uploads/roma.jpg', '/uploads/roma-details.jpg'),
('Londres', 'Londres es una metrópoli llena de historia, arte y cultura contemporánea.
Sorpréndete con el imponente Big Ben, el majestuoso Tower Bridge y los museos de clase mundial. Vive la mezcla única de tradición y modernidad mientras exploras sus encantadores mercados y parques reales.', 'Londres es una ciudad llena de historia, arte y cultura. Admira el **Big Ben** y el **London Eye** desde las orillas del río Támesis. Visita el **Museo Británico** y la **Galería Nacional**, donde podrás disfrutar de arte clásico. Camina por el **Palacio de Buckingham** y los **Jardines de Kensington**, o cruza el **Tower Bridge**. En tu día libre, puedes explorar los famosos mercados de **Camden** o disfrutar de un paseo por **Covent Garden**. Londres es una mezcla única de tradición y modernidad.', 'Park Plaza Westminster Bridge London', '2025-02-24 16:00:00', '2025-03-03 12:00:00', 4290.00, 'No Aplica', 15, 'Activo', 'Internacional', '/uploads/london.jpg', '/uploads/london-details.jpg');

INSERT INTO Usuarios (correo, estadoSuscripcion) VALUES ('juan.perez@example.com', 'Pendiente');
INSERT INTO Usuarios (correo, estadoSuscripcion) VALUES ('maria.gomez@example.com', 'Activa');
INSERT INTO Usuarios (correo, estadoSuscripcion) VALUES ('carlos.lopez@example.com', 'Finalizada');

-- Reservaciones
INSERT INTO Reservaciones (idUsuario, idPaquete, estadoReservacion)
VALUES
(1, 1, 'Confirmada'), -- Juan Pérez reservó el paquete Cancún
(2, 4, 'Confirmada'), -- María Gómez reservó el paquete Tokio
(3, 2, 'Pendiente'),  -- Carlos López reservó el paquete Chichén Itzá
(1, 5, 'Pendiente'),  -- Juan Pérez reservó el paquete Roma
(2, 3, 'Cancelada');  -- María Gómez reservó el paquete Puerto Vallarta