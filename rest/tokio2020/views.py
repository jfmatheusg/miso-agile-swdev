from django.shortcuts import render

from .models import Athlete, Event, Comment
from rest_framework import viewsets
from .serializers import AthleteSerializer, CommentSerializer, EventSerializer

from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import mixins


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class AthleteViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = Athlete.objects.all()
    serializer_class = AthleteSerializer
    filterset_fields = ['first_name', 'last_name']
    search_fields = ['$first_name', '$last_name']

    def get(self, request, format=None):
        content = {
            'status': 'request was permitted'
        }
        return Response(content)


class EventViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get(self, request, format=None):
        content = {
            'status': 'request was permitted'
        }
        return Response(content)


class CommentViewSet(mixins.CreateModelMixin,
                     mixins.ListModelMixin,
                     viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated | ReadOnly]

    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    filterset_fields = ['created_at']

    def get(self, request, format=None):
        content = {
            'status': 'request was permitted'
        }
        return Response(content)

    def post(self, request, format=None):
        content = {
            'status': 'request was permitted'
        }
        return Response(content)
