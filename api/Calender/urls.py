from django.urls import path, include
from .api import CalenderApi
from .views import index, addEvent, createEvent, deleteEvent, editEvent, editEventView, viewEvent

urlpatterns = [
    path('/api', CalenderApi.as_view()),

    #Admin
    path('',index, name="calendersaint"),
    path('addEvent', addEvent, name="addEvent"),
    path('createEvent', createEvent, name="createEvent"),
	path('<int:pk>/delete/',deleteEvent ,name='deleteEvent'), 
    path('/<int:pk>/editEvent/',editEventView ,name='editViewEvent'), 
	path('/editEvent',editEvent ,name='editEvent1'), 
	path('/<int:pk>/view/',viewEvent ,name='viewEvent'), 
]
