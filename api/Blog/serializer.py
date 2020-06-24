from rest_framework import  serializers
from rest_framework.permissions import IsAuthenticated   
from .models import Post
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'



class AddBlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"
    
    def create(self, validated_data):
        post = Post.objects.create(title=validated_data['title'], meta_description=validated_data['meta_description'], content=validated_data['content'], keywords=validated_data['keywords'],user=validated_data['user'])
        return post
