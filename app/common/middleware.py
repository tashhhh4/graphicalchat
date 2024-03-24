from django.http import HttpResponseRedirect

# Enforce a basic site-wide access password
class PasswordLockMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not request.session.get('password_ok', False) and not request.path.startswith('/authentication/alpha-password/'):
            return HttpResponseRedirect('/authentication/alpha-password/')
        return self.get_response(request)