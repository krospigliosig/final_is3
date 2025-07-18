from django.test import TestCase
from django.urls import reverse
from articulo.models import Articulo

class PruebaIntegracionArticulo(TestCase):
    def test_crear_y_listar_articulo(self):
        response_post = self.client.post(reverse('crear_articulo'), {
            'nombre': 'Balón',
            'descripcion': 'Balón de fútbol',
            'cantidad': 10
        })
        self.assertEqual(response_post.status_code, 302)  
        articulo = Articulo.objects.get(nombre='Balón')
        self.assertIsNotNone(articulo)

        response_get = self.client.get(reverse('listar_articulos'))
        self.assertContains(response_get, 'Balón')
