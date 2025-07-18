from django.shortcuts import render, get_object_or_404,redirect

from .models import Articulo

# Create your views here.
def index(request):
    articulos = Articulo.objects.all()
    return render(request, "articulo/index.html", {"articulos": articulos})

def detalles(request, articulo_id):
    articulo = get_object_or_404(Articulo, pk=articulo_id)
    return render(request, "articulo/detalles.html", {"articulo": articulo})

def crear_articulo(request):
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        descripcion = request.POST.get('descripcion')
        cantidad = request.POST.get('cantidad')
        Articulo.objects.create(nombre=nombre, descripcion=descripcion, cantidad=cantidad)
        return redirect('listar_articulos')
    return render(request, 'crear_articulo.html')

def listar_articulos(request):
    articulos = Articulo.objects.all()
    return render(request, 'listar_articulos.html', {'articulos': articulos})