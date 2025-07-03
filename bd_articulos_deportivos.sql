DROP DATABASE IF EXISTS sistema_reserva_articulos;
CREATE DATABASE sistema_reserva_articulos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sistema_reserva_articulos;

CREATE TABLE usuario (
    verificador INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usr VARCHAR(100) NOT NULL,
    contrasena VARCHAR(255) NOT NULL
);

CREATE TABLE administrador (
    nombre_admin INT PRIMARY KEY,
    contrasena VARCHAR(255) NOT NULL,
    FOREIGN KEY (nombre_admin) REFERENCES usuario(verificador)
);

CREATE TABLE articulo (
    id_art INT AUTO_INCREMENT PRIMARY KEY,
    categoria VARCHAR(128),
    estado_art VARCHAR(128),
    descripcion TEXT,
    disponible BOOLEAN DEFAULT TRUE,
    verificador INT,
    FOREIGN KEY (verificador) REFERENCES usuario(verificador)
);

CREATE TABLE reserva (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    fecha_inicio DATETIME,
    fecha_fin DATETIME,
    tiempo_reserva VARCHAR(128),
    verificador_usr INT,
    id_art INT,
    FOREIGN KEY (verificador_usr) REFERENCES usuario(verificador),
    FOREIGN KEY (id_art) REFERENCES articulo(id_art)
);

CREATE TABLE devolucion (
    id_devol INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATETIME,
    verificador_usr INT,
    id_art INT,
    id_reserva INT,
    nombre_admin INT,
    FOREIGN KEY (verificador_usr) REFERENCES usuario(verificador),
    FOREIGN KEY (id_art) REFERENCES articulo(id_art),
    FOREIGN KEY (id_reserva) REFERENCES reserva(id_reserva),
    FOREIGN KEY (nombre_admin) REFERENCES administrador(nombre_admin)
);

CREATE TABLE modificacion_articulo (
    id_mod INT AUTO_INCREMENT PRIMARY KEY,
    id_art INT,
    fecha_modif DATETIME,
    estado_modif VARCHAR(128),
    descripcion TEXT,
    FOREIGN KEY (id_art) REFERENCES articulo(id_art)
);

CREATE TABLE accion (
    id_accion INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(128),
    nombre_admin INT,
    verificador_usr INT,
    id_art INT,
    FOREIGN KEY (nombre_admin) REFERENCES administrador(nombre_admin),
    FOREIGN KEY (verificador_usr) REFERENCES usuario(verificador),
    FOREIGN KEY (id_art) REFERENCES articulo(id_art)
);

CREATE TABLE bloqueo (
    id_bloqueo INT AUTO_INCREMENT PRIMARY KEY,
    fecha_inicio DATETIME,
    fecha_fin DATETIME,
    tiempo_bloqueo VARCHAR(128),
    motivo VARCHAR(128),
    verificador_usr INT,
    nombre_admin INT,
    FOREIGN KEY (verificador_usr) REFERENCES usuario(verificador),
    FOREIGN KEY (nombre_admin) REFERENCES administrador(nombre_admin)
);

CREATE TABLE lista_espera (
    id_lista INT AUTO_INCREMENT PRIMARY KEY,
    fecha_solicitud DATETIME,
    id_art INT,
    verificador_usr INT,
    FOREIGN KEY (id_art) REFERENCES articulo(id_art),
    FOREIGN KEY (verificador_usr) REFERENCES usuario(verificador)
);

INSERT INTO usuario (nombre_usr, contrasena) VALUES
('Kristopher Rospigliosi Gonzales', 'admin123'),
('Salim Jorge Rodriguez', 'admin123'),
('Erick Perez Chipa', 'admin123'),
('Kerin Larico Huillca', 'admin123');

INSERT INTO administrador (nombre_admin, contrasena) VALUES
(1, 'admin123'),
(2, 'admin123'),
(3, 'admin123'),
(4, 'admin123');

INSERT INTO usuario (nombre_usr, contrasena) VALUES
('Lionel Messi', 'user123'),
('Cristiano Ronaldo', 'user123'),
('Neymar Jr', 'user123');

INSERT INTO articulo (categoria, estado_art, descripcion, disponible, verificador) VALUES
('Fútbol', 'nuevo', 'Pelota de fútbol para entrenamiento', TRUE, 1),
('Baloncesto', 'bueno', 'Pelota oficial de baloncesto', TRUE, 2),
('Tenis', 'bueno', 'Raqueta profesional de tenis', TRUE, 3),
('Ping Pong', 'usado', 'Raqueta de ping pong básica', TRUE, 4),
('Voleibol', 'nuevo', 'Pelota de voleibol para partidos', TRUE, 1);
