import os
import django
import json
from pathlib import Path

# Configuración de Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "inventarIO.settings")
django.setup()

from articulo.models import Articulo, Categoria
from django.core.files import File

BASE_DIR = Path(__file__).resolve().parent
JSON_PATH = BASE_DIR / "static" / "data" / "articulos.json"
IMAGENES_DIR = BASE_DIR / "static" / "image"

with open(JSON_PATH, "r", encoding="utf-8") as f:
    articulos = json.load(f)

for art in articulos:
    print(f"Procesando artículo {art['id']}...")

    categoria, _ = Categoria.objects.get_or_create(nombre=art["categoria"])

    ruta_imagen = IMAGENES_DIR / Path(art["imagen"]).name
    if not ruta_imagen.exists():
        print(f"❌ Imagen no encontrada para {art['id']}: {ruta_imagen}")
        continue

    with ruta_imagen.open("rb") as img_file:
        imagen = File(img_file, name=ruta_imagen.name)

        articulo, creado = Articulo.objects.get_or_create(
            codigo=art["id"],
            defaults={
                "nombre": art["nombre_articulo"],
                "descripcion": "Importado desde JSON",
                "categoria": categoria,
                "estado_fisico": art["estado"],
                "disponible": art["disponibilidad"].lower() == "disponible",
                "prestamo_max_dias": int(art["tiempo_maximo"].split()[0]),
                "plazo_max_dias": int(art["tiempo_maximo"].split()[0]),
                "ubicacion": art["lugar"],
                "imagen": imagen,
            }
        )

        if creado:
            print(f"Artículo {articulo.codigo} creado.")
        else:
            print(f"Artículo {articulo.codigo} ya existía.")
