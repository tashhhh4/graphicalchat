from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path
from django.contrib import admin
from django.conf.urls.static import static

urlpatterns = [
    # Main App
    path('', include('gcmain.urls')),

    # Login Sequence
    path('auth/', include('gclogin.urls')),

    # Built-in Auth Views & URLs
    path('auth/', include('django.contrib.auth.urls')),

        # /auth/login    .....   name = 'login'
        # /auth/logout   .....   name = 'logout'

    # Django Admin App
    path('admin/', admin.site.urls),
]

# Serve Assets Files from "/assets" during development
if settings.DEBUG:
    urlpatterns += static(settings.ASSETS_URL, document_root=settings.ASSETS_ROOT)