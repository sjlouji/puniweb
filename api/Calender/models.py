from django.db import models
from django.conf import settings

class Calender(models.Model):
    title  =  models.TextField()
    startDate =  models.DateField()
    endDate =  models.DateField()
    description =  models.TextField(null=True)
    videoLink  = models.URLField(null=False, blank=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=1)
    create_on = models.DateTimeField(auto_now_add=True, null=True)