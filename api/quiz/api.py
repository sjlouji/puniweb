from rest_framework import generics, permissions, mixins
from rest_framework.response import Response
from .serializer import QuizSerializer, UserDataQuizSerializer, UserDataQuizViewSerializer
from .models import Quiz, UserQuiz


class QuizApiView(generics.ListCreateAPIView):
    permission_classes = [
        permissions.AllowAny,
    ]
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    def list(self, request):
        queryset = self.get_queryset()
        serializer = QuizSerializer(queryset, many=True)
        return Response(serializer.data)


class AddQuizData(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserDataQuizSerializer
    def post(self, request, *args,  **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        print(request)    
        post = serializer.save()
        return Response({
            "post": UserDataQuizSerializer(post, context=self.get_serializer_context()).data,
        })

class QuizUserData(generics.ListCreateAPIView):
    permission_classes = [
        permissions.AllowAny,
    ]
    queryset = UserQuiz.objects.all()
    serializer_class = UserDataQuizViewSerializer
    def list(self, request):
        queryset = self.get_queryset()
        serializer = UserDataQuizViewSerializer(queryset, many=True)
        return Response(serializer.data)
