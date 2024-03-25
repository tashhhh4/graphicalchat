from django.urls import path
from . import views

urlpatterns = [
    path('alpha-password/unlock/', views.unlockAlphaPassword, name='unlockAlphaPassword'),
    path('alpha-password/', views.alphaPasswordView, name='alphaPasswordView'),
    path('alpha-password/failed/', views.alphaPasswordFailedView, name='alphaPasswordFailedView'),

    path('create-account/', views.createAccountView, name='createAccountView'),
    path('create-account/f/', views.createAccount, name='createAccount'),
    path('create-account/errors/username-duplicate/', views.createAccountDuplicateUsernameView, name='createAccountDuplicateUsernameView'),
    path('login/', views.loginView, name='loginView'),
    path('login/success/new/', views.loginNewView, name='loginNewView'),

]