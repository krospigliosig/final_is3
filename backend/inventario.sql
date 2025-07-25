DROP DATABASE IF EXISTS inventario;
CREATE DATABASE inventario CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE inventario;
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,  -- Recomiendo almacenar contraseñas hasheadas
    estado BOOLEAN DEFAULT TRUE,
    rol TINYINT DEFAULT 0 COMMENT '0=usuario normal, 1=admin',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE articulo (
    id_art INT AUTO_INCREMENT PRIMARY KEY,
    nombre_art VARCHAR(128) NOT NULL,
    categoria VARCHAR(128) NOT NULL,
    estado_art VARCHAR(128) NOT NULL,
    descripcion TEXT,
    disponible BOOLEAN DEFAULT TRUE,
    dias_prestamo INT COMMENT 'Duración máxima del préstamo en días',
    dias_plazo INT COMMENT 'Plazo para devolución en días',
    ubicacion VARCHAR(128) COMMENT 'Lugar donde se encuentra el artículo',
    horario VARCHAR(50) COMMENT 'Horario de disponibilidad',
    imagen VARCHAR(255) COMMENT 'Ruta de la imagen del artículo',
    fecha_subida DATE COMMENT 'Fecha cuando se subió el artículo'
);

-- Tabla para registrar una reserva activa
CREATE TABLE reservas (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_articulo INT NOT NULL,
    fecha_reserva DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_articulo) REFERENCES articulo(id_art)
);

-- Historial de préstamos (incluye fecha de devolución)
CREATE TABLE historial_prestamos (
    id_prestamo INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_articulo INT NOT NULL,
    fecha_reserva DATETIME NOT NULL,
    fecha_devuelta DATETIME,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_articulo) REFERENCES articulo(id_art)
);

-- Lista de espera (cuando el artículo no está disponible)
CREATE TABLE lista_espera (
    id_espera INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_articulo INT NOT NULL,
    fecha_solicitada DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_articulo) REFERENCES articulo(id_art)
);

INSERT INTO usuarios (id_usuario, nombre_usuario, correo, contraseña, estado, rol) VALUES
(10, 'Ronald Romario', 'rromario@unsa.edu.pe', '1234', TRUE, 1),
(11, 'Diego Aquino', 'daquino@unsa.edu.pe', '1234', TRUE, 0),
(12, 'Alber Llica', 'allica@unsa.edu.pe', '1234', TRUE, 0),
(13, 'Lucía Paredes', 'lparedes@unsa.edu.pe', '1234', FALSE, 0),
(14, 'Marco Quispe', 'mquispe@unsa.edu.pe', '1234', TRUE, 0),
(15, 'Fiorella Huamán', 'fhuaman@unsa.edu.pe', '1234', TRUE, 0),
(16, 'Jorge Condori', 'jcondori@unsa.edu.pe', '1234', FALSE, 0),
(17, 'Ana Ramos', 'aramos@unsa.edu.pe', '1234', TRUE, 0),
(18, 'Luis Vargas', 'lvargas@unsa.edu.pe', '1234', TRUE, 0),
(19, 'Camila Sosa', 'csosa@unsa.edu.pe', '1234', TRUE, 0);

INSERT INTO articulo (id_art, nombre_art, categoria, estado_art, descripcion, disponible, dias_prestamo, dias_plazo, ubicacion, horario, imagen, fecha_subida) VALUES
(1, 'Pelota de futbol', 'futbol', 'Buen estado', 'Esta pelota tiene manchas y está apunto de romperse, es de la marca Cualquier Marca', TRUE, 3, 4, 'Cancha mecánica', '10am - 9pm', '/template/image/futbol.jpg', '2023-05-15'),
(2, 'Pelota de basquet', 'basquet', 'Desgastada', 'Pelota de basketball profesional, algo gastada pero en condiciones de uso', FALSE, 5, 3, 'Gimnasio principal', '8am - 8pm', '/template/image/basquet.jpg', '2023-06-22'),
(3, 'Pelota de voley', 'voley', 'Excelente estado', 'Pelota de vóley profesional, casi nueva, marca Mikasa', False, 2, 5, 'Cancha de arena', '9am - 7pm', '/template/image/voley.jpg', '2023-04-10'),
(4, 'Pesas 4k', 'otros', 'Buen estado', 'Juego de pesas de 4kg, ideal para entrenamiento básico', TRUE, 1, 7, 'Sala de pesas', '6am - 10pm', '/template/image/pesas_4k.jpg', '2023-07-30'),
(5, 'Boya', 'natacion', 'Nuevo', 'Boya de entrenamiento para natación, color rojo fluorescente', TRUE, 4, 2, 'Piscina olímpica', '7am - 9pm', '/template/image/boya.jpg', '2023-03-18'),
(6, 'Bicicleta', 'ciclismo', 'Regular', 'Bicicleta de montaña, necesita ajuste de frenos pero funcional', TRUE, 2, 3, 'Estacionamiento de equipos', '8am - 8pm', '/template/image/bicicleta.jpg', '2023-08-05'),
(7, 'Soga', 'otros', 'Buen estado', 'Soga para saltar profesional, con contador de vueltas integrado', TRUE, 6, 1, 'Área de cardio', '6am - 10pm', '/template/image/soga.jpg', '2023-01-12'),
(8, 'Kit de tenis', 'tenis', 'Excelente estado', 'Kit completo que incluye 3 raquetas y 6 pelotas de tenis', TRUE, 3, 4, 'Cancha de tenis 3', '8am - 8pm', '/template/image/futbol.jpg', '2023-09-27'),
(9, 'Malla de voley', 'voley', 'Regular', 'Red de vóley profesional, con algunos hilos rotos pero funcional', TRUE, 1, 7, 'Cancha cubierta', '9am - 9pm', '/template/image/malla_voley.jpg', '2023-02-14'),
(10, 'Caja de pelotas', 'ping pong', 'Nuevo', 'Caja con 12 pelotas de ping pong profesionales de 3 estrellas', TRUE, 5, 2, 'Sala de ping pong', '10am - 10pm', '/template/image/futbol.jpg', '2023-10-08'),
(11, 'Pelota Wilson (Réplica)', 'Otros', 'Desgastado', 'Réplica de la famosa pelota Wilson de la película "Náufrago", con marca de sangre en la cara como en el film. Incluye certificado de autenticidad.', TRUE, 5, 2, 'Almacén de objetos especiales', '10am - 10pm', '/template/image/wilson.jpg', '2023-11-01');

INSERT INTO historial_prestamos (id_prestamo, id_articulo, id_usuario, fecha_reserva, fecha_devuelta) VALUES
(1, 1, 10, '2025-07-10', NULL),
(2, 1, 11, '2025-05-23', '2025-05-27'),
(3, 1, 12, '2025-05-10', '2025-05-15'),
(4, 1, 13, '2025-04-16', '2025-06-19'),
(5, 2, 14, '2025-04-12', '2025-06-14'),
(6, 2, 15, '2025-03-20', '2025-03-25'),
(7, 2, 16, '2025-03-01', '2025-03-05'),
(8, 2, 17, '2025-02-24', '2025-02-28'),
(9, 3, 18, '2025-02-02', '2025-02-03'),
(10, 3, 19, '2025-01-15', '2025-01-18');

-- Reserva activa para la pelota de fútbol (id=1) por Ronald Romario (id=10)
INSERT INTO reservas (id_usuario, id_articulo, fecha_reserva) VALUES
(10, 3, '2025-07-10');

-- Lista de espera para la pelota de básquet (id=2)
INSERT INTO lista_espera (id_usuario, id_articulo, fecha_solicitada) VALUES
(11, 2, '2025-07-01'),
(12, 2, '2025-07-05');