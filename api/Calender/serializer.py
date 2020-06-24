from rest_framework import  serializers
from rest_framework.permissions import IsAuthenticated   
from .models import Calender
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password

class CalenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calender
        fields = '__all__'