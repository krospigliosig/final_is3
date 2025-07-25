from django.shortcuts import render, get_object_or_404

from django.http import JsonResponse
from .models import Articulo

# Create your views here.
def home(request):
    articulos = Articulo.objects.select_related('categoria').all()
    return render(request, "home.html", {"articulos": articulos})


def detalles(request, articulo_id):
    articulo = get_object_or_404(Articulo, pk=articulo_id)
    return render(request, "articulo/detalles.html", {"articulo": articulo})

#nuevo codigo 
def lista_articulos(request):
    articulos = Articulo.objects.all()
    data = []
    for a in articulos:
        data.append({
            "id": a.codigo,
            "nombre_articulo": a.nombre,
            "categoria": a.categoria.nombre,
            "disponibilidad": "Disponible" if a.disponible else "No disponible",
            "estado": a.estado_fisico,
            "lugar": a.ubicacion,
            "tiempo_maximo": f"{a.plazo_max_dias} días",
            "imagen": a.imagen.url if a.imagen else "",
            "fecha_subida": a.creado_en.strftime('%Y-%m-%d'),
        })
    return JsonResponse(data, safe=False)   

def detalle_articulo_json(request, codigo):
    a = get_object_or_404(Articulo, codigo=codigo)
    return JsonResponse({
        "id": a.codigo,
        "nombre": a.nombre,
        "categoria": a.categoria.nombre,
        "estado": a.estado_fisico,
        "disponibilidad": a.disponible,
        "prestamo": str(a.prestamo_max_dias),
        "plazo": str(a.plazo_max_dias),
        "ubicacion": a.ubicacion,
        "horario": f"{a.horario_inicio.strftime('%I%p').lower()} - {a.horario_fin.strftime('%I%p').lower()}",
        "descripcion": a.descripcion,
        "imagen": a.imagen.url if a.imagen else ""
    })
