from django.db import models

# User
from django.contrib.auth.models import User

# GCUser
class GCUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

# Invitation
class Invitation(models.Model):
    email = models.CharField(max_length=255)
    code = models.CharField(max_length=14)
    date_sent = models.DateTimeField(auto_now_add=True)