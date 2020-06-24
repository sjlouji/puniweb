from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import SignUpForm
from .models import User
import logging
from django.contrib.auth.hashers import make_password
from django.contrib import messages
from django.db import IntegrityError
from django.contrib.auth.decorators import login_required
from django.contrib.auth import REDIRECT_FIELD_NAME
from django.contrib.auth.decorators import user_passes_test
from django.core.exceptions import PermissionDenied
from youtube.models import Youtube
from Blog.models import Post

logger = logging.getLogger('Alina')

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

def signup_view(request):
	if request.method == "POST":
		form = SignUpForm(request.POST)
		if form.is_valid():
			user = form.save()
			email = form.cleaned_data.get('email')
			password = form.cleaned_data.get('password1')
			user = authenticate(email=email, password=password)
			login(request, user)
			return redirect('/control')
		else:
			messages.error(request, 'Correct the errors below')
	else:
		form = SignUpForm()	
		if request.user.is_authenticated:
			return redirect('/control')
		else: 
			return render(request,'registration/signup.html',{'form': form})

@login_required
@staff_member_required()
def index(request):
    vcount = Youtube.objects.all().count()
    pcount = Post.objects.all().count()
    context = {'vcount':vcount,'pcount':pcount}
    return render(request, 'profile/profile.html',context)


@login_required
@staff_member_required(login_url='/accessdenied')
def dashboard_view(request):
	return render(request, 'index.html')

@login_required
def home_view(request):
	return render(request, 'registration/login.html')

@login_required
@admin_member_required(login_url='/accessdenied')
def users_view(request):
	context = {'users_list':User.objects.all()}
	return render(request,'users/users.html',context)

@login_required
@admin_member_required(login_url='/accessdenied')
def adduser(request):
	return render(request, 'users/adduser.html')

@login_required
@admin_member_required(login_url='/accessdenied')
def createuser(request):
	if request.method == "POST":
		name = request.POST.get('selectedRole')
		password = request.POST.get('password')
		conpasswordx = request.POST.get('confpassword')
		if password == conpasswordx:
			try:
				if name == 'Admin':
					print(request.POST.get(request.POST.get('role')))
					user = User()
					user.first_name = request.POST.get('first_name')
					user.last_name = request.POST.get('last_name')
					user.email = request.POST.get('email')	
					user.password = make_password(request.POST.get('password'))	
					user.is_admin = True
					user.is_staff = True
					user.save()
				elif name == 'Staff':
					print(request.POST.get(request.POST.get('role')))
					user = User()
					user.first_name = request.POST.get('first_name')
					user.last_name = request.POST.get('last_name')
					user.email = request.POST.get('email')	
					user.password = make_password(request.POST.get('password'))	
					user.is_staff = True
					user.save()
				else: 
					print(request.POST.get(request.POST.get('role')))
					user = User()
					user.first_name = request.POST.get('first_name')
					user.last_name = request.POST.get('last_name')
					user.email = request.POST.get('email')	
					user.password = make_password(request.POST.get('password'))	
					user.save()
				messages.info(request, 'User has beed created successfully')
				return redirect('/user/adduser')
			except IntegrityError as e:
				messages.error(request, e)
				return redirect('/user/adduser')
		else: 
			messages.error(request, 'Password did not match')
			return redirect('/user/adduser')
		
@login_required
@admin_member_required(login_url='/accessdenied')
def deleteuser(request, pk):
	user = User.objects.get(id = pk)
	print(user)
	user.delete()
	return redirect('/user')

@login_required	
@staff_member_required(login_url='/accessdenied')
def blockuser(request, pk):
	user = User.objects.get(id = pk)
	user.is_active = False
	user.save()
	return redirect('/user')

@login_required
@staff_member_required(login_url='/accessdenied')
def unblockuser(request, pk):
	user = User.objects.get(id = pk)
	user.is_active = True
	user.save()
	return redirect('/user')

@login_required
@admin_member_required(login_url='/accessdenied')
def editView(request, pk):
	user1 = User.objects.get(id = pk)
	context = {'user1': user1}
	return render(request, 'users/editUser.html',context)

@login_required
@admin_member_required(login_url='/accessdenied')
def editUser(request):
	if request.method == "POST":
		post = request.POST.get('selectedRole')
		print(request.POST)
		try:
			if post == 'Admin':
				print(request.POST.get(request.POST.get('iduser')))
				user = User.objects.get(id = request.POST.get('iduser'))
				user.first_name = request.POST.get('first_name')
				user.last_name = request.POST.get('last_name')
				user.email = request.POST.get('email')	
				user.is_admin = True
				user.is_staff = True
				user.save()
			elif post == 'Staff':
				print(request.POST.get(request.POST.get('role')))
				user = User.objects.get(id = request.POST.get('iduser'))
				user.first_name = request.POST.get('first_name')
				user.last_name = request.POST.get('last_name')
				user.email = request.POST.get('email')	
				user.is_staff = True
				user.is_admin = False
				user.save()
			else: 
				print(request.POST.get(request.POST.get('role')))
				user = User.objects.get(id = request.POST.get('iduser'))
				user.first_name = request.POST.get('first_name')
				user.last_name = request.POST.get('last_name')
				user.email = request.POST.get('email')	
				user.is_admin = False
				user.is_staff = False
				user.save()
			messages.info(request, 'User has beed created successfully')
			return redirect('/user')
		except IntegrityError as e:
			messages.error(request, e)
			return redirect('/user')

@login_required
def viewuser(request,pk):
	userdetails = User.objects.get(id=pk)
	return render(request, 'users/viewuser.html',{'userdetails':userdetails})

def accessdenied(request):
	return render(request,'error/403.html')



def forbidder(request,exception):
	return render(request,'error/403.html', status = 403)

def notfound(request):
	return render(request,'error/404.html', status = 404)

def servererror(request):
	return render(request,'error/500.html', status = 500)

def badrequest(request):
	return render(request,'error/400.html', status = 400)