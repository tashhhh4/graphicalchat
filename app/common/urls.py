from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path
from django.contrib import admin
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views

urlpatterns = [
    # Main App
    path('', include('gcmain.urls')),

    # Login Sequence
    path('authentication/', include('gclogin.urls')),

    # Built-in Auth Views
    path('authentication/logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('authentication/login/', auth_views.LoginView.as_view(), name='login'),

    # Django Admin App
    path('admin/', admin.site.urls),
]

# Serve Assets Files from "/assets" during development
if settings.DEBUG:
    urlpatterns += static(settings.ASSETS_URL, document_root=settings.ASSETS_ROOT)