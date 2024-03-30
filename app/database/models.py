from django.db import models

# User
# auth, login, logout
from django.contrib.auth.models import User

# Profile
# customization, settings, and chat save data
# and relationships with other Profiles
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

# Invitation
class Invitation(models.Model):
    email = models.CharField(max_length=255)
    code = models.CharField(max_length=14, unique=True)
    date_sent = models.DateTimeField(auto_now_add=True)