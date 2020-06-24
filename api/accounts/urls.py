from django.urls import path, include
from .api import RegisterApi, LoginApi, UserApi, ProfileUpdateApi
from knox import views as knox_views
from . import views

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterApi.as_view()),
    path('api/auth/login', LoginApi.as_view()),
    path('api/auth/user', UserApi.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/auth/<int:id>/edit', ProfileUpdateApi.as_view()),

    #Admin view
    path('', views.index, name='profile'),
	path('user', views.users_view, name='listusers'),
    path('user/adduser',views.adduser, name='adduser'),
	path('user/adduser/createuser', views.createuser, name="createuser"),
	path('<int:pk>/delete/',views.deleteuser ,name='deleteuser'), 
	path('<int:pk>/blockuser/',views.blockuser ,name='blockuser'), 
	path('<int:pk>/unblockuser/',views.unblockuser ,name='unblockuser'), 
	path('<int:pk>/editUser/',views.editView ,name='editView'), 
	path('/editUser',views.editUser ,name='editUser'), 
	path('<int:pk>/view/',views.viewuser ,name='viewuser'), 
]
