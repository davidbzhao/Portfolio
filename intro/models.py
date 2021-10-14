from django.db import models


class Event(models.Model):
    priority = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=128)
    subtitle = models.CharField(max_length=128, blank=True)
    description = models.TextField(blank=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    display = models.BooleanField(default=False)
