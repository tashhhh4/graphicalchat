from django.urls import path
from . import views

urlpatterns = [
    path('login', views.loginView, name='login_view'),
]