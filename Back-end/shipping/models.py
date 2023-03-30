from django.contrib.auth.models import User
from django.db import models



class Shipping(models.Model):
    first_name = models.CharField(max_length = 50)
    last_name = models.CharField(max_length = 50)
    address = models.CharField(max_length = 50)
    city = models.CharField(max_length = 50)
    state = models.CharField(max_length = 50)
    postal_code = models.DecimalField(max_digits = 9, decimal_places = 0)
    country = models.CharField(max_length = 50)
    user = models.ForeignKey(User, on_delete = models.SET_NULL, null = True)
    

    def __str__(self):
        return str(self.address)
