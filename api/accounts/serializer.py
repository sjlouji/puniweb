from rest_framework import  serializers
from rest_framework.permissions import IsAuthenticated   
from accounts.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password

# User serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


# Register serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','email','password', 'first_name', 'last_name')
        extra_kwargs = {
            'password':{'write_only': True},
        }
    
    def create(self, validated_data):
        user = User.objects.create_user(validated_data['email'], validated_data['password'], first_name=validated_data['first_name'], last_name=validated_data['last_name'])
        return user

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        print(data)
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields ='__all__'
        read_only_fields = ('id','email', 'last_login', 'is_superuser', 'is_staff', 'is_active','date_joined', 'groups','user_permissions')
    
