from django.shortcuts import render
from django.conf import settings

def mainAppView(request):
    context = {};
    context['ASSETS_URL'] = settings.ASSETS_URL

    return render(request, 'gcmain/index.html', context)


def debugPageView(request):
    context = {};
    context['ASSETS_URL'] = settings.ASSETS_URL

    return render(request, 'gcmain/debug.html', context)