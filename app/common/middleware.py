from django.shortcuts import redirect
from django.urls import reverse

# Enforce a basic site-wide access password
class PasswordLockMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):

        # If the `password_ok` cookie is set
        if request.session.get('password_ok') == True:
            return self.get_response(request)

        # Password required...
        else:
            # If the URI is the root of the website
            if request.path == '/':
                return redirect('alphaPasswordView')

            # If the URI is one of the `urlpatterns` involved in using the password
            elif request.path == '/authentication/alpha-password/':
                return self.get_response(request)

            elif request.path == '/authentication/alpha-password/failed/':
                return self.get_response(request)

            elif request.path == '/authentication/alpha-password/unlock/':
                return self.get_response(request)

            # If the URI is any other page from the website
            else:
                return redirect('alphaPasswordView')