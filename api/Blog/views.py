from django.shortcuts import render,  redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from  .models import Post
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
    post = Post.objects.all().select_related('user')
    context = {'post':post}
    print(context)
    for con in post:
        print(con.user.email)
    return render(request, 'blog/blog.html',context)


@login_required
def addBlog(request):
    return render(request, 'blog/addBlog.html')


@login_required
def createBlog(request):
    post = Post()
    post.title = request.GET.get('title',None)
    post.meta_description = request.GET.get('metadescription',None)
    post.content = request.GET.get('content',None)
    post.status = request.GET.get('status',None)
    post.keywords = request.GET.get('keyword',None)
    post.slug = request.GET.get('slug',None)
    post.coverImage = request.GET.get('coverimage',None)
    post.user =  request.user
    post.save()
    return JsonResponse({'message':'Blog Added succesfully'},status=200)



@login_required
@admin_member_required(login_url='/accessdenied')
def deletePost(request, pk):
	user = Post.objects.get(id = pk)
	print(user)
	user.delete()
	return redirect('/blog')

@login_required
@admin_member_required(login_url='/accessdenied')
def editBlogView(request, pk):
	blog1 = Post.objects.get(id = pk)
	context = {'blog1': blog1}
	return render(request, 'blog/editBlog.html',context)


@login_required
def editBlog(request):
    print(request.POST)
    post = Post.objects.get(pk=request.POST.get('blogId'))
    post.title = request.POST.get('productTitle',None)
    post.meta_description = request.POST.get('metadescription',None)
    post.content = request.POST.get('content',None)
    post.status = request.POST.get('status',None)
    post.keywords = request.POST.get('keyword',None)
    post.slug = request.POST.get('slug',None)
    post.coverImage = request.POST.get('coverImage',None)
    post.save()
    return redirect('/blog')

@login_required
@admin_member_required(login_url='/accessdenied')
def viewBlog(request,pk):
	blog1 = Post.objects.get(id=pk)
	return render(request, 'blog/viewBlog.html',{'blog1':blog1})
