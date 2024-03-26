from django.contrib import admin

# temp - for testing
from .models import GCUser, Invitation
admin.site.register(GCUser)
admin.site.register(Invitation)