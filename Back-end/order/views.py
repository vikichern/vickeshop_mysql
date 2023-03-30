from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import BasePermission

from .serializers import GetOrderSerializer, PostOrderSerializer


from .models import Order
from shop.decorators.log import logger_decorator



class IsStaff(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_staff


@logger_decorator
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def order(request):
    if request.method == 'POST':
        for item in request.data["orderDetails"]:
            item["shipping_address"] = request.data["orderData"]["shipping_address"]
            serializer = PostOrderSerializer(data = item, context = {'user': request.user})
            if serializer.is_valid():
                serializer.save()
                print(serializer.data)
        return Response(serializer.data, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


@logger_decorator
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def orders_peruser(request):
    orders = Order.objects.filter(user_id=request.user.id)
    serializer = GetOrderSerializer(orders, many=True, context={'request': request})
    return Response(serializer.data)


@logger_decorator
@permission_classes([IsAuthenticated, IsStaff])
@api_view(["GET"])
def get_orders(request):
    orders = Order.objects.all()
    serializer = GetOrderSerializer(orders, many=True)
    return Response(serializer.data)
