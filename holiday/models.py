from django.db import models

class Stanza(models.Model):
    priority = models.PositiveIntegerField()
    text = models.TextField(blank=True)

class Photo(models.Model):
    priority = models.PositiveIntegerField()
    url = models.URLField()
