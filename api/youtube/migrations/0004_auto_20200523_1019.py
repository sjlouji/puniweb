# Generated by Django 3.0.6 on 2020-05-23 10:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('youtube', '0003_auto_20200522_0951'),
    ]

    operations = [
        migrations.AddField(
            model_name='youtube',
            name='commentCount',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='youtube',
            name='dislikeCount',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='youtube',
            name='favoriteCount',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='youtube',
            name='likeCount',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='youtube',
            name='stats_etag',
            field=models.CharField(default='null', max_length=200, unique=True),
        ),
        migrations.AddField(
            model_name='youtube',
            name='stats_id',
            field=models.CharField(default='null', max_length=200, unique=True),
        ),
        migrations.AddField(
            model_name='youtube',
            name='viewCount',
            field=models.IntegerField(default=0),
        ),
    ]