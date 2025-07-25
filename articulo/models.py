# articulo/models.py
from django.db import models

class Articulo(models.Model):
    nombre_art = models.CharField(max_length=128)
    categoria = models.CharField(max_length=128)
    estado_art = models.CharField(max_length=128)
    descripcion = models.TextField(blank=True)
    disponible = models.BooleanField(default=True)
    dias_prestamo = models.IntegerField()
    dias_plazo = models.IntegerField()
    ubicacion = models.CharField(max_length=128)
    horario = models.CharField(max_length=50)
    imagen = models.CharField(max_length=255)
    fecha_subida = models.DateField()
    verificador = models.IntegerField()  # FK si deseas puedes usar ForeignKey a Usuario

    def __str__(self):
        return self.nombre_art
