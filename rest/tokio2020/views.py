from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime, timedelta
from django.shortcuts import render

import django_filters
from django.db import models as django_models

from tokio2020 import models, serializers
from rest_framework import viewsets

from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics, mixins, status
from rest_framework.decorators import action, api_view, permission_classes

from django.contrib.auth import authenticate


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


@api_view(['POST'])
def UserRegister(request):
    serialized = serializers.UserSerializer(data=request.data)
    if serialized.is_valid():
        serialized.create(serialized.validated_data)
        return Response(serialized.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def UserMe(request):
    user = models.CustomUser.objects.get(pk=request.user.id)
    sc = serializers.UserSerializer(user)
    # print(sc)
    return Response(sc.data)


class AthleteViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = models.Athlete.objects.all()
    serializer_class = serializers.AthleteSerializer
    filterset_fields = ['first_name', 'last_name']
    search_fields = ['$first_name', '$last_name']


class EventFilter(django_filters.FilterSet):
    class Meta:
        model = models.Event
        fields = {
            'datetime': ['lte', 'gte'],
            'athlete':  ['exact'],
            'sport':  ['exact'],
            'mode':  ['exact'],
        }

    filter_overrides = {
        django_models.DateTimeField: {
            'filter_class': django_filters.IsoDateTimeFilter
        },
    }


class EventViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = models.Event.objects.all()
    serializer_class = serializers.EventSerializer
    filterset_fields = ['datetime', 'athlete', 'sport', 'mode']
    filter_class = EventFilter


class CommentViewSet(viewsets.ReadOnlyModelViewSet, mixins.CreateModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated | ReadOnly]

    queryset = models.Comment.objects.all()
    filterset_fields = ['text', 'event']

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return serializers.CommentSerializerList
        else:
            return serializers.CommentSerializerCreate

    def list(self, request, pk=None):
        request.query_params._mutable = True
        request.query_params['event'] = pk
        return super().list(request)

    def create(self, request, pk=None):
        request.data['event'] = pk
        request.data['user'] = request.user.id
        return super().create(request)
