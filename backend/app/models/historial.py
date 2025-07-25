from sqlalchemy import Column, Integer, ForeignKey, DateTime
from app.database import Base

class HistorialPrestamo(Base):
    __tablename__ = "historial_prestamos"

    id_prestamo = Column(Integer, primary_key=True, index=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario"), nullable=False)
    id_articulo = Column(Integer, ForeignKey("articulo.id_art"), nullable=False)
    fecha_reserva = Column(DateTime, nullable=False)
    fecha_devuelta = Column(DateTime)
