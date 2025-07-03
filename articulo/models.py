from django.db import models

# Create your models here.
class Articulo(models.Model):
    id = models.IntegerField(primary_key=True)
    estado = models.CharField("estado del artículo", max_length=13)
    categoria = models.CharField(max_length=20)
    descripcion = models.CharField(max_length=200)