from django.urls import path
from . import views

urlpatterns = [
    path('login', views.loginView, name='login_view'),
    path('unlock-alpha/', views.unlockAlphaPassword, name='unlock_alpha_password'),
    path('alpha-password/', views.alphaPasswordView, name='alpha_password_view'),
]