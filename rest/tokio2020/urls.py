
from django.urls import include, path
from rest_framework import routers

from tokio2020 import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r'athletes', views.AthleteViewSet)
router.register(r'events', views.EventViewSet)

routerPk = routers.DefaultRouter()
routerPk.register(r'comments', views.CommentViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('events/<pk>/', include(routerPk.urls)),
    path('users/register', views.UserRegister, name='register'),
    path('users/login', TokenObtainPairView.as_view(), name='login'),
    path('users/token/refresh', TokenRefreshView.as_view(), name='refresh'),
    path('users/me', views.UserMe, name='me'),
]
