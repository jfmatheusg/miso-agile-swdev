from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime, timedelta
from django.shortcuts import render

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
    print('xxxxxxx')
    print(user)
    sc = serializers.UserSerializer(user)
    # print(sc)
    return Response(sc.data)


class AthleteViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = models.Athlete.objects.all()
    serializer_class = serializers.AthleteSerializer
    filterset_fields = ['first_name', 'last_name']
    search_fields = ['$first_name', '$last_name']

    def get(self, request, format=None):
        content = {
            'status': 'request was permitted'
        }
        return Response(content)


class EventViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = models.Event.objects.all()
    serializer_class = serializers.EventSerializer

    def get(self, request, format=None):
        content = {
            'status': 'request was permitted'
        }
        return Response(content)

    @action(detail=True)
    def comments(self, request, pk=None):
        comments = models.Comment.objects.filter(event=pk).order_by('-created_at')
        sc = serializers.CommentSerializerList(comments, many=True)
        return Response(sc.data)


class CommentViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated | ReadOnly]

    queryset = models.Comment.objects.all()
    serializer_class = serializers.CommentSerializerList
    filterset_fields = ['text']

    def create(self, request):
        try:
            event = models.Event.objects.get(pk=request.data['event'])
        except ObjectDoesNotExist:
            return Response({'event': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

        request.data['user'] = request.user.id
        serialized = serializers.CommentSerializerCreate(data=request.data)
        if serialized.is_valid():
            serialized.create(serialized.validated_data)
            return Response(serialized.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)
