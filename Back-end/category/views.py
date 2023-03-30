from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from product.serializers import ProductSerializer
from .serializers import CategorySerializer

from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import BasePermission

from .models import Category
from shop.decorators.log import logger_decorator



class IsStaff(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_staff
    

# ------------------------- CATEGORIES START ------------------------- #
@logger_decorator
@api_view(["POST", "PUT", "DELETE"])
@permission_classes([IsAuthenticated, IsStaff])
def categories(request, pk = -1):
    if request.method == "POST":
        serializer = CategorySerializer(data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

    
    if request.method == "PUT":
        category = Category.objects.get(pk = pk)
        serializer = CategorySerializer(category, data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


    if request.method == "DELETE":
        try:
            category = Category.objects.get(pk = pk)
            category.delete()
            return Response({"detail": f"'{category.category_name}' was successfully deleted."}, status = status.HTTP_204_NO_CONTENT)
        except Category.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)
        
        
@logger_decorator
@api_view(["GET"])
def get_categories(request):
    if request.method == "GET":
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many = True)
        return Response(serializer.data)
# ------------------------- CATEGORIES END ------------------------- #



# ------------------------- SINGLE CATEGORY START ------------------------- #
@logger_decorator
@api_view(["GET"])
def single_category(request, pk = -1):
    if request.method == "GET":
        single_category = Category.objects.get(pk = pk)
        serializer = CategorySerializer(single_category)
        return Response(serializer.data, status = status.HTTP_200_OK)
# ------------------------- SINGLE CATEGORY END ------------------------- #



# ------------------------- CATEGORY PRODUCTS START ------------------------- #
@logger_decorator
@api_view(["GET"])
def category_products(request, pk):
    try:
        category = Category.objects.get(pk = pk)
        products = category.products.all()
        serializer = ProductSerializer(products, many = True)
        return Response(serializer.data)
    except Category.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
# ------------------------- CATEGORY PRODUCTS END ------------------------- #

