import requests
from isodate import parse_duration
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.shortcuts import render, redirect
from apiclient.discovery import build
import json
from .models import Youtube
from django.db import IntegrityError
from django.http import JsonResponse
from django.shortcuts import redirect
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
    youtube = Youtube.objects.all()
    context = {'youtubedata':youtube}
    return render(request, 'youtube/youtube.html',context)



youtube = build('youtube', 'v3', developerKey=settings.YOUTUBE_DATA_API_KEY)




def get_channel_videos(channel_id):
    
    # get Uploads playlist id
    res = youtube.channels().list(id=channel_id, 
                                  part='contentDetails').execute()
    playlist_id = res['items'][0]['contentDetails']['relatedPlaylists']['uploads']
    videos = []
    next_page_token = None
    print(playlist_id)
    
    while 1:
        res = youtube.playlistItems().list(playlistId=playlist_id, 
                                           part='snippet', 
                                           maxResults=50,
                                           pageToken=next_page_token).execute()
        videos += res['items']
        next_page_token = res.get('nextPageToken')
        
        if next_page_token is None:
            break
    
    return videos


def get_videos_stats(video_ids):
    stats = []
    for i in range(0, len(video_ids), 50):
        res = youtube.videos().list(id=','.join(video_ids[i:i+50]),
                                   part='statistics').execute()
        stats += res['items']
        
    return stats

@login_required
def sync(request):
    videos = []
    videos = get_channel_videos('UCk5pLi6jK_FAB0tyOiTADsA')
    video_ids = list(map(lambda x:x['snippet']['resourceId']['videoId'], videos))
    stats = get_videos_stats(video_ids)
    for video in videos:   
        for stat in stats:
            if(stat['id'] == video['snippet']['resourceId']['videoId']):
                print(video['id'],'==',stat['id'], stat['statistics']['viewCount'])
                try:
                    youtube =  Youtube()
                    youtube.youtube_id = video['id']
                    youtube.youtube_etag = video['etag']
                    youtube.kind = video['kind'],
                    youtube.publishedAt = video['snippet']['publishedAt']
                    youtube.channelId = video['snippet']['channelId']
                    youtube.title = video['snippet']['title']
                    youtube.description = video['snippet']['description']
                    youtube.thumbnailsDefault = video['snippet']['thumbnails']['default']['url']
                    youtube.thumbnailsHight = video['snippet']['thumbnails']['high']['url']
                    youtube.channelTitle  = video['snippet']['channelTitle']
                    youtube.playlistId = video['snippet']['playlistId']
                    youtube.position = video['snippet']['position']
                    youtube.videoId = video['snippet']['resourceId']['videoId']
                    youtube.stats_id = stat['id']
                    youtube.stats_etag = stat['etag']
                    if "viewCount" in stat['statistics']:
                        youtube.viewCount = stat['statistics']['viewCount']
                    else:
                        print('viewCount not found')

                    if "likeCount" in stat['statistics']:
                        youtube.likeCount = stat['statistics']['likeCount']
                    else:
                        print('likeCount not found')
                        
                    if "dislikeCount" in stat['statistics']:
                        youtube.dislikeCount = stat['statistics']['dislikeCount']
                    else:
                        print('dislikeCount not found')

                    if "favoriteCount" in stat['statistics']:
                        youtube.favoriteCount = stat['statistics']['favoriteCount']
                    else:
                        print('favoriteCount not found')

                    if "commentCount" in stat['statistics']:
                        youtube.commentCount = stat['statistics']['commentCount']
                    else:
                        print('commentCount not found')

                    youtube.save()
                    print("Youtube video with position  "+str(video['snippet']['position'])+"  has been successfully added to the database")
                except IntegrityError:
                    print("Integrity Error")
            else:
                print("Didn't match")
    print("Successfull")
    # with open('stats.json', 'w', encoding='utf-8') as f:
    #     json.dump(stats, f, ensure_ascii=False, indent=4)

    context = {
        'videos' : videos
    }
    
    return redirect('/youtube')




@login_required
@admin_member_required(login_url='/accessdenied')
def deleteVideo(request, pk):
	user = Youtube.objects.get(id = pk)
	print(user)
	user.delete()
	return redirect('/youtube')

@login_required
@admin_member_required(login_url='/accessdenied')
def viewVideo(request, pk):
    youtube = Youtube.objects.get(id = pk)
    return render(request, 'youtube/view.html', {'youtube': youtube})

@login_required
@admin_member_required(login_url='/accessdenied')
def addTranscrip(request, pk):
    youtube = Youtube.objects.get(id = pk)
    return render(request, 'youtube/addTranscript.html',{'youtube': youtube})

@login_required
def addoredittranscript(request):
    youtube =  Youtube.objects.get(pk = request.POST.get('idofyoutube'))
    youtube.transcript = request.POST.get('content')
    youtube.save()
    print(youtube)
    return redirect('/youtube')