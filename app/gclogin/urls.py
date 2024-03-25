from django.urls import path
from . import views

urlpatterns = [
    path('alpha-password/unlock/', views.unlockAlphaPassword, name='unlockAlphaPassword'),
    path('alpha-password/', views.alphaPasswordView, name='alphaPasswordView'),
    path('alpha-password/failed/', views.alphaPasswordFailedView, name='alphaPasswordFailedView'),

    path('create-account/', views.createAccountView, name='createAccountView'),
    path('login/', views.loginView, name='loginView'),
]