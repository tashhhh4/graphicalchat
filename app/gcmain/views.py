from django.shortcuts import render


def mainAppView(request):

    # temp
    context = {};
    context['django_server_message'] = 'This is a message from views.py  We are running the template using our django development server on port 8000.'

    return render(request, 'gcmain/index.html', context)