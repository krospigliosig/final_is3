from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import SessionLocal
from app.schemas.historial import HistorialOut
from app.crud.historial import obtener_historial_por_articulo

router = APIRouter(prefix="/historial", tags=["Historial de Préstamos"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/articulo/{id_articulo}", response_model=List[HistorialOut])
def ver_historial_articulo(id_articulo: int, db: Session = Depends(get_db)):
    historial = obtener_historial_por_articulo(db, id_articulo)
    if not historial:
        raise HTTPException(status_code=404, detail="No hay historial para este artículo")
    return historial

from app.schemas.historial import HistorialUsuarioOut
from app.crud.historial import obtener_historial_por_usuario

@router.get("/usuario/{id_usuario}", response_model=List[HistorialUsuarioOut])
def ver_historial_usuario(id_usuario: int, db: Session = Depends(get_db)):
    historial = obtener_historial_por_usuario(db, id_usuario)
    if not historial:
        raise HTTPException(status_code=404, detail="Este usuario no tiene historial")
    return historial
