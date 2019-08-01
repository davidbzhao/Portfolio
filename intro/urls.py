from django.urls import path, re_path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('linkedin', views.linkedin, name='linkedin'),
    path('facebook', views.facebook, name='facebook'),
    path('twitter', views.twitter, name='twitter'),
    path('github', views.github, name='github'),
    path('quora', views.quora, name='quora'),
    path('steam', views.steam, name='steam'),
    path('email', views.email, name='email'),
    path('phone', views.phone, name='phone'),
    re_path(r'^.*$', views.redirect, name='redirect'),
]