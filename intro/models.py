from django.db import models


class Event(models.Model):
    EVENT_TYPES = (
        ('E', 'Education'),
        ('L', 'Location'),
        ('W', 'Work')
    )
    event_type = models.CharField(max_length=1, choices=EVENT_TYPES)
    title = models.CharField(max_length=128)
    title_prefix = models.CharField(max_length=16)
    subtitle = models.CharField(max_length=128, blank=True)
    description = models.TextField(blank=True)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
