from django.db import models

class Restaurant(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    localisation = models.TextField()

    def __str__(self):
        return self.name

class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    restaurant = models.ForeignKey(Restaurant, related_name='comments', on_delete=models.CASCADE)
    text = models.TextField()
    rating = models.IntegerField(default=0)

    def __str__(self):
        return f"Comment on {self.restaurant.name}: {self.text[:50]} : {self.rating}"
