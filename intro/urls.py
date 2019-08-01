from django.urls import path, re_path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('linkedin', views.linkedin, name='linkedin'),
    path('github', views.github, name='github'),
    re_path(r'^.*$', views.redirect, name='redirect'),
]