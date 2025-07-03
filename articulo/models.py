from django.db import models

# Create your models here.
class Articulo(models.Model):
    nombre = models.CharField(max_length=30)
    estado = models.CharField("estado del artículo", max_length=13)
    categoria = models.CharField(max_length=20)
    descripcion = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.nombre