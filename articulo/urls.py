from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("<int:articulo_id>/", views.detalles, name="detalles"),
    path('crear/', views.crear_articulo, name='crear_articulo'),
    path('listar/', views.listar_articulos, name='listar_articulos'),
]

