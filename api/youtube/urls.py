from django.urls import path, include
from .api import YoutubeGetApi, SearchApi, PaymentApi
from .views import index, sync, deleteVideo, viewVideo, addTranscrip, addoredittranscript


urlpatterns = [
    path('/api', YoutubeGetApi.as_view()),
    path('/api/find', SearchApi.as_view()),
    path('/api/payment', PaymentApi.as_view()),

    #Admin
    path('', index, name='youtube'),
    path('/syncy',sync,name="syncy"),
	path('<int:pk>/delete/',deleteVideo ,name='deleteVideo'), 
	path('<int:pk>/view/',viewVideo ,name='viewVideo'), 
	path('<int:pk>/transcript/',addTranscrip ,name='addTranscrip'), 
	path('/addtranscript/',addoredittranscript ,name='addoredittranscript'), 
]
