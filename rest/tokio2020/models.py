from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import date


class CustomUser(AbstractUser):
    """
    Extensión del modelo de usuario
    """
    first_name = models.CharField(max_length=50, verbose_name="Nombres")
    last_name = models.CharField(max_length=50, verbose_name="Apellidos")


class Sport(models.Model):
    """
    Deporte
    """
    name = models.CharField(max_length=50, verbose_name="Nombre")
    icono = models.FileField(
        null=True, blank=True, upload_to="files/icons", verbose_name="Ícono")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return '/%s' % self.icono.url.replace('files', 'static', 1)


class Athlete(models.Model):
    """
    Deportistas
    """
    first_name = models.CharField(max_length=50, verbose_name="Nombres")
    last_name = models.CharField(max_length=50, verbose_name="Apellidos")
    image = models.ImageField(null=True, blank=True,
                              upload_to="files/athletes", verbose_name="Foto")
    birthday = models.DateField(verbose_name="Fecha de Nacimiento")
    birthplace = models.CharField(
        max_length=50, verbose_name="Lugar de nacimiento")
    age = models.IntegerField(verbose_name="Edad")
    weight = models.DecimalField(
        max_digits=5, decimal_places=2, max_length=50, verbose_name="Peso", help_text="libras")
    height = models.DecimalField(
        max_digits=3, decimal_places=2, max_length=50, verbose_name="Altura", help_text="metros")
    coach = models.CharField(max_length=100, verbose_name="Entrenador")
    sports = models.ManyToManyField(
        Sport,
        help_text="Seleccione uno o más deportes en los que compite.")

    def save(self, *args, **kwargs):
        today = date.today()
        age = today.year - self.birthday.year - \
            ((today.month, today.day) < (self.birthday.month, self.birthday.day))
        self.age = age
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return '/%s' % self.image.url.replace('files', 'static', 1)

    def __str__(self):
        return '%s %s' % (self.first_name, self.last_name)


class Mode(models.Model):
    """
    Modalidad de deporte
    """
    Gender = (
        ('M', 'Masculino'),
        ('F', 'Femenino'),
    )

    name = models.CharField(max_length=50, verbose_name="Nombre")
    gender = models.CharField(
        max_length=50, verbose_name="Nombre", choices=Gender, default='M')
    sport_id = models.ForeignKey(
        Sport, on_delete=models.CASCADE, related_name='sport_mode', verbose_name="Deporte")

    def __str__(self):
        return '%s/%s' % (self.sport_id, self.name)


class Event(models.Model):
    """
    Modalidad de deporte
    """
    date = models.DateField(verbose_name="Fecha")
    time = models.TimeField(verbose_name="Hora")
    datetime = models.DateTimeField(verbose_name="Fecha y Hora", null=True)
    sport_id = models.ForeignKey(
        Sport, on_delete=models.CASCADE, related_name='sport_event', verbose_name="Deporte")
    mode_id = models.ForeignKey(
        Mode, on_delete=models.CASCADE, related_name='modet_event', verbose_name="Modalidad")
    result = models.CharField(
        max_length=50, verbose_name="Resultado", null=True)

    def save(self, *args, **kwargs):
        self.datetime = '%s %s' % (self.date, self.time)
        super().save(*args, **kwargs)

    def __str__(self):
        return '%s - %s/%s' % (self.datetime, self.sport_id, self.mode_id)
