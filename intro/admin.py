from django.contrib import admin
from .models import Event

class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'subtitle', 'priority', 'start_date', 'end_date']

admin.site.register(Event, EventAdmin)