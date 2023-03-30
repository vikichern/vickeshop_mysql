from django.urls import path
from . import views



urlpatterns = [
    path('review_post/', views.review_post),
    path('reviews_product/<int:pk>/', views.reviews_product),
    path('reviews_user/', views.reviews_user),
    path('review_delete/<int:pk>/', views.review_delete),
    path('review_userdelete/<int:pk>/', views.review_userdelete),
    path('review_update/<int:pk>/', views.review_update)
]
