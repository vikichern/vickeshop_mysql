from django.urls import path
from . import views



urlpatterns = [
    path('user_details_profiles/', views.user_details_profiles),
    path('user_details_single_profile/<int:pk>/', views.user_details_single_profile),
    path('user_details_update_profile/<int:pk>/', views.user_details_update_profile),

    path('user_details_addresses/<int:pk>/', views.user_details_addresses),
    path('user_details_update_address/<int:pk>/', views.user_details_update_address),

    path('user_details_reviews/<int:pk>/', views.user_details_reviews),
    path('user_details_single_review/<int:pk>/', views.user_details_single_review),
    path('user_details_update_review/<int:pk>/', views.user_details_update_review),
    
    path('user_details_orders/<int:pk>/', views.user_details_orders)
    
]
