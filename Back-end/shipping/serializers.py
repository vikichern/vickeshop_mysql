from rest_framework import serializers
from .models import Shipping



class ShippingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipping
        fields = '__all__'
     
    def create(self, validated_data):
        user = self.context['user']
        return Shipping.objects.create(**validated_data, user = user)
