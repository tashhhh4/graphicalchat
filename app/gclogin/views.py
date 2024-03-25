from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.contrib import messages as dj_messages
from django.conf import settings

from django.contrib.auth.models import User


# Generic Password Lock on site
def unlockAlphaPassword(request):
    if request.method == 'POST':
        password = request.POST.get('password')
        if password == settings.ALPHA_PASSWORD:
            request.session['password_ok'] = True
            return redirect('mainAppView')
        else:
            return redirect('alphaPasswordFailedView')

def alphaPasswordView(request):
    return render(request, 'gclogin/alpha_password_lock.html')

def alphaPasswordFailedView(request):
    dj_messages.error(request, 'The password was wrong. Please try again. If you would like an invitation, please contact the developer at tash@artoftash.com')
    return render(request, 'gclogin/alpha_password_lock.html')


# Create account and login
def createAccountView(request):
    return render(request, 'gclogin/create_account.html')

def createAccount(request):
    if(request.method == 'POST'):
        
        # Get data
        username = request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')
        invitation_code = request.POST.get('invitation_code')

        # Create User entry
        user = User(username=username, password=password, email=email)
        user.save()

        return redirect('loginNewView')

def loginView(request):
    return render(request, 'gclogin/login.html')

def loginNewView(request):
    dj_messages.success(request, 'Your account was created successfully! Please log in now with the credentials you created.')
    return render(request, 'gclogin/alpha_password_lock.html')
    return render(request, 'gclogin/login.html')