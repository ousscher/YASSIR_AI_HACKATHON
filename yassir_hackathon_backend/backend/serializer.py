from rest_framework import serializers
from .models import Restaurant, Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'restaurant', 'text']

class RestaurantSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    avgRating = serializers.SerializerMethodField()

    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'localisation', 'comments', 'avgRating']

    def get_avgRating(self, obj):
        comments = obj.comments.all()
        ratings = [comment.rating for comment in comments]
        
        if ratings:  
            average_rating = sum(ratings) / len(ratings)
            # avgRating = (average_rating / 5) * 100
            return round(average_rating, 2)  
        else:
            return 0  

