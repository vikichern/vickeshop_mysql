from django.db import models
from django.contrib.auth.models import User


class ProfileManager(models.Manager):
    def get_or_create_profile(self, user):
        try:
            profile = self.get(user = user)
        except Profile.DoesNotExist:
            profile = self.create(user = user)
        return profile


class Profile(models.Model):
    profile_id = models.AutoField(primary_key = True)
    user = models.OneToOneField(User, on_delete = models.SET_NULL, null = True)
    first_name = models.CharField(max_length = 20, blank = True, null = True)
    last_name = models.CharField(max_length = 20, blank = True, null = True)
    bio = models.TextField(max_length = 50, blank = True, null = True)
    location = models.CharField(max_length = 30, blank = True, null = True)
    picture = models.ImageField(blank = True, null = True)
    objects = ProfileManager()
    
    def __init__(self, *args, **kwargs):
        super(Profile, self).__init__(*args, **kwargs)

    def __str__(self):
        return self.user
