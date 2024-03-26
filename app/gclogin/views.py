from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.conf import settings

from django.db import IntegrityError

from django.contrib import messages as dj_messages
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

from database.models import GCUser


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
def createAccountInvitationView(request):
    context = {'invitation_email': 'tash@artoftash.com'}
    return render(request, 'gclogin/create_account.html')

def createAccount(request):
    if(request.method == 'POST'):
        
        try:
            # Get data
            username = request.POST.get('username')
            password = request.POST.get('password')
            email = request.POST.get('email')
            invitation_code = request.POST.get('invitation_code')

            # Create User Account
            user = User.objects.create_user(username, email, password)

            # Create User Profile
            gcuser = GCUser(user=user)
            gcuser.save()

        except IntegrityError:
            return redirect('createAccountDuplicateUsernameView')

        return redirect(settings.LOGIN_URL)

def createAccountDuplicateUsernameView(request):
    dj_messages.error(request, 'This username is already registered. Please try a different one.')
    return render(request, 'gclogin/create_account.html')