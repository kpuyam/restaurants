from rest_framework import serializers
from .models import Restaurant

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = '__all__'
        extra_kwargs = {
            'restaurant_close_date': {'required': False, 'allow_null': True},
        }
        read_only_fields = ['id']
