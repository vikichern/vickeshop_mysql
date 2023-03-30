from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import BasePermission
from rest_framework.permissions import IsAuthenticated

from product.serializers import ProductSerializer

from .models import Product
from shop.decorators.log import logger_decorator



class IsStaff(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_staff



# ------------------------- PRODUCTS START ------------------------- #
@logger_decorator
@api_view(["GET"])
def products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)
# ------------------------- PRODUCTS END ------------------------- #



# ------------------------- SINGLE PRODUCT START ------------------------- #
@logger_decorator
@api_view(["GET"])
def single_product(request, pk = -1):
    try:
        product = Product.objects.get(pk = pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data, status = status.HTTP_200_OK)
    except Product.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)


@logger_decorator
@api_view(["GET"])
def search_product(request):
    product_name = request.GET.get("product_name", None)
    products = Product.objects.filter(product_name__icontains = product_name)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# ------------------------- SINGLE PRODUCT END ------------------------- #



 # ------------------------- PRODUCT START ------------------------- #
@logger_decorator
@api_view(["POST"])
@permission_classes([IsAuthenticated, IsStaff])
def product_post(request):
    if request.method == "POST":
        serializer = ProductSerializer(data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


@logger_decorator
@api_view(["PUT"])
@permission_classes([IsAuthenticated, IsStaff])
def product_patch(request, pk = -1):
    if request.method == "PUT":
        product = Product.objects.get(pk = pk)
        serializer = ProductSerializer(product, data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


@logger_decorator
@api_view(["DELETE"])
@permission_classes([IsAuthenticated, IsStaff])
def product_delete(request, pk = -1):
    if request.method == "DELETE":
        try:
            product = Product.objects.get(pk = pk)
            product.delete()
            return Response({"detail": f"'{product.product_name}' was successfully deleted."}, status = status.HTTP_204_NO_CONTENT)
        except Product.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)
 # ------------------------- PRODUCT END ------------------------- #
