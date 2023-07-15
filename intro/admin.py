from django.contrib import admin
from .models import Event, GridIcon

class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'subtitle', 'priority', 'start_date', 'end_date']

class GridIconAdmin(admin.ModelAdmin):
    pass


admin.site.register(Event, EventAdmin)
admin.site.register(GridIcon, GridIconAdmin)