
from django.urls import include, path
from rest_framework import routers

from tokio2020 import views

router = routers.DefaultRouter()
router.register(r'users', views.AthleteViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
