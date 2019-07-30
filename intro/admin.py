from django.contrib import admin
from .models import Event

class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'subtitle', 'event_type', 'start_date', 'end_date']

admin.site.register(Event, EventAdmin)