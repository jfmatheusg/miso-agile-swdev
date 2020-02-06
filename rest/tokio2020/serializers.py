from .models import Athlete, Comment, Event, CustomUser, Sport
from rest_framework import serializers


# class UserSerializer(serializers.Serializer):
#     email = serializers.EmailField()
#     username = serializers.CharField(max_length=100)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username']


class SportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sport
        fields = ['name', 'get_absolute_url']


class AthleteSerializer(serializers.ModelSerializer):
    sports = SportSerializer(many=True)

    class Meta:
        model = Athlete
        fields = ['first_name', 'last_name', 'get_absolute_url', 'birthday', 'birthplace', 'age', 'weight', 'height', 'coach', 'sports']


class EventSerializer(serializers.ModelSerializer):
    athlete_id = AthleteSerializer()

    class Meta:
        model = Event
        # extra_kwargs = {
        #     'athlete_id': {'view_name': 'athletes', 'lookup_field': 'first_name'}
        # }
        fields = ['datetime', 'athlete_id']


class CommentSerializer(serializers.ModelSerializer):
    user_id = UserSerializer()

    class Meta:
        model = Comment
        fields = ['created_at', 'text', 'user_id']
