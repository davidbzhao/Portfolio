from django.db import models


class Event(models.Model):
    EVENT_TYPES = (
        (0, 'Location'),
        (1, 'Education'),
        (2, 'Work'),
        (3, 'Recreation'),
    )
    event_type = models.IntegerField(choices=EVENT_TYPES)
    title = models.CharField(max_length=128)
    subtitle = models.CharField(max_length=128, blank=True)
    description = models.TextField(blank=True)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    display = models.BooleanField(default=False)
