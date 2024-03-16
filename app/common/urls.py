from django.urls import include, path
from django.contrib import admin

urlpatterns = [
    # Main App
    path('', include('gcmain.urls')),

    # Login Sequence
    path('authentication/', include('gclogin.urls')),

    # Django Admin App
    path('admin/', admin.site.urls),
]