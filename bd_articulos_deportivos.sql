DROP DATABASE IF EXISTS reserva_articulos_deportivos;
CREATE DATABASE reserva_articulos_deportivos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE reserva_articulos_deportivos;

-- Tabla de Usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    es_administrador BOOLEAN DEFAULT FALSE
);

-- Tabla de Artículos Deportivos
CREATE TABLE articulos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    categoria VARCHAR(50),
    estado ENUM('disponible', 'reservado', 'mantenimiento', 'no_disponible') DEFAULT 'disponible',
    fecha_adquisicion DATE,
    valor DECIMAL(10,2),
    codigo_barras VARCHAR(50) UNIQUE
);

-- Tabla de Reservas
CREATE TABLE reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    articulo_id INT NOT NULL,
    fecha_reserva DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    estado ENUM('pendiente', 'aprobada', 'rechazada', 'completada', 'cancelada') DEFAULT 'pendiente',
    observaciones TEXT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (articulo_id) REFERENCES articulos(id)
);

-- Tabla de Mantenimientos
CREATE TABLE mantenimientos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    articulo_id INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    descripcion TEXT,
    costo DECIMAL(10,2),
    realizado_por_id INT,
    FOREIGN KEY (articulo_id) REFERENCES articulos(id),
    FOREIGN KEY (realizado_por_id) REFERENCES usuarios(id)
);

-- Tabla de Devoluciones
CREATE TABLE devoluciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reserva_id INT NOT NULL,
    articulo_id INT NOT NULL,
    usuario_id INT NOT NULL,
    fecha_devolucion DATETIME DEFAULT CURRENT_TIMESTAMP,
    observaciones TEXT,
    procesado_por_id INT,
    FOREIGN KEY (reserva_id) REFERENCES reservas(id),
    FOREIGN KEY (articulo_id) REFERENCES articulos(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (procesado_por_id) REFERENCES usuarios(id)
);

-- Tabla de Modificaciones de Artículos
CREATE TABLE modificaciones_articulos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    articulo_id INT NOT NULL,
    fecha_modificacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    descripcion TEXT,
    estado_anterior VARCHAR(50),
    estado_nuevo VARCHAR(50),
    modificado_por_id INT,
    FOREIGN KEY (articulo_id) REFERENCES articulos(id),
    FOREIGN KEY (modificado_por_id) REFERENCES usuarios(id)
);

-- Tabla de Acciones (auditoría)
CREATE TABLE acciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion TEXT,
    usuario_id INT,
    articulo_id INT,
    fecha_accion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (articulo_id) REFERENCES articulos(id)
);

-- Tabla de Lista de Espera
CREATE TABLE lista_espera (
    id INT AUTO_INCREMENT PRIMARY KEY,
    articulo_id INT NOT NULL,
    usuario_id INT NOT NULL,
    fecha_solicitud DATETIME DEFAULT CURRENT_TIMESTAMP,
    atendido BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (articulo_id) REFERENCES articulos(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Insertar administradores
INSERT INTO usuarios (nombre, email, password, es_administrador) VALUES
('Kristopher Rospigliosi Gonzales', 'kristopher@admin.com', SHA2('admin123', 256), TRUE),
('Salim Jorge Rodriguez', 'salim@admin.com', SHA2('admin123', 256), TRUE),
('Erick Perez Chipa', 'erick@admin.com', SHA2('admin123', 256), TRUE),
('Kerin Larico Huillca', 'kerin@admin.com', SHA2('admin123', 256), TRUE);

-- Insertar usuarios regulares
INSERT INTO usuarios (nombre, email, password, telefono) VALUES
('Lionel Messi', 'messi@user.com', SHA2('user123', 256), '+5491122334455'),
('Cristiano Ronaldo', 'cristiano@user.com', SHA2('user123', 256), '+351112233445'),
('Neymar Jr', 'neymar@user.com', SHA2('user123', 256), '+551122334455');

-- Insertar artículos deportivos de prueba
INSERT INTO articulos (nombre, descripcion, categoria, estado, fecha_adquisicion, valor, codigo_barras) VALUES
('Balón de Fútbol Adidas', 'Balón oficial de la Champions League, tamaño 5', 'Fútbol', 'disponible', '2023-01-15', 89.99, 'ADIDAS-FUT-001'),
('Raqueta de Tenis Wilson', 'Raqueta profesional Wilson Pro Staff', 'Tenis', 'disponible', '2023-02-20', 199.99, 'WILSON-TEN-002'),
('Zapatillas Nike Running', 'Zapatillas para running Nike Air Zoom Pegasus', 'Atletismo', 'disponible', '2023-03-10', 129.99, 'NIKE-RUN-003'),
('Bicicleta Montañera Trek', 'Bicicleta de montaña Trek Marlin 5', 'Ciclismo', 'disponible', '2023-01-05', 599.99, 'TREK-CIC-004'),
('Guantes de Boxeo Everlast', 'Guantes de boxeo profesionales Everlast Pro', 'Boxeo', 'disponible', '2023-04-15', 69.99, 'EVER-BOX-005'),
('Tabla de Surf Quiksilver', 'Tabla de surf Quiksilver 6.5 pies', 'Surf', 'mantenimiento', '2022-12-10', 349.99, 'QUIK-SUR-006'),
('Pelota de Baloncesto Spalding', 'Pelota oficial NBA Spalding', 'Baloncesto', 'disponible', '2023-05-20', 59.99, 'SPAL-BAS-007'),
('Palos de Golf Callaway', 'Juego completo de palos de golf Callaway Strata', 'Golf', 'disponible', '2023-06-01', 499.99, 'CALL-GOL-008'),
('Casco para Ciclismo Giro', 'Casco de ciclismo Giro Register MIPS', 'Ciclismo', 'disponible', '2023-03-25', 89.99, 'GIRO-CIC-009'),
('Red de Voleibol Mikasa', 'Red oficial para voleibol de playa Mikasa', 'Voleibol', 'disponible', '2023-02-15', 149.99, 'MIKA-VOL-010');

-- Insertar algunas reservas de ejemplo
INSERT INTO reservas (usuario_id, articulo_id, fecha_inicio, fecha_fin, estado) VALUES
(5, 1, '2023-07-01', '2023-07-07', 'completada'),
(5, 3, '2023-07-10', '2023-07-15', 'aprobada'),
(6, 2, '2023-07-05', '2023-07-12', 'pendiente'),
(7, 4, '2023-07-20', '2023-07-25', 'aprobada');

-- Insertar registro de mantenimiento
INSERT INTO mantenimientos (articulo_id, fecha_inicio, fecha_fin, descripcion, costo, realizado_por_id) VALUES
(6, '2023-06-15', '2023-06-20', 'Reparación de grietas y reencauche', 45.50, 1);


