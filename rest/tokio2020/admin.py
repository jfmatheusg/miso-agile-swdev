from django.contrib import admin
from django.utils.safestring import mark_safe

from .models import CustomUser, Athlete, Sport, Mode, Event, Comment


class SportAdmin(admin.ModelAdmin):

    readonly_fields = ["icono_url"]

    def icono_url(self, obj):
        return mark_safe('<img src="{url}" height="48" />'.format(
            url=obj.get_absolute_url(),
        )
        )


class EventAdmin(admin.ModelAdmin):
    readonly_fields = ['datetime', ]
    exclude = ['sport', ]


class AthleteAdmin(admin.ModelAdmin):
    readonly_fields = ['age', "image_url"]

    def image_url(self, obj):
        return mark_safe('<img src="{url}" height="100" />'.format(
            url=obj.get_absolute_url(),
        )
        )


# class CommentAdmin(admin.ModelAdmin):
#     readonly_fields = ['created_at', 'text', 'user', 'event']

#     def has_add_permission(self, request, obj=None):
#         return False


admin.site.register(CustomUser)
admin.site.register(Athlete, AthleteAdmin)
admin.site.register(Mode)
admin.site.register(Sport, SportAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(Comment)
