from django.urls import path
from . import views



urlpatterns = [
    path('address/', views.shipping),
    path('shipping_get/', views.shipping_get),
    path('shipping_get/<int:pk>/', views.shipping_get),
    path('shipping_update/', views.shipping_update),
    path('shipping_update/<int:pk>/', views.shipping_update),
    path('shipping_delete/', views.shipping_delete),
    path('shipping_delete/<int:pk>/', views.shipping_delete)
]
