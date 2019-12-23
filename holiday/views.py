from django.http.response import HttpResponse
from django.shortcuts import render

from lockdown.decorators import lockdown

@lockdown(passwords=("hello",))
def index(request):
    return HttpResponse("Hello")