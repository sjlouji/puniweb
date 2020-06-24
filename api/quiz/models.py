from django.db import models
from django.contrib.auth.models import User
from django.conf import settings




class Category(models.Model):
    category = models.CharField(max_length=70, null=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,null=True) 
    def __str__(self):
        return self.category



class Choice(models.Model):
    choices = models.CharField(max_length=1000)
    answer = models.BooleanField(default=False)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,null=True) 

    def __str__(self):
        return self.choices


class Questions(models.Model):
    question = models.CharField(max_length=1000)
    mark = models.IntegerField()
    choices = models.ManyToManyField(Choice, null=True, blank = True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,null=True)
    def __str__(self):
        return self.question

class Quiz(models.Model):
    quiz_name = models.CharField(max_length=1000)
    video_id = models.ForeignKey("youtube.Youtube",  on_delete=models.CASCADE,null=True)
    questions_count = models.IntegerField(default=0)
    description = models.CharField(max_length=70, null=True)
    created = models.DateTimeField(auto_now_add=True)
    category  =  models.ForeignKey(Category, on_delete=models.CASCADE,null=True)
    questions = models.ManyToManyField(Questions)
    slug = models.SlugField()
    time = models.IntegerField(null=True, default=60000)
    pass_mark = models.IntegerField()
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,null=True)
    class Meta:
        ordering = ['created']
    def __str__(self):
        return self.quiz_name


class UserQuiz(models.Model):
    quiz_id = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    quiz_det = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name="details",  null=True)
    obtained_mark = models.IntegerField()
    percentage = models.IntegerField(null=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    attempt = models.IntegerField(default=0, null=True)
    lastAttemptTime = models.DateTimeField(auto_now_add=True, null=True)
    passStatus = models.BooleanField(default=False)
    attemptTime = models.DateTimeField(auto_now_add=True,null=True)
    
