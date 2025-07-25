from sqlalchemy.orm import Session
from app.models.articulo import Articulo
from app.schemas.articulo import ArticuloCreate, ArticuloUpdate

def crear_articulo(db: Session, data: ArticuloCreate):
    articulo = Articulo(**data.dict())
    db.add(articulo)
    db.commit()
    db.refresh(articulo)
    return articulo

def obtener_articulos(db: Session):
    return db.query(Articulo).all()

def obtener_articulo_por_id(db: Session, id_art: int):
    return db.query(Articulo).filter(Articulo.id_art == id_art).first()

def actualizar_articulo(db: Session, id_art: int, data: ArticuloUpdate):
    articulo = db.query(Articulo).filter(Articulo.id_art == id_art).first()
    if not articulo:
        return None
    for key, value in data.dict(exclude_unset=True).items():
        setattr(articulo, key, value)
    db.commit()
    db.refresh(articulo)
    return articulo

def eliminar_articulo(db: Session, id_art: int):
    articulo = db.query(Articulo).filter(Articulo.id_art == id_art).first()
    if not articulo:
        return False
    db.delete(articulo)
    db.commit()
    return True

def toggle_disponibilidad(db: Session, id_art: int):
    articulo = db.query(Articulo).filter(Articulo.id_art == id_art).first()
    if not articulo:
        return None
    articulo.disponible = not articulo.disponible
    db.commit()
    db.refresh(articulo)
    return articulo
