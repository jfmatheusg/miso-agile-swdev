from django.contrib import admin

from .models import CustomUser, Athletes

admin.site.register(CustomUser)
admin.site.register(Athletes)
