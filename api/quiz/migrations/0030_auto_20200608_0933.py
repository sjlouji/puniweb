# Generated by Django 3.0.6 on 2020-06-08 09:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0029_userquiz_attempttime'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userquiz',
            name='attemptTime',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
