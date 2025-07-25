from sqlalchemy import Column, Integer, String, Boolean, TIMESTAMP, SmallInteger
from sqlalchemy.sql import func
from app.database import Base

class Usuario(Base):
    __tablename__ = "usuarios"
    id_usuario = Column(Integer, primary_key=True, index=True)
    nombre_usuario = Column(String(100), nullable=False)
    correo = Column(String(100), unique=True, nullable=False)
    contraseña = Column(String(255), nullable=False)
    estado = Column(Boolean, default=True)
    rol = Column(SmallInteger, default=0)
    fecha_registro = Column(TIMESTAMP, server_default=func.now())

