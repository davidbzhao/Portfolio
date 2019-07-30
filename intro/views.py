from django.shortcuts import render
from django.http import HttpResponse

from intro.models import Event

def index(request):
    context = {
        'events': Event.objects.all()
    }
    return render(request, 'intro/index.html', context)