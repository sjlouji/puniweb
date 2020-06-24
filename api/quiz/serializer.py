from rest_framework import  serializers
from rest_framework.permissions import IsAuthenticated   
from .models import Category, Quiz, Questions, Choice, UserQuiz
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password


class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'

    def to_representation(self, instance):
       response = super().to_representation(instance)
       response['category'] = CategorySerializer(instance.category).data 
       response['questions'] = QuestionsSerializer(instance.questions, many=True).data 
       return response

class QuestionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields = '__all__'
    
    def to_representation(self, instance):
       response = super().to_representation(instance)
       response['choices'] = ChoiceSerializer(instance.choices,many=True).data 
       return response


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'


class UserDataQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserQuiz
        fields = "__all__"
    def create(self, validated_data):
        print(validated_data)
        quiz = UserQuiz.objects.create(quiz_id=validated_data['quiz_id'],quiz_det=validated_data['quiz_id'], obtained_mark=validated_data['obtained_mark'], user=validated_data['user'],attempt=validated_data['attempt'],passStatus=validated_data['passStatus'] )
        return quiz


class UserDataQuizViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserQuiz
        fields = '__all__'

    def to_representation(self, instance):
       response = super().to_representation(instance)
       response['quiz_det'] = QuizSerializer(instance.quiz_det).data 
       return response