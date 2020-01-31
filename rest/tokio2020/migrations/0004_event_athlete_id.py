# Generated by Django 3.0.2 on 2020-01-31 01:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tokio2020', '0003_comment'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='athlete_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='athlete_event', to='tokio2020.Athlete', verbose_name='Deportista'),
        ),
    ]
