from django.shortcuts import render

from .models import Athlete
from rest_framework import viewsets
from .serializers import AthleteSerializer


class AthleteViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Athlete.objects.all()
    serializer_class = AthleteSerializer
    filterset_fields = ['first_name', 'last_name']
    search_fields = ['$first_name', '$last_name']
