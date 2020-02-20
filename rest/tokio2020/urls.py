
from django.urls import include, path
from rest_framework import routers

from tokio2020 import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r'athletes', views.AthleteViewSet)
router.register(r'sports', views.SportViewSet)
router.register(r'events', views.EventViewSet)

routerC = routers.DefaultRouter()
routerC.register(r'comments', views.CommentViewSet)

routerE = routers.DefaultRouter()
routerE.register(r'events', views.EventViewListSet)

routerM = routers.DefaultRouter()
routerM.register(r'modes', views.ModesViewListSet)


urlpatterns = [
    path('', include(router.urls)),
    path('events/<pk>/', include(routerC.urls)),
    path('athletes/<pk>/', include(routerE.urls)),
    path('sports/<pk>/', include(routerM.urls)),
    path('users/register', views.UserRegister, name='register'),
    path('users/login', TokenObtainPairView.as_view(), name='login'),
    path('users/token/refresh', TokenRefreshView.as_view(), name='refresh'),
    path('users/me', views.UserMe, name='me'),
]
