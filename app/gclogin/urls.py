from django.urls import path
from . import views

urlpatterns = [
    path('login', views.loginView, name='login_view'),
    path('alpha-password/unlock/', views.unlockAlphaPassword, name='unlockAlphaPassword'),
    path('alpha-password/', views.alphaPasswordView, name='alphaPasswordView'),
    path('alpha-password/failed/', views.alphaPasswordFailedView, name='alphaPasswordFailedView'),
    
]