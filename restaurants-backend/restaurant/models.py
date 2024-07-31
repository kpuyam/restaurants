from django.db import models

# Create your models here.

class Restaurant(models.Model):
    id = models.AutoField(primary_key=True)
    gbl_restaurant_no = models.IntegerField()
    restaurant_name = models.CharField(max_length=255)
    restaurant_address = models.TextField()
    restaurant_owner_id = models.IntegerField()
    restaurant_open_date = models.DateField()
    restaurant_close_date = models.DateField(null=True, blank=True)
    longitude = models.FloatField()
    latitude = models.FloatField()
    is_active = models.BooleanField()

    def save(self, *args, **kwargs):
        if self.is_active and self.restaurant_close_date:
            raise ValueError("Active restaurants cannot have a close date.")
        super().save(*args, **kwargs)

    def __str__(self):
        return self.restaurant_name
