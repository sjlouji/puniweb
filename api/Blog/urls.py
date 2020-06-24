from django.urls import path, include
from .api import AddBlog, ViewBlog, BlogUpdataApi
from .views import index, addBlog, createBlog, deletePost, editBlogView, editBlog, viewBlog

urlpatterns = [
    path('/api',ViewBlog.as_view()),
    path('/api/addBlog', AddBlog.as_view()),
    path('/api/<int:id>', BlogUpdataApi.as_view()),

    #admin
    path('',index, name="blog"),
    path('/addBlog', addBlog, name="addBlog"),
    path('/createBlog', createBlog, name="createBlog"),
	path('/<int:pk>/delete/',deletePost ,name='deletePost'), 
    path('/<int:pk>/editBlog/',editBlogView ,name='editViewBlog'), 
	path('/editBlog',editBlog ,name='editBlog'), 
	path('/<int:pk>/view/',viewBlog ,name='viewBlog'), 
]
