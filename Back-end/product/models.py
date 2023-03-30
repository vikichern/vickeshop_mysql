from django.db import models
from category.models import Category



class Product(models.Model):
    product_name = models.CharField(max_length = 40)
    description = models.TextField(max_length = 255)
    price = models.DecimalField(max_digits = 6, decimal_places = 2)
    picture = models.ImageField(blank = True, null = True, default = '/placeholder.png')
    time_created = models.DateTimeField(auto_now_add = True)
    category = models.ForeignKey(Category, on_delete = models.SET_NULL, null = True, blank = True, related_name = "products")

    def __str__(self):
        return self.description
