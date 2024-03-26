from django.shortcuts import render, redirect
from django.contrib.auth.decorators import permission_required
from django.contrib.auth import authenticate, login, logout
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from gclogin.invitations import generate_code
from database.models import Invitation
from django.db import IntegrityError

@permission_required(perm='is_superuser', login_url='/admin/login')
def adminMenuView(request):
    return render(request, 'management/index.html')

# Login, Logout
def adminLoginView(request):
    return render(request, 'management/login.html')

def adminLogin(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return redirect('adminMenuView')
    else:
        return redirect('adminLoginView')

def adminLogout(request):
    logout(request)
    return redirect('adminMenuView')

# Invite Alpha/Beta testers
@permission_required(perm='is_superuser', login_url='/admin/login')
def invitationView(request):
    return render(request, 'management/invitation.html')

@permission_required(perm='is_superuser', login_url='/admin/login')
def sendInvitation(request):

    email = request.POST.get('email')

    # Create an Invitation
    got_code = False
    while got_code is False:
        code = generate_code()
        try:
            invitation = Invitation(email=email, code=code)
            invitation.save()
            got_code = True
        except IntegrityError:
            pass

    # Send Mail
    The_Subject = 'Invitation to my awesome web app!'
    Formatted_Message = render_to_string('email/invitation.html', {'email': email, 'code': code})
    Plain_Message = strip_tags(Formatted_Message)
    The_Sender = settings.EMAIL_HOST_USER
    The_Recipient = request.POST.get('email')

    send_mail(
        subject = The_Subject,
        message = Plain_Message,
        html_message = Formatted_Message,
        from_email = The_Sender,
        recipient_list = [The_Recipient],
        fail_silently = False
    )

    return redirect('invitationSentView')

@permission_required(perm='is_superuser', login_url='/admin/login')
def invitationSentView(request):
    return render(request, 'management/invitation_done.html')