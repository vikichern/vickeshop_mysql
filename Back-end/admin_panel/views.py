from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import BasePermission

from profile_user.serializers import ProfileSerializer
from shipping.serializers import ShippingSerializer
from reviews.serializers import ReviewSerializer
from order.serializers import GetOrderSerializer

from profile_user.models import Profile
from shipping.models import Shipping
from reviews.models import Review
from order.models import Order

from django.contrib.auth.models import User
from shop.decorators.log import logger_decorator



class IsStaff(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_staff
    

# ------------------------- ADMIN PANEL START ------------------------- #
@logger_decorator
@api_view(["GET"])
@permission_classes([IsAuthenticated, IsStaff])
def user_details_profiles(request):
    try:
        all_profiles = Profile.objects.all()
        serializer = ProfileSerializer(all_profiles, many = True)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    

@logger_decorator
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_details_single_profile(request, pk = -1):
    single_profile = Profile.objects.get(pk = pk)
    serializer = ProfileSerializer(single_profile)
    return Response(serializer.data, status = status.HTTP_200_OK)


@logger_decorator
@api_view(["PUT"])
@permission_classes([IsAuthenticated, IsStaff])
def user_details_update_profile(request, pk = -1):
    if request.method == "PUT":
        profile = Profile.objects.get(pk = pk)
        serializer = ProfileSerializer(profile, data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


@logger_decorator
@api_view(["GET"])
@permission_classes([IsAuthenticated, IsStaff])
def user_details_addresses(request, pk = -1):
    try:
        user = User.objects.get(id = pk)
        shipping = Shipping.objects.filter(user = user)
        serializer = ShippingSerializer(shipping, many = True)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    

@logger_decorator
@api_view(["PUT"])
@permission_classes([IsAuthenticated, IsStaff])
def user_details_update_address(request, pk = -1):
    if request.method == "PUT":
        address = Shipping.objects.get(pk = pk)
        serializer = ShippingSerializer(address, data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    

@logger_decorator
@api_view(["GET"])
@permission_classes([IsAuthenticated, IsStaff])
def user_details_reviews(request, pk = -1):
    try:
        user = User.objects.get(id = pk)
        reviews = Review.objects.filter(user = user)
        serializer = ReviewSerializer(reviews, many = True)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    
    

@logger_decorator
@api_view(["GET"])
@permission_classes([IsAuthenticated, IsStaff])
def user_details_single_review(request, pk = -1):
    review = Review.objects.get(pk = pk)
    serializer = ReviewSerializer(review)
    return Response(serializer.data)
    

@logger_decorator
@api_view(["PUT"])
@permission_classes([IsAuthenticated, IsStaff])
def user_details_update_review(request, pk = -1):
    if request.method == "PUT":
        review = Review.objects.get(pk = pk)
        serializer = ReviewSerializer(review, data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    

@logger_decorator
@api_view(["GET"])
@permission_classes([IsAuthenticated, IsStaff])
def user_details_orders(request, pk = -1):
    try:
        user = User.objects.get(id = pk)
        orders = Order.objects.filter(user = user)
        serializer = GetOrderSerializer(orders, many = True)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
# ------------------------- ADMIN PANEL END ------------------------- #
