from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    """
    Extensión del modelo de usuario
    """
    first_name = models.CharField(max_length=50, verbose_name="Nombres")
    last_name = models.CharField(max_length=50, verbose_name="Apellidos")


class Athletes(models.Model):
    """
    Deportistas
    """
    first_name = models.CharField(max_length=50, verbose_name="Nombres")
    last_name = models.CharField(max_length=50, verbose_name="Apellidos")
    image = models.ImageField(verbose_name="Foto")
    birthday = models.DateField(verbose_name="Fecha de Nacimiento")
    birthplace = models.CharField(
        max_length=50, verbose_name="Lugar de nacimiento")
    age = models.IntegerField(verbose_name="Edad")
    weight = models.DecimalField(
        max_digits=5, decimal_places=2, max_length=50, verbose_name="Nombres", help_text="libras")
    height = models.DecimalField(
        max_digits=3, decimal_places=2, max_length=50, verbose_name="Altura", help_text="metros")
    coach = models.CharField(max_length=100, verbose_name="Entrenador")
