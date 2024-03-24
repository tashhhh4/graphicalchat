from django.urls import path
from . import views

urlpatterns = [
    path('', views.mainAppView, name='mainAppView'),
    path('debug/', views.debugPageView, name='debug_page_view')
]