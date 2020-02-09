from django.contrib.staticfiles import views
from django.contrib import admin
from django.urls import include, path, re_path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('v1/', include('tokio2020.urls')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    re_path(r'^favicon.ico$', views.serve, {'path': 'favicon.ico'}, name='favicon'),
    re_path(r'^(?!v1/).*$', views.serve, {'path': 'index.html'}, name='index'),
]
