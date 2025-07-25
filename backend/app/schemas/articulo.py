from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ArticuloBase(BaseModel):
    nombre_art: str
    categoria: str
    estado_art: str
    descripcion: Optional[str]
    disponible: Optional[bool] = True
    dias_prestamo: Optional[int]
    dias_plazo: Optional[int]
    ubicacion: Optional[str]
    horario: Optional[str]
    imagen: Optional[str]

class ArticuloCreate(ArticuloBase):
    pass

class ArticuloUpdate(ArticuloBase):
    pass

class ArticuloOut(ArticuloBase):
    id_art: int
    fecha_subida: datetime
    class Config:
        orm_mode = True
