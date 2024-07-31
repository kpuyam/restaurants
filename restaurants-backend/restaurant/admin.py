from django.contrib import admin
from .models import Restaurant

# Register your models here.

@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ('restaurant_name', 'gbl_restaurant_no', 'restaurant_owner_id', 'is_active')
    search_fields = ('restaurant_name', 'gbl_restaurant_no')
    list_filter = ('is_active', 'restaurant_open_date', 'restaurant_close_date')
    ordering = ('restaurant_name',)
