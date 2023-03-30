from django.urls import path
from . import views



urlpatterns = [
    path('get_categories/', views.get_categories),
    path('categories/', views.categories),
    path('categories/<int:pk>/', views.categories),
    path('single_category/<int:pk>/', views.single_category),
    path('category_products/<int:pk>/', views.category_products)
]
