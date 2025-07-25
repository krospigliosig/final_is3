from sqlalchemy import Column, Integer, String, Text, Boolean, TIMESTAMP
from sqlalchemy.sql import func
from app.database import Base

class Articulo(Base):
    __tablename__ = "articulo"

    id_art = Column(Integer, primary_key=True, index=True)
    nombre_art = Column(String(128), nullable=False)
    categoria = Column(String(128), nullable=False)
    estado_art = Column(String(128), nullable=False)
    descripcion = Column(Text)
    disponible = Column(Boolean, default=True)
    dias_prestamo = Column(Integer)
    dias_plazo = Column(Integer)
    ubicacion = Column(String(128))
    horario = Column(String(50))
    imagen = Column(String(255))
    fecha_subida = Column(TIMESTAMP, server_default=func.now())
