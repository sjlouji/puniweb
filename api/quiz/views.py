from django.shortcuts import render, redirect
from django.contrib.auth import REDIRECT_FIELD_NAME
from django.contrib.auth.decorators import user_passes_test
from django.core.exceptions import PermissionDenied
from django.contrib.auth.decorators import login_required
from .models import Category, Choice, Questions, Quiz, Category, UserQuiz
from youtube.models import Youtube
from Calender.models import Calender
from django.http import JsonResponse

# Create your views here.
def staff_member_required(view_func=None, redirect_field_name=REDIRECT_FIELD_NAME,login_url='/accounts/login'):
    actual_decorator = user_passes_test(
        lambda u: u.is_active and u.is_staff,
        login_url=login_url,
        redirect_field_name=redirect_field_name
    )
    if view_func:
        return actual_decorator(view_func)
    return actual_decorator

def admin_member_required(view_func=None, redirect_field_name=REDIRECT_FIELD_NAME,login_url='/accounts/login'):
    actual_decorator = user_passes_test(
        lambda u: u.is_active and u.is_admin,
        login_url=login_url,
        redirect_field_name=redirect_field_name
    )
    if view_func:
        return actual_decorator(view_func)
    return actual_decorator

def superadmin_member_required(view_func=None, redirect_field_name=REDIRECT_FIELD_NAME,login_url='/accounts/login'):
    actual_decorator = user_passes_test(
        lambda u: u.is_active and u.is_superuser,
        login_url=login_url,
        redirect_field_name=redirect_field_name
    )
    if view_func:
        return actual_decorator(view_func)
    return actual_decorator

@login_required
def index(request):
    quiz = Quiz.objects.all().select_related('video_id').select_related('category')
    context = {'quiz':quiz}
    return render(request, 'Quiz/quiz.html', context)

@login_required
def indexChoice(request):
    quiz = Choice.objects.all().select_related('created_by')
    context = {'quiz':quiz}
    return render(request, 'Quiz/choice.html', context)

@login_required
def indexQuestion(request):
    quiz = Questions.objects.all().select_related('created_by')
    context = {'quiz':quiz}
    return render(request, 'Quiz/questions.html', context)

@login_required
def addQuiz(request):
    youtueb = Youtube.objects.all()
    questions = Questions.objects.all()
    category  = Category.objects.all()
    context={'youtue':youtueb,'questions':questions,'category':category}
    return render(request, 'Quiz/addQuiz.html', context)

@login_required
def addQuestion(request):
    choice = Choice.objects.all()
    context={'choice':choice}
    return render(request, 'Quiz/addQuestion.html', context)

@login_required
def addChoice(request):
    return render(request, 'Quiz/addChoice.html')


@login_required
def addChoiceToTable(request):
    choice = Choice()
    choice.choices = request.GET.get('name',None)
    choice.answer = request.GET.get('answer',None)
    choice.created_by = request.user
    choice.save()
    return JsonResponse({'message':'Choice Added succesfully'},status=200)


@login_required
def addQuestionToTable(request):
    question = Questions()
    question.question = request.GET.get('question_name',None)
    question.mark = request.GET.get('mark',None)
    question.created_by = request.user
    question.save()
    va = request.GET.lists()
    for key,val in va:
        pa = val
    for key,val in enumerate(pa):
        question.choices.add(val)
    return JsonResponse({'message':'Choice Added succesfully'},status=200)

@login_required
def addQuizToTable(request):
    print(request.GET.get('video_id',None))
    video_id =  Youtube.objects.get(id = request.GET.get('video_id'))
    category_id =  Category.objects.get(id = request.GET.get('category',None))
    print(video_id)
    quiz = Quiz()
    quiz.quiz_name = request.GET.get('quiz_name',None)
    quiz.video_id = (video_id)
    quiz.questions_count = 0
    quiz.description = request.GET.get('mark',None)
    quiz.category  =  (category_id)
    quiz.slug = 'quiz'
    quiz.time = request.GET.get('timeQuiz',None)
    quiz.pass_mark = request.GET.get('pass_mark',None)
    quiz.created_by = request.user
    quiz.save()
    va = request.GET.lists()
    for key,val in va:
        pa = val
    for key,val in enumerate(pa):
        quiz.questions.add(val)
    return JsonResponse({'message':'Choice Added succesfully'},status=200)




@login_required
@admin_member_required(login_url='/accessdenied')
def deleteChoice(request, pk):
	user = Choice.objects.get(id = pk)
	user.delete()
	return redirect('/quiz/choice')


@login_required
@admin_member_required(login_url='/accessdenied')
def deleteQustions(request, pk):
	user = Questions.objects.get(id = pk)
	user.delete()
	return redirect('/quiz/questions')


@login_required
@admin_member_required(login_url='/accessdenied')
def deleteQuiz(request, pk):
	user = Quiz.objects.get(id = pk)
	user.delete()
	return redirect('/quiz')

@login_required
@admin_member_required(login_url='/accessdenied')
def viewChoice(request,pk):
	blog1 = Choice.objects.get(id=pk)
	return render(request, 'quiz/viewChoice.html',{'blog1':blog1})

@login_required
@admin_member_required(login_url='/accessdenied')
def viewQuestion(request,pk):
	blog1 = Questions.objects.get(id=pk)
	return render(request, 'quiz/viewQuestion.html',{'blog1':blog1})

@login_required
@admin_member_required(login_url='/accessdenied')
def viewQuiz(request,pk):
	blog1 = Quiz.objects.get(id=pk)
	return render(request, 'quiz/viewQuiz.html',{'blog1':blog1})


@login_required
def editViewQuiz(request, pk):
    blog1 = Quiz.objects.get(id = pk)
    youtue = Youtube.objects.all()
    category  = Category.objects.all()
    questions = Questions.objects.all()
    return render(request, 'quiz/editQuiz.html', {'blog1':blog1,'youtue':youtue, 'category': category,'questions':questions})

@login_required
def editViewChoice(request, pk):
    blog1 = Choice.objects.get(id = pk)
    return render(request, 'quiz/editChoices.html', {'blog1':blog1})

@login_required
def editViewQuestions(request, pk):
    blog1 = Questions.objects.get(id = pk)
    choice = Choice.objects.all()
    return render(request, 'quiz/editQuestions.html', {'blog1':blog1,'choice':choice})


@login_required
def editQuiz(request):
    print("Quiz")
    youtube = Youtube.objects.get(id=request.POST.get('video_id',None))
    calender = Category.objects.get(id=request.POST.get('category',None))
    post = Quiz.objects.get(id=request.POST.get('idQuiz'))
    post.quiz_name = request.POST.get('quiz_name',None)
    post.video_id = youtube
    post.description = request.POST.get('description',None)
    post.category = calender
    post.time = request.POST.get('timeQuiz',None)
    post.pass_mark = request.POST.get('pass_mark',None)
    post.save()
    va = request.POST.lists()
    post.questions.clear()
    for key,val in va:
        pa = val
        sa = key
    for key,val in enumerate(pa):
        print(val)
        if sa == 'choicedata':
            print('prosite')
            post.questions.add(val)
        else:
            print('neg')
            post.questions.clear()
    return redirect('/quiz')

@login_required
def editChoice(request):
    print("choice")
    print(request.POST)
    post = Choice.objects.get(id=request.POST.get('choiceid'))
    post.choices = request.POST.get('choice_name',None)
    post.answer = request.POST.get('answer',None)
    post.save()
    print(post.answer)
    return redirect('/quiz/choice')

@login_required
def editQuestions(request):
    print("Question")
    print(request.POST)
    post = Questions.objects.get(id=request.POST.get('questionID'))
    post.question = request.POST.get('question_name',None)
    post.mark = request.POST.get('mark',None)
    post.save()
    va = request.POST.lists()
    post.choices.clear()
    for key,val in va:
        pa = val
        sa = key
    for key,val in enumerate(pa):
        print(val)
        if sa == 'choicedata':
            print('prosite')
            post.choices.add(val)
        else:
            print('neg')
            post.choices.clear()
    return redirect('/quiz/questions')

@login_required
def accomplishments(request):
    user = UserQuiz.objects.all()
    return render(request, 'Quiz/userDetails.html', {'usera':user})