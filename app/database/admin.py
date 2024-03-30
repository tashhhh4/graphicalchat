from django.contrib import admin

# temp - for testing
from .models import Profile, Invitation
admin.site.register(Profile)
admin.site.register(Invitation)