from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from articulo.models import Articulo

# Create your models here.
class Accion(models.Model):
    fecha_inicio = models.DateTimeField("Fecha de registro", auto_now_add=True)
    id_usuario = models.ForeignKey(User, on_delete=models.PROTECT)

    class Meta:
        abstract = False

    def tiempo_restante(self):
        return None
    
    def esta_vigente(self):
        return None

class Reserva(Accion):
    id_articulo = models.ForeignKey(Articulo, on_delete=models.PROTECT)
    fecha_fin = models.DateTimeField("Fecha de vencimiento")

    def tiempo_restante(self):
        return self.fecha_fin - timezone.now()
    
    def esta_vigente(self):
        return timezone.now() <= self.fecha_fin

    def __str__(self):
        estado = "vigente" if self.esta_vigente() else "expirada"
        return (
            f"Reserva de '{self.id_articulo}' por {self.id_usuario} "
            f"del {self.fecha_inicio.strftime('%Y-%m-%d %H:%M')} "
            f"al {self.fecha_fin.strftime('%Y-%m-%d %H:%M')} - {estado}"
        )

class Devolucion(models.Model):
    fecha_devolucion = models.DateTimeField("Fecha de devolución")
    id_reserva = models.OneToOneField(Reserva, on_delete=models.CASCADE)

    def __str__(self):
        return f"Devolución registrada para la reserva {self.id_reserva} el día {self.fecha_devolucion}"
    
class Bloqueo(Accion):
    fecha_fin = models.DateTimeField(null=True, blank=True)
    motivo = models.TextField()

    def tiempo_restante(self):
        if self.fecha_fin:
            return self.fecha_fin - timezone.now()
        else: return None
    
    def esta_vigente(self):
        return self.fecha_fin is None and timezone.now() <= self.fecha_fin

    def __str__(self):
        estado = ""
        if self.esta_vigente():
            if self.fecha_fin:
                estado = f"vigente (hasta {self.fecha_fin.strftime('%Y-%m-%d %H:%M')})"
            else:
                estado = "vigente (permanente)"
        else:
            estado = "expirado"
        return f"Bloqueo contra {self.id_usuario} desde {self.fecha_inicio.strftime('%Y-%m-%d %H:%M')} - {estado}"