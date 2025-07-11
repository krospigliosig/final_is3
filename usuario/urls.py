# usuario/urls.py

from django.urls import path
from . import views
urlpatterns = [
    path("", views.index, name="index"),
    path('registro/', views.registrar_usuario, name='registro_usuario'),
    path('validar_email/', views.validar_email_ajax, name='validar_email_ajax'),
]
