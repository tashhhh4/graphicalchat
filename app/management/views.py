from django.shortcuts import render, redirect
from django.contrib.auth.decorators import permission_required
from django.contrib.auth import authenticate, login, logout

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