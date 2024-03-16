from django.urls import path
from . import views

urlpatterns = [
    path('', views.mainAppView, name='main_app_view')
]