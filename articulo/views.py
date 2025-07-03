from django.shortcuts import render, get_object_or_404

from .models import Articulo

# Create your views here.
def index(request):
    articulos = Articulo.objects.all()
    return render(request, "articulo/index.html", {"articulos": articulos})

def detalles(request, articulo_id):
    articulo = get_object_or_404(Articulo, pk=articulo_id)
    return render(request, "articulo/detalles.html", {"articulo": articulo})

