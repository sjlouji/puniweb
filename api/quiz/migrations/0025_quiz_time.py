# Generated by Django 3.0.6 on 2020-06-06 10:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0024_auto_20200604_1431'),
    ]

    operations = [
        migrations.AddField(
            model_name='quiz',
            name='time',
            field=models.IntegerField(default=60000, null=True),
        ),
    ]
