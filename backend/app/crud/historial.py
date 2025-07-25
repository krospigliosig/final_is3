from sqlalchemy.orm import Session
from app.models.historial import HistorialPrestamo
from app.models.usuario import Usuario
from sqlalchemy import select, join

def obtener_historial_por_articulo(db: Session, id_articulo: int):
    resultado = (
        db.query(
            HistorialPrestamo.id_prestamo,
            HistorialPrestamo.id_articulo,
            HistorialPrestamo.id_usuario,
            Usuario.nombre_usuario,
            Usuario.correo,
            HistorialPrestamo.fecha_reserva,
            HistorialPrestamo.fecha_devuelta
        )
        .join(Usuario, Usuario.id_usuario == HistorialPrestamo.id_usuario)
        .filter(HistorialPrestamo.id_articulo == id_articulo)
        .order_by(HistorialPrestamo.fecha_reserva.desc())
        .all()
    )
    return resultado

from app.models.articulo import Articulo

def obtener_historial_por_usuario(db: Session, id_usuario: int):
    resultado = (
        db.query(
            HistorialPrestamo.id_prestamo,
            HistorialPrestamo.id_usuario,
            HistorialPrestamo.id_articulo,
            Articulo.nombre_art.label("nombre_articulo"),
            Articulo.categoria.label("categoria"),
            HistorialPrestamo.fecha_reserva,
            HistorialPrestamo.fecha_devuelta
        )
        .join(Articulo, Articulo.id_art == HistorialPrestamo.id_articulo)
        .filter(HistorialPrestamo.id_usuario == id_usuario)
        .order_by(HistorialPrestamo.fecha_reserva.desc())
        .all()
    )
    return resultado

