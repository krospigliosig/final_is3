from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class HistorialOut(BaseModel):
    id_prestamo: int
    id_articulo: int
    id_usuario: int
    nombre_usuario: str
    correo: str
    fecha_reserva: datetime
    fecha_devuelta: Optional[datetime]

    class Config:
        orm_mode = True

class HistorialUsuarioOut(BaseModel):
    id_prestamo: int
    id_usuario: int
    id_articulo: int
    nombre_articulo: str
    categoria: str
    fecha_reserva: datetime
    fecha_devuelta: Optional[datetime]

    class Config:
        orm_mode = True
