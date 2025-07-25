from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas.usuario import UsuarioCreate, UsuarioOut
from app.crud.usuario import crear_usuario

from typing import List
from app.crud.usuario import obtener_usuarios, eliminar_usuario, toggle_estado_usuario



router = APIRouter(prefix="/usuarios", tags=["Usuarios"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=UsuarioOut)
def crear(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    return crear_usuario(db, usuario)

@router.get("/", response_model=List[UsuarioOut])
def listar_usuarios(db: Session = Depends(get_db)):
    return obtener_usuarios(db)

@router.delete("/{id_usuario}")
def borrar_usuario(id_usuario: int, db: Session = Depends(get_db)):
    eliminado = eliminar_usuario(db, id_usuario)
    if not eliminado:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return {"ok": True, "mensaje": "Usuario eliminado correctamente"}

@router.patch("/{id_usuario}/toggle-estado", response_model=UsuarioOut)
def cambiar_estado(id_usuario: int, db: Session = Depends(get_db)):
    usuario = toggle_estado_usuario(db, id_usuario)
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario
