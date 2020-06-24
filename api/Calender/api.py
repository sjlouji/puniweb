from rest_framework import generics, permissions, mixins
from rest_framework.response import Response
from .serializer import CalenderSerializer
from .models import Calender



class CalenderApi(generics.ListCreateAPIView):
    permission_classes = [
        permissions.AllowAny,
    ]
    queryset = Calender.objects.all()
    serializer_class = CalenderSerializer
    def list(self, request):
        queryset = self.get_queryset()
        serializer = CalenderSerializer(queryset, many=True)
        return Response(serializer.data)

