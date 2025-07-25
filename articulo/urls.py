from django.urls import path

from . import views

urlpatterns = [
    path('home/', views.home, name='home'),
    #path('api/articulos/', views.lista_articulos, name='api_lista_articulos'),
    #path('api/articulos/<str:codigo>/', views.detalle_articulo_json, name='api_detalle_articulo'),
]