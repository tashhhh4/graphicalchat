from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.contrib import messages as dj_messages
from django.conf import settings

def loginView(request):
    return render(request, 'login.html')

def unlockAlphaPassword(request):
    if request.method == 'POST':
        password = request.POST.get('password')
        if password == settings.ALPHA_PASSWORD:
            request.session['password_ok'] = True
            return redirect('')
        else:
            dj_messages.error(request, 'The password was wrong. Please try again. If you would like an invitation, please contact the developer at tash@artoftash.com')
            return redirect('alpha_password_view')

def alphaPasswordView(request):
    if request.method == 'POST':
        password = request.POST.get('password')
        if password == 'temp_password':
            request.session['password_ok'] = True
            return HttpResponseRedirect('/')
        else:
            dj_messages.error(request, 'The password was wrong. Please try again. If you would like an invitation, please contact the developer at tash@artoftash.com')
    return render(request, 'gclogin/alpha_password_lock.html')