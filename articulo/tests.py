from django.test import TestCase
from .models import Articulo

class ArticuloModelTest(TestCase):
    def test_crear_articulo(self):
        articulo = Articulo.objects.create(
            nombre="Balón de fútbol",
            estado="Disponible",
            categoria="Deporte",
            descripcion="Balón oficial tamaño 5"
        )
        self.assertEqual(articulo.nombre, "Balón de fútbol")
        self.assertEqual(articulo.estado, "Disponible")
