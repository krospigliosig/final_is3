from django.test import LiveServerTestCase
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

class ArticuloFunctionalTest(LiveServerTestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.driver = webdriver.Chrome()

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()
        super().tearDownClass()

    def test_homepage_carga_correctamente(self):
        self.driver.get(self.live_server_url + '/articulo/')
        time.sleep(1)
        self.assertIn("Artículos", self.driver.title)
