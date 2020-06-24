from rest_framework import generics, permissions, mixins
from rest_framework.response import Response
from knox.models import AuthToken
from .serializer import YoutubeSerializer, PaymentSerializer
from .models import Youtube
from rest_framework import filters
from rest_framework.decorators import api_view
import razorpay
from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination


class YoutubeGetApi(generics.ListCreateAPIView):

    permission_classes = [
        permissions.AllowAny,
    ]

    queryset = Youtube.objects.all()
    serializer_class = YoutubeSerializer

    def list(self, request):
        queryset = self.get_queryset()
        serializer = YoutubeSerializer(queryset, many=True)
        return Response(serializer.data)

class SearchApi(generics.ListAPIView):
    queryset = Youtube.objects.all()
    serializer_class = YoutubeSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'description']
    


class PaymentApi(generics.GenericAPIView):
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = PaymentSerializer

    def post(self, request, *args,  **kwargs):
        client = razorpay.Client(auth=("rzp_test_qIsGhLQiOFUXFJ", "RNVDU0wsdP9eZOX55n9eLepj"))
        payment_id = request.data["razorpay_payment_id"]
        resp = client.payment.fetch(payment_id)
        serializer = PaymentSerializer(data=request.data,  context={'email': resp})
        serializer.is_valid(raise_exception=True), 
        post = serializer.save()
        return Response({
            "post": PaymentSerializer(post, context=self.get_serializer_context()).data,
        })


