# Generated by Django 3.0.2 on 2020-01-31 02:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tokio2020', '0004_event_athlete_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='result',
            field=models.CharField(default='', max_length=50, null=True, verbose_name='Resultado'),
        ),
    ]
