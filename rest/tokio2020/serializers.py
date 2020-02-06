from .models import Athlete
from rest_framework import serializers


class AthleteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Athlete
        fields = ['first_name', 'last_name', 'get_absolute_url', 'birthday', 'birthplace', 'age', 'weight', 'height', 'coach']
