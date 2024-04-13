from django.shortcuts import render
from django.conf import settings
from django.contrib.auth.decorators import login_required

@login_required
def mainAppView(request):
    context = {};
    context['ASSETS_URL'] = settings.ASSETS_URL

    return render(request, 'gcmain/gcmain.html', context)

@login_required
def debugPageView(request):
    context = {};
    context['ASSETS_URL'] = settings.ASSETS_URL

    return render(request, 'gcmain/debug.html', context)

@login_required
def uiTestView(request):
    return render(request, 'gcmain/ui_test.html')