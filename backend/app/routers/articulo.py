from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import SessionLocal
from app.schemas.articulo import ArticuloCreate, ArticuloOut, ArticuloUpdate
from app.crud import articulo as crud

router = APIRouter(prefix="/articulos", tags=["Artículos"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=ArticuloOut)
def crear_articulo(data: ArticuloCreate, db: Session = Depends(get_db)):
    return crud.crear_articulo(db, data)

@router.get("/", response_model=List[ArticuloOut])
def listar_articulos(db: Session = Depends(get_db)):
    return crud.obtener_articulos(db)

@router.get("/{id_art}", response_model=ArticuloOut)
def obtener_articulo(id_art: int, db: Session = Depends(get_db)):
    articulo = crud.obtener_articulo_por_id(db, id_art)
    if not articulo:
        raise HTTPException(status_code=404, detail="Artículo no encontrado")
    return articulo

@router.put("/{id_art}", response_model=ArticuloOut)
def actualizar_articulo(id_art: int, data: ArticuloUpdate, db: Session = Depends(get_db)):
    articulo = crud.actualizar_articulo(db, id_art, data)
    if not articulo:
        raise HTTPException(status_code=404, detail="Artículo no encontrado")
    return articulo

@router.delete("/{id_art}")
def eliminar_articulo(id_art: int, db: Session = Depends(get_db)):
    success = crud.eliminar_articulo(db, id_art)
    if not success:
        raise HTTPException(status_code=404, detail="Artículo no encontrado")
    return {"ok": True, "mensaje": "Artículo eliminado"}

@router.patch("/{id_art}/toggle-disponible", response_model=ArticuloOut)
def cambiar_disponibilidad(id_art: int, db: Session = Depends(get_db)):
    articulo = crud.toggle_disponibilidad(db, id_art)
    if not articulo:
        raise HTTPException(status_code=404, detail="Artículo no encontrado")
    return articulo
