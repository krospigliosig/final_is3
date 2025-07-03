from django.db import models

# Create your models here.
class Articulo(models.model):
    id = models.IntegerField(primary_key=True)
    estado = models.CharField(max_length=13)
    categoria = models.CharField(max_length=20)
    