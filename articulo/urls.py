# articulo/urls.py
from django.urls import path
from . import views

app_name = 'articulo'

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:articulo_id>/', views.detalles, name='detalles'),
]
