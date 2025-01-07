from django.contrib import admin

# Register your models here.


from django.contrib import admin
from .models import Restaurant, Comment

class CommentInline(admin.TabularInline):
    model = Comment
    extra = 1  

@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'localisation')  
    search_fields = ('name',)  
    inlines = [CommentInline] 

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'restaurant', 'text')  
    search_fields = ('text', 'restaurant__name')  
    list_filter = ('restaurant',) 
