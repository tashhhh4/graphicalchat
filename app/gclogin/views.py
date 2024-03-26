from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.conf import settings

from django.db import IntegrityError

from django.contrib import messages as dj_messages
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

from database.models import GCUser, Invitation


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
    email = request.GET.get('email')
    code = request.GET.get('code')
    context = {
        'invitation_email': email,
        'invitation_code': code,
    }
    return render(request, 'gclogin/create_account.html', context)

def createAccount(request):
    if(request.method == 'POST'):
        
        try:
            # Get data
            username = request.POST.get('username')
            password = request.POST.get('password')
            email = request.POST.get('email')
            invitation_code = request.POST.get('invitation_code')

            # Check valid invitation
            invitation = Invitation.objects.filter(email=email, code=invitation_code)
            print('invitation query result: ')
            print(invitation)

            if invitation is not None:

                # Create User Account
                user = User.objects.create_user(username, email, password)

                # Create User Profile
                gcuser = GCUser(user=user)
                gcuser.save()

                # Clean up invitation(s) to the email that was used
                Invitation.objects.filter(email=email).delete()

            else:
                return redirect('createAccountInvalidInvitationView')


        except IntegrityError:
            return redirect('createAccountDuplicateUsernameView')

        return redirect(settings.LOGIN_URL)

def createAccountDuplicateUsernameView(request):
    dj_messages.error(request, 'This username is already registered. Please try a different one.')
    return render(request, 'gclogin/create_account.html')

def createAccountInvalidInvitationView(request):
    dj_messages.error(request, 'The invitation was invalid. Please click the link that was sent to your email, or copy-and-paste the exact contents of the link into your browser. If you do not have an invitation but would like one, please send a message to info@graphicalchat.app - I would love to have you try it!')
    return render(request, 'gclogin/create_account.html')