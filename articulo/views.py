# articulo/views.py
from django.shortcuts import render, get_object_or_404
from .models import Articulo

def index(request):
    categoria = request.GET.get('categoria')
    if categoria and categoria.lower() != 'todos':
        articulos = Articulo.objects.filter(categoria__iexact=categoria)
    else:
        articulos = Articulo.objects.all()
    return render(request, 'articulo/home.html', {'articulos': articulos})

def detalles(request, articulo_id):
    articulo = get_object_or_404(Articulo, pk=articulo_id)
    return render(request, 'articulo/descripcion.html', {'articulo': articulo})
