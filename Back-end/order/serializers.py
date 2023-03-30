from rest_framework import serializers
from .models import Order
from product.serializers import ProductSerializer
from shipping.serializers import ShippingSerializer

 

class GetOrderSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    shipping_address = ShippingSerializer()
    class Meta:
        model = Order
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['user']
        return Order.objects.create(**validated_data, user = user)
    

class PostOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['user']
        return Order.objects.create(**validated_data, user = user)
    