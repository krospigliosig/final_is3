from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("<int:articulo_id>/", views.detalles, name="detalles")
]