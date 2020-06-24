from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Calender
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import REDIRECT_FIELD_NAME
from django.contrib.auth.decorators import user_passes_test
from django.core.exceptions import PermissionDenied
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
    cal = Calender.objects.all().select_related()
    context  = {'cal':cal}
    return render(request, 'calender/calender.html', context)


@login_required
def addEvent(request):
    return render(request, 'calender/addEvent.html')

@login_required
def createEvent(request):
    post = Calender()
    post.title = request.GET.get('eventName',None)
    post.videoLink = request.GET.get('videoUrl',None)
    post.description = request.GET.get('description',None)
    post.startDate = request.GET.get('sdate',None)
    post.endDate = request.GET.get('edate',None)
    post.user =  request.user
    post.save()
    return JsonResponse({'message':'Event Added succesfully'},status=200)



@login_required
@admin_member_required(login_url='/accessdenied')
def deleteEvent(request, pk):
	user = Calender.objects.get(id = pk)
	print(user)
	user.delete()
	return redirect('/calender')

    

@login_required
@admin_member_required(login_url='/accessdenied')
def editEventView(request, pk):
	event1 = Calender.objects.get(id = pk)
	context = {'event1': event1}
	return render(request, 'calender/editEvent.html',context)


@login_required
def editEvent(request):
    print(request.POST.get('eventName'))
    post = Calender.objects.get(pk=request.POST.get('idval'))
    post.title = request.POST.get('eventName',None)
    post.videoLink = request.POST.get('videoUrl',None)
    post.description = request.POST.get('description',None)
    if request.POST.get('dateran',None) == "":
        post.save()
        return redirect('/calender')
    post.startDate = request.POST.get('dateran',None)
    post.endDate = request.POST.get('dateran',None)
    post.save()
    return redirect('/calender')

@login_required
@admin_member_required(login_url='/accessdenied')
def viewEvent(request,pk):
	event1 = Calender.objects.get(id=pk)
	return render(request, 'calender/viewEvent.html',{'event1':event1})
