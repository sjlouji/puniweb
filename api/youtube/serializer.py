from rest_framework import  serializers
from rest_framework.permissions import IsAuthenticated   
from .models import Youtube, Payment
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password


# User serializer
class YoutubeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Youtube
        fields = '__all__'  



class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'  

    def create(self, validated_data):
        post = Payment.objects.create(razorpay_payment_id=validated_data['razorpay_payment_id'], razorpay_order_id=validated_data['razorpay_order_id'], razorpay_signature=validated_data['razorpay_signature'], currency=self.context["email"]['currency'],amount=self.context["email"]['amount'], entity=self.context["email"]['entity'],status=self.context["email"]['status'],invoice_id=self.context["email"]['invoice_id'],international=self.context["email"]['international'],method=self.context["email"]['method'],captured=self.context["email"]['captured'],description=self.context["email"]['description'],card_id=self.context["email"]['card_id'],bank=self.context["email"]['bank'],wallet=self.context["email"]['wallet'],vpa=self.context["email"]['vpa'],email=self.context["email"]['email'],contact=self.context["email"]['contact'],fee=self.context["email"]['fee'],tax=self.context["email"]['tax'],error_code=self.context["email"]['error_code'],error_description=self.context["email"]['error_description'],error_source=self.context["email"]['error_source'],error_step=self.context["email"]['error_step'],error_reason=self.context["email"]['error_reason'])
        return post


                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                                                                                                                                                                            