from .models import Athlete, Comment, Event, CustomUser, Sport, Mode, Comment
from rest_framework import serializers
from rest_framework.validators import UniqueValidator


class UserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=50)
    last_name = serializers.CharField(max_length=50)
    password = serializers.CharField()

    class Meta:
        model = CustomUser
        fields = ['email', 'username', 'first_name', 'last_name', 'password']

    def create(self, validated_data):
        return CustomUser.objects.create(**validated_data)


class SportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sport
        fields = ['id', 'name', 'get_absolute_url']


class ModeSerializer(serializers.ModelSerializer):
    sport = SportSerializer()

    class Meta:
        model = Mode
        fields = ['id', 'name', 'gender', 'sport']


class AthleteSerializer(serializers.ModelSerializer):
    sports = SportSerializer(many=True)

    class Meta:
        model = Athlete
        fields = ['id', 'first_name', 'last_name', 'get_absolute_url', 'birthday', 'birthplace', 'age', 'weight', 'height', 'coach', 'sports']


class EventSerializer(serializers.ModelSerializer):
    athlete = AthleteSerializer()
    sport = SportSerializer()
    mode = ModeSerializer()

    class Meta:
        model = Event
        fields = ['id', 'datetime', 'athlete', 'sport', 'mode', 'result', 'url_video']


class UserSimpleSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['id', 'username']


class CommentSerializerList(serializers.ModelSerializer):
    user = UserSimpleSerializer()

    class Meta:
        model = Comment
        fields = ['id', 'created_at', 'text', 'user']


class CommentSerializerCreate(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['id', 'created_at', 'text', 'user', 'event']
