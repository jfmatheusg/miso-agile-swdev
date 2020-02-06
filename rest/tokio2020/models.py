from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import date
from django.utils import timezone


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
        null=True, blank=True, upload_to="assets/icons", verbose_name="Ícono")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        if self.icono:
            return '%s%s' % (os.getenv('HEROKU_APPLICATION') if '' else '/', self.icono.url)
        return ''


class Athlete(models.Model):
    """
    Deportistas
    """
    first_name = models.CharField(max_length=50, verbose_name="Nombres")
    last_name = models.CharField(max_length=50, verbose_name="Apellidos")
    image = models.ImageField(null=True, blank=True,
                              upload_to="assets/athletes", verbose_name="Foto")
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
        if self.image:
            return '%s%s' % (os.getenv('HEROKU_APPLICATION') if '' else '/', self.image.url)
        return ''

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
        return '%s/%s/%s' % (self.sport_id, self.name, self.gender)


class Event(models.Model):
    """
    Eventos de los deportista
    """
    date = models.DateField(verbose_name="Fecha")
    time = models.TimeField(verbose_name="Hora")
    datetime = models.DateTimeField(verbose_name="Fecha y Hora", null=True)
    athlete_id = models.ForeignKey(Athlete, on_delete=models.SET_NULL, related_name='athlete_event', verbose_name="Deportista", null=True)
    sport_id = models.ForeignKey(Sport, on_delete=models.CASCADE, related_name='sport_event', verbose_name="Deporte")
    mode_id = models.ForeignKey(Mode, on_delete=models.CASCADE, related_name='modet_event', verbose_name="Modalidad")
    result = models.CharField(max_length=50, verbose_name="Resultado", null=True, default="")

    def save(self, *args, **kwargs):
        self.datetime = datetime.strptime('%s %s' % (
            self.date, self.time), "%Y-%m-%d %H:%M:%S")
        self.sport_id = self.mode_id.sport_id
        super().save(*args, **kwargs)

    def __str__(self):
        return '%s - %s [%s]' % (self.datetime, self.athlete_id, self.mode_id)


class Comment(models.Model):
    """
    Comentarios de los eventos
    """

    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name="Creado")
    text = models.TextField(verbose_name="Comentario")
    user_id = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name='user_comment', verbose_name="Usuario")
    event_id = models.ForeignKey(
        Event, on_delete=models.CASCADE, related_name='event_comment', verbose_name="Evento")

    def __str__(self):
        return '%s - %s ** %s' % (self.created_at.strftime("%d/%m %H:%M"), self.user_id, self.event_id)
