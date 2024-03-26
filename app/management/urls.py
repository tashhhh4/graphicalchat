from django.urls import path
from . import views

urlpatterns = [
    path('', views.adminMenuView, name='adminMenuView'),
    
    path('login/', views.adminLoginView, name='adminLoginView'),
    path('login/f/', views.adminLogin, name='adminLogin'),
    path('logout/', views.adminLogout, name='adminLogout'),

    path('invite-users/', views.invitationView, name='invitationView'),
]