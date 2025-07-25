from django.db import models

class Categoria(models.Model):
    nombre = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return self.nombre

class Articulo(models.Model):
    codigo = models.CharField(max_length=10, unique=True)
    nombre = models.CharField(max_length=60)
    descripcion = models.TextField(blank=True)
    categoria = models.ForeignKey(Categoria, on_delete=models.PROTECT)

    ESTADOS_FISICOS = [
        ("Nuevo", "Nuevo"),
        ("Excelente", "Excelente estado"),
        ("Buen", "Buen estado"),
        ("Regular", "Regular"),
        ("Desgastado", "Desgastado"),
    ]
    estado_fisico = models.CharField(max_length=20, choices=ESTADOS_FISICOS)

    disponible = models.BooleanField(default=True)

    prestamo_max_dias = models.PositiveSmallIntegerField()
    plazo_max_dias = models.PositiveSmallIntegerField()

    ubicacion = models.CharField(max_length=80)

    horario_inicio = models.TimeField(default="08:00:00")
    horario_fin = models.TimeField(default="20:00:00")

    imagen = models.ImageField(upload_to="articulos/")

    creado_en = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["codigo"]

    def __str__(self):
        return f"{self.codigo} · {self.nombre}"
