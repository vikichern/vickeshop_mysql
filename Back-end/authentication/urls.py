from django.contrib import admin
from django.urls import path
from . import views
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('', views.index),
    path('register', views.register),
    path('login/', views.MyTokenObtainPairView.as_view(), name = 'token_obtain_pair'),
]
