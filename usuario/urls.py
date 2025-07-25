# usuario/urls.py

from django.urls import path
from . import views

app_name = 'usuario'

urlpatterns = [
    path("", views.index, name="index"),
    path('registro/', views.registrar_usuario, name='registro_usuario'),
    
    path('activar/<str:token>/', views.activar_cuenta, name='activar_cuenta'),
    path('logout/', views.logout_usuario, name='logout_usuario'),
    path('home/',   views.home,            name='home'),
    
    path('validar_email/', views.validar_email_ajax, name='validar_email_ajax'),
    
]
