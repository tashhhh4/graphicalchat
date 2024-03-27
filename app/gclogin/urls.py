from django.urls import path
from . import views
import django.contrib.auth.views as auth_views

urlpatterns = [
    # Site-Wide password lock-out
    # path('alpha-password/unlock/', views.unlockAlphaPassword, name='unlockAlphaPassword'),
    # path('alpha-password/', views.alphaPasswordView, name='alphaPasswordView'),
    # path('alpha-password/failed/', views.alphaPasswordFailedView, name='alphaPasswordFailedView'),

    # Account Creation & Invitation
    path(
        'create-account/invitation/',
        views.createAccountInvitationView,
        name='createAccountInvitationView'),
    path(
        'create-account/f/',
        views.createAccount,
        name='createAccount'),
    path(
        'create-account/errors/email-duplicate/',
        views.createAccountDuplicateEmailView,
        name='createAccountDuplicateEmailView'),
    path(
        'create-account/errors/username-duplicate/',
        views.createAccountDuplicateUsernameView,
        name='createAccountDuplicateUsernameView'),
    path(
        'create-account/errors/invalid-invitation/',
        views.createAccountInvalidInvitationView,
        name='createAccountInvalidInvitationView'),

    # Built-in Auth Views
    path(
        'login/',
        auth_views.LoginView.as_view(
            template_name='gclogin/login.html'),
        name='login'),
    path(
        'logout/',
        auth_views.LogoutView.as_view(),
        name='logout'),
    path(
        'password-reset/',
        auth_views.PasswordResetView.as_view(
            template_name='gclogin/password_reset_form.html'),
        name='password_reset'),
    path(
        'password-reset/sent/',
        auth_views.PasswordResetDoneView.as_view(
            template_name='gclogin/password_reset_sent.html'),
        name='password_reset_done'),
    path(
        'password-reset/<uidb64>/<token>/',
        auth_views.PasswordResetConfirmView.as_view(
            template_name='gclogin/password_reset_change_form.html'),
        name='password_reset_confirm'),
    path(
        'password-reset/complete/',
        auth_views.PasswordResetCompleteView.as_view(
            template_name='gclogin/password_reset_complete.html'),
        name='password_reset_complete'),
]