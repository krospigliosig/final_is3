from pydantic import BaseModel

class UsuarioBase(BaseModel):
    nombre_usuario: str
    correo: str

class UsuarioCreate(UsuarioBase):
    contraseña: str

class UsuarioOut(UsuarioBase):
    id_usuario: int
    estado: bool
    rol: int

    class Config:
        orm_mode = True
