
from django.urls import include, path
from rest_framework import routers

from tokio2020 import views

router = routers.DefaultRouter()
router.register(r'athletes', views.AthleteViewSet)
router.register(r'events', views.EventViewSet)
router.register(r'comments', views.CommentViewSet)

print(router.urls)
urlpatterns = [
    path('', include(router.urls)),
]
