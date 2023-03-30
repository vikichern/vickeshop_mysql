from django.db import models
from django.contrib.auth.models import User
from product.models import Product



class Review(models.Model):
    product = models.ForeignKey(Product, on_delete = models.SET_NULL, null = True)
    user = models.ForeignKey(User, on_delete = models.SET_NULL, null = True)
    name = models.CharField(max_length = 25)
    rating = models.IntegerField(null = True, blank = True, default = 0)
    comment = models.TextField(max_length = 100, null = True, blank = True)
    createdAt = models.DateTimeField(auto_now_add = True)
    picture = models.ImageField(blank = True, null = True)

    def __str__(self):
        return str(self.rating)
