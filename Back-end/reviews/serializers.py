from rest_framework import serializers
from .models import Review
 
 
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['user']
        return Review.objects.create(**validated_data, user = user)
