from django.db import models

# User
from django.contrib.auth.models import User

# GCUser
class GCUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)