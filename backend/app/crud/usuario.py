from sqlalchemy.orm import Session
from app.models.usuario import Usuario
from app.schemas.usuario import UsuarioCreate
from passlib.hash import bcrypt

def crear_usuario(db: Session, usuario: UsuarioCreate):
    # hashed_pw = bcrypt.hash(usuario.contraseña)  # Comentado temporalmente
    db_usuario = Usuario(
        nombre_usuario=usuario.nombre_usuario,
        correo=usuario.correo,
        contraseña=usuario.contraseña  # Usar contraseña en texto plano
        # contraseña=hashed_pw  # Comentado temporalmente
    )
    # Resto del código...
    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)
    return db_usuario

def obtener_usuarios(db: Session):
    return db.query(Usuario).all()

def eliminar_usuario(db: Session, id_usuario: int):
    usuario = db.query(Usuario).filter(Usuario.id_usuario == id_usuario).first()
    if not usuario:
        return False
    db.delete(usuario)
    db.commit()
    return True

def toggle_estado_usuario(db: Session, id_usuario: int):
    usuario = db.query(Usuario).filter(Usuario.id_usuario == id_usuario).first()
    if not usuario:
        return None
    usuario.estado = not usuario.estado  # Cambia el estado
    db.commit()
    db.refresh(usuario)
    return usuario