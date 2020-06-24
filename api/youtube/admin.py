from django.contrib import admin
from .models import Youtube, Payment
# Register your models here.

class YoutubeAdmin(admin.ModelAdmin):
    ordering = ['position']
    list_display = ('id','title', 'channelTitle', 'position')
    search_fields = ('id', 'position')
    filter_horizontal = ()


admin.site.register(Youtube,YoutubeAdmin)

admin.site.register(Payment)
