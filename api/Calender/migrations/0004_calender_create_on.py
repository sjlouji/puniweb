# Generated by Django 3.0.6 on 2020-06-11 13:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Calender', '0003_calender_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='calender',
            name='create_on',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
