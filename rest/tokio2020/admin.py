from django.contrib import admin

from .models import CustomUser, Athlete, Sport, Mode, Event

admin.site.register(CustomUser)
admin.site.register(Athlete)
admin.site.register(Sport)
admin.site.register(Mode)
admin.site.register(Event)


class EventAdmin(admin.ModelAdmin):
    exclude = ['datetime', ]
