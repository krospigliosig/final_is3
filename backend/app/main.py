from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles  
from app.database import Base, engine
from app.routers import usuario, articulo, historial
import os

# Crear instancia de FastAPI
app = FastAPI()

# Crear las tablas en la base de datos
Base.metadata.create_all(bind=engine)

# Incluir los routers
app.include_router(usuario.router)
app.include_router(articulo.router)
app.include_router(historial.router)

# Montar archivos estáticos
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
app.mount("/", StaticFiles(directory=os.path.join(BASE_DIR, "static"), html=True), name="static")
